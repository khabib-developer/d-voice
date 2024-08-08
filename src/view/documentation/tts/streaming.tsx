import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

const generatorFunctionSnippet = `
/**
 * Asynchronously fetches text-to-speech audio data from a streaming API.
 *
 * @param {string} text - The text to be converted to speech.
 * @returns {AsyncGenerator<Uint8Array, void, unknown>} An async generator that yields Uint8Array chunks of audio data.
 */
async function* streamingFetch(text) {
  const url = baseUrl + "/tts-stream";
  const body = { text, indexes: false };


  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const reader = response.body?.getReader();

  while (true && reader) {
    const { done, value } = await reader.read();
    if (done) break;
    yield value;
  }
}
`;

const ReceivingResponseChunks = `
    for await (let chunk of streamingFetch(text)) {
        console.log(chunk) // Uint8Array
    }
`;

const concatenateUint8Array = `
    /**
     * Concatenates an array of Uint8Array instances into a single Uint8Array.
     *
     * @param {Uint8Array[]} arrays - An array of Uint8Array instances to concatenate.
     * @returns {Uint8Array} A new Uint8Array containing the concatenated data from the input arrays.
     */
    function concatenateUint8Arrays(arrays) {
      let totalLength = 0;
      for (const arr of arrays) {
        totalLength += arr.length;
      }

      const concatenatedArray = new Uint8Array(totalLength);
      let offset = 0;
      for (const arr of arrays) {
        concatenatedArray.set(arr, offset);
        offset += arr.length;
      }

      return concatenatedArray;
    }`;

const sliceEachWavData = `
  /**
 * Slices and processes WAV data from a Uint8Array starting at a specified index.
 * 
 * This function searches for WAV headers and extracts WAV data and JSON indexes based on the provided Uint8Array.
 *
 * @param {Uint8Array} array - The Uint8Array containing the data to be processed.
 * @param {number} index - The starting index in the Uint8Array to begin processing.
 * @param {boolean} iterated - A flag indicating whether the data has been iterated.
 * @returns {{ wavData: Uint8Array | null, idx: number, indexes: Object | null }} An object containing:
 *   - wavData: The sliced WAV data as a Uint8Array, or null if no WAV data was found.
 *   - idx: The last index processed.
 *   - indexes: Decoded JSON indexes from the data, or null if no indexes were found.
 */
function sliceEachWavData(array, index, iterated) {
  let idx = index;
  let wavData = null;
  let indexes = null;

  function isWavHeader(data) {
    return data.length >= 4 &&
        data[0] === 0x52 && // 'R'
        data[1] === 0x49 && // 'I'
        data[2] === 0x46 && // 'F'
        data[3] === 0x46;
  }

  for (let i = index; i <= array.length - 4; i++) {
    if (isWavHeader(array) && iterated) {
      const data = new Uint8Array(array.buffer.slice(index, i));
      if (isWavHeader(data)) {
        wavData = data;
      } else {
        indexes = decodeFromUint8ArrayToJson(data); // Decodes a Uint8Array to a JSON object.
      }
      idx = i;
    }
    iterated = true;
  }
  return { wavData, idx, indexes };
}
`;

const decodeFromUint8ArrayToJson = `
/**
 * Decodes a Uint8Array to a JSON object.
 *
 * This function uses a TextDecoder to convert a Uint8Array containing JSON data into a string and then parses it into a JavaScript object.
 *
 * @param {Uint8Array} data - The Uint8Array containing JSON-encoded data.
 * @returns {Object} The decoded JSON object.
 * @throws {SyntaxError} If the Uint8Array cannot be parsed into valid JSON.
 */
function decodeFromUint8ArrayToJson(data) {
  const decoder = new TextDecoder();
  const jsonString = decoder.decode(data, { stream: true });
  return JSON.parse(jsonString);
}
`;

const processStreamResponse = `
let audios = []
let audioData = []
let count = 0

/**
 * Processes streaming audio data and handles WAV data and JSON indexes.
 *
 * This function fetches audio data in chunks from a streaming source, concatenates them, and slices the data to extract WAV audio and JSON indexes. It accumulates and processes the data, updating the relevant audio and index arrays.
 *
 * @param {string} text - The text to be converted to speech and streamed.
 * @returns {Promise<void>} A promise that resolves when the audio processing is complete.
 */
async function getStreamResponse(text) {
  let index = 0;
  let array = new Uint8Array();
 
  for await (let chunk of streamingFetch(text)) {
    audios.push(chunk);
    array = concatenateUint8Arrays(audios);
    const result = sliceEachWavData(array, index, false);
    index = result.idx;
    // If you don't need indexes you can skip this part
    if (result.indexes) {
      if (!requestId) {
        indexes = result.indexes;
      } else {
        const lastPos =
          indexes.current[audioData.current.length - 1].pos;
        indexes.current = indexes.current
          .slice(0, audioData.length)
          .concat(
            result.indexes.map((item) => ({
              ...item,
              pos: lastPos + item.pos,
            }))
          );
      }
    }
    // Complete wav data
    if (result.wavData) {
      if (!audioData.length) {
        await handleAudio([result.wavData]);
      }
      audioData.push([result.wavData]);
    }
  }

  const lastChunk = new Uint8Array(array.buffer.slice(index));
  lastChunk && audioData.push([lastChunk]);
  if (!count) await handleAudio(audioData[0]);
}
`;

const handlePlayAudio = `
/**
 * Handles audio chunks by creating and playing a Blob from the chunks.
 *
 * This function combines an array of audio chunks into a single Blob, creates an Audio object from the Blob, and plays it. It also increments a count and sets up an event listener to handle the end of the audio playback.
 *
 * @param {Array<Uint8Array>} chunks - An array of audio chunks to be combined and played.
 * @returns {Promise<void>} A promise that resolves when the audio has finished playing.
 */
const handleAudio = async (chunks) => {
  const blob = new Blob(chunks, { type: "audio/wav" });
  const data = URL.createObjectURL(blob);
  audio = new Audio(data);

  await audio.play();

  count++;
  audio.addEventListener("ended", handleAudioEnd);
};
`;

const handleAudioEnd = `
/**
 * Handles the end of audio playback by playing the next audio chunk if available.
 *
 * This function is called when the current audio finishes playing. It checks if there are more audio chunks to play. If so, it pauses briefly if necessary and then plays the next audio chunk. If all chunks have been played, it performs any required finalization (currently not specified).
 *
 * @returns {Promise<void>} A promise that resolves when the next audio chunk has been handled or when all chunks have been played.
 */
const handleAudioEnd = async () => {
  if (count < audioData.length) {
    await pauseIfPlaying(!Boolean(audioData[count]));
    handleAudio(audioData[count]);
  } else {
    // Ending of all audio chunks
  }
};
`;

const blockingFunction = `
/**
 * Pauses execution if a specific condition is met, with a delay to recheck the condition.
 *
 * This function recursively waits if the specified condition is true. It uses a delay to pause briefly before rechecking the condition. It is used to ensure that the audio playback or some other process is not interrupted before continuing.
 *
 * @param {boolean} condition - The condition to check. If true, the function will delay and recheck.
 * @returns {Promise<boolean>} A promise that resolves to false when the condition is no longer true.
 */
const pauseIfPlaying = async (condition) => {
  if (condition) {
    await new Promise(resolve => setTimeout(resolve, 100)); 
    return pauseIfPlaying(!Boolean(audios[count]));
  }
  return false;
};
  `;

export const StreamingPage = () => {
  return (
    <div className="flex flex-col pt-12 pb-12 px-4 max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold mb-6">
        Text-to-Speech (TTS) API - Streaming
      </h2>
      <p className="text-lg mb-6">
        This endpoint processes a text input by splitting it into chunks and
        converting each chunk to speech. The resulting audio buffers are then
        streamed back to the client in WAV format. It enforces a maximum text
        length of 5000 characters.
      </p>
      <h3 className="text-3xl font-semibold mb-4">Response Chunks:</h3>
      <ul className="list-disc list-inside text-lg mb-6">
        <li>
          <strong>Initial Data (Indexes):</strong> If the client requests
          indexes, the data received until the first WAV header contains the
          indexes of the split text as a JSON array. This is not an audio
          buffer.
        </li>
        <li>
          <strong>Subsequent Chunks (Audio Buffers):</strong> Subsequent chunks
          are audio buffers in Uint8Array format.
        </li>
      </ul>
      <h3 className="text-3xl font-semibold mb-4">Client-Side Processing:</h3>
      <ol className="list-decimal list-inside text-lg mb-6">
        <li>
          The client starts receiving Uint8Array chunks and begins concatenating
          these chunks.
        </li>
        <li>
          Simultaneously, the client slices the data between WAV headers,
          including the headers.
        </li>
        <li>
          Each segment of data between WAV headers represents a complete audio
          chunk that can be used for playback.
        </li>
      </ol>
      <p className="text-lg mb-6">
        By following this process, the client can assemble and play the streamed
        audio buffers correctly.
      </p>
      <p className="text-lg mb-6">
        Below are the steps to make a request to the TTS Streaming API and
        create an audioDate from the response chunks.
      </p>
      <h3 className="text-2xl font-semibold mb-4">
        Generator function for sending requests to the TTS Streaming API
      </h3>
      <SyntaxHighlighter
        language="javascript"
        className="rounded-lg"
        style={vscDarkPlus}
      >
        {generatorFunctionSnippet}
      </SyntaxHighlighter>
      <h3 className="text-2xl font-semibold my-4">
        Receiving response chunks from streamingFetch function
      </h3>
      <SyntaxHighlighter
        language="javascript"
        className="rounded-lg"
        style={vscDarkPlus}
      >
        {ReceivingResponseChunks}
      </SyntaxHighlighter>
      <h3 className="text-2xl font-semibold my-4">
        As mentioned above response chunks should be processesed in order to
        make audio blob data from it.
      </h3>
      <p className="text-lg mb-4">Concatenating Uint8Array chunks</p>
      <SyntaxHighlighter
        language="javascript"
        className="rounded-lg"
        style={vscDarkPlus}
      >
        {concatenateUint8Array}
      </SyntaxHighlighter>
      <p className="text-lg my-4">
        From the given Uint8Array, each audio chunk should be sliced ​​by WAV
        headers, including its header
      </p>
      <SyntaxHighlighter
        language="javascript"
        className="rounded-lg"
        style={vscDarkPlus}
      >
        {sliceEachWavData}
      </SyntaxHighlighter>

      <p className="text-lg my-4">
        Converting a Uint8Array containing JSON data into a string and then
        parses it into a JavaScript object.
      </p>
      <SyntaxHighlighter
        language="javascript"
        className="rounded-lg"
        style={vscDarkPlus}
      >
        {decodeFromUint8ArrayToJson}
      </SyntaxHighlighter>

      <p className="text-lg my-4">
        Processing response chunks and extract complete audio chunks
      </p>
      <SyntaxHighlighter
        language="javascript"
        className="rounded-lg"
        style={vscDarkPlus}
      >
        {processStreamResponse}
      </SyntaxHighlighter>
      <p className="text-lg my-4">Function for playing audio</p>
      <SyntaxHighlighter
        language="javascript"
        className="rounded-lg"
        style={vscDarkPlus}
      >
        {handlePlayAudio}
      </SyntaxHighlighter>
      <p className="text-lg my-4">Callback function when audio ends</p>
      <SyntaxHighlighter
        language="javascript"
        className="rounded-lg"
        style={vscDarkPlus}
      >
        {handleAudioEnd}
      </SyntaxHighlighter>

      <p className="text-lg my-4">
        Blocking function if next chunk is notcompleted yet
      </p>
      <SyntaxHighlighter
        language="javascript"
        className="rounded-lg"
        style={vscDarkPlus}
      >
        {blockingFunction}
      </SyntaxHighlighter>

      <h3 className="text-3xl font-semibold my-4">Request Body:</h3>
      <p className="text-lg mb-6">
        <strong>Required:</strong> Yes
        <br />
        <strong>Content Type:</strong> application/json
      </p>
      <SyntaxHighlighter
        language="json"
        className="rounded-lg"
        style={vscDarkPlus}
      >
        {`
          {
            "text": "O'zbek tilidagi matn",
            "indexes": true
          }
        `}
      </SyntaxHighlighter>
      <h3 className="text-3xl font-semibold my-4">Responses:</h3>
      <ul className="list-disc list-inside text-lg mb-6">
        <li>
          <strong>200 (Success):</strong> Successfully converted text to speech
          and streamed the audio.
          <SyntaxHighlighter
            language="json"
            className="rounded-lg"
            style={vscDarkPlus}
          >
            {`
              Content-Type: audio/wav
              (binary audio data)
            `}
          </SyntaxHighlighter>
        </li>
        <li>
          <strong>400 (Invalid Input):</strong> Invalid input, object invalid.
          <SyntaxHighlighter
            language="json"
            className="rounded-lg"
            style={vscDarkPlus}
          >
            {`
              {
                "message": "Invalid input text"
              }
            `}
          </SyntaxHighlighter>
        </li>
        <li>
          <strong>500 (Server Error):</strong> Server error while processing the
          request.
          <SyntaxHighlighter
            language="json"
            className="rounded-lg"
            style={vscDarkPlus}
          >
            {`
              {
                "message": "Error generating audio"
              }
            `}
          </SyntaxHighlighter>
        </li>
      </ul>
      <p className="text-lg my-4">
        The Text-to-Speech (TTS) Streaming API provides an efficient way to
        convert text into speech by streaming audio data in real-time. This
        approach is particularly useful for applications that require continuous
        speech synthesis or need to handle large volumes of text.
      </p>
    </div>
  );
};
