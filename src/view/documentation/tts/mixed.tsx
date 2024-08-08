import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

const getFirstChunk = `
async function playSingleChunk() {
  const url = baseUrl + "/tts-short"
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text, indexes: indexData }),
  });

  if (!response.ok) throw new Error();

  const result = await response.json();

  const completeChunk = [new Uint8Array(result.audioBuffer.data)];

  handleAudio(completeChunk);
  audioData.push(completeChunk);
  return result.requestId;
}
`;

const getRestOfTheAudio = `
/**
 * Asynchronously fetches data from a streaming API for text-to-speech continuation.
 *
 * This function sends a request to a TTS (Text-to-Speech) continuation endpoint with a specified request ID, and then streams the response in chunks.
 *
 * @param {string} requestId - The ID of the request for which the continuation data is to be fetched.
 * @returns {AsyncGenerator<Uint8Array, void, unknown>} An async generator that yields Uint8Array chunks of the streaming response.
 */
async function* streamingFetch(requestId) {
  const url = baseUrl + "/tts-continue";
  const body = { indexes: true, requestId };

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

export const MixedPage = () => {
  return (
    <div className="flex flex-col pt-12 pb-12 px-4 max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold mb-6">
        Text-to-Speech (TTS) API - Mixed
      </h2>
      <p className="text-lg mb-6">
        If speed is critical, the mixed API is preferred because getting the
        first complete chunk from the <code>/tts-stream</code> API is not fast
        enough. The TTS API provides two endpoints, <code>/tts-short</code> and{" "}
        <code>/tts-continue</code>, to handle text-to-speech conversions with
        both single and multi-chunk responses. These endpoints work together to
        efficiently manage and stream audio data.
      </p>
      <h3 className="text-2xl font-semibold mb-4">/tts-short Endpoint</h3>
      <p className="text-lg mb-6">
        The <code>/tts-short</code> endpoint processes text input and,
        optionally, includes indexes to help with text alignment. It operates as
        follows:
      </p>
      <ul className="list-disc pl-5 mb-6">
        <li>
          <strong>Single Chunk Response:</strong> If the length of the text fits
          into a single audio chunk, the API responds with an{" "}
          <code>audioBuffer</code> containing the complete audio and, if
          requested, the indexes in JSON format.
        </li>
        <li>
          <strong>Multi-Chunk Response:</strong> If the text does not fit into a
          single chunk, the response includes a <code>requestId</code>. This{" "}
          <code>requestId</code> is necessary for retrieving the remaining audio
          chunks.
        </li>
      </ul>

      <h3 className="text-2xl font-semibold my-4">/tts-continue Endpoint</h3>
      <p className="text-lg mb-6">
        The <code>/tts-continue</code> endpoint is used to fetch the remaining
        audio chunks for a given <code>requestId</code>. It works as follows:
      </p>
      <ul className="list-disc pl-5 mb-6">
        <li>
          <strong>Request:</strong> Submit the <code>requestId</code> received
          from the <code>/tts-short</code> endpoint to continue receiving audio
          chunks.
        </li>
        <li>
          <strong>Response:</strong> The API responds with an HTTP stream
          similar to the <code>/tts-stream</code> endpoint, providing the
          remaining audio chunks for playback.
        </li>
      </ul>
      <h3 className="text-2xl font-semibold mb-4">Integration and Usage</h3>
      <p className="text-lg mb-6">
        To integrate these endpoints into your application:
      </p>
      <ul className="list-disc pl-5 mb-6">
        <li>
          Start by sending a request to <code>/tts-short</code> with the text
          and optional indexes. Handle the response based on whether it contains
          the complete audio or a <code>requestId</code>.
        </li>
        <li>
          If a <code>requestId</code> is provided, use it to request additional
          audio chunks from the <code>/tts-continue</code> endpoint.
        </li>
        <li>
          For efficient audio playback, ensure your client-side implementation
          can handle streaming data and concatenate audio chunks as needed.
        </li>
      </ul>
      <p className="text-lg mb-6">
        This approach allows for flexible and efficient text-to-speech
        processing, accommodating both short and long texts by leveraging
        streaming capabilities.
      </p>

      <h3 className="text-2xl font-semibold my-4">
        Function for sending requests to the TTS Streaming API
      </h3>

      <p className="text-lg mb-4">
        Some functions are mentioned in previous section
      </p>

      <SyntaxHighlighter
        language="javascript"
        className="rounded-lg"
        style={vscDarkPlus}
      >
        {getFirstChunk}
      </SyntaxHighlighter>

      <h3 className="text-2xl font-semibold my-4">
        Function for getting rest of the audio
      </h3>

      <p className="text-lg mb-4">
        The difference between the function mentioned in the previous section
        and this one is that it receives a requestId. It responds with the same
        type. The handling of fragments is also the same.
      </p>

      <SyntaxHighlighter
        language="javascript"
        className="rounded-lg"
        style={vscDarkPlus}
      >
        {getRestOfTheAudio}
      </SyntaxHighlighter>
    </div>
  );
};
