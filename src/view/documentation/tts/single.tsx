import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const codeSnippet = `
/**
 * Sends a text string to a TTS (Text-to-Speech) API, receives the audio response, and plays it.
 *
 * @param {string} text - The text to be converted to speech.
 * @returns {Promise<void>} A promise that resolves when the audio has started playing.
 */
async function send(text) {
  const result = await fetch(baseUrl + "/tts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  const response = await result.blob();
  const audio = new Audio(URL.createObjectURL(response));
  audio.play();
}
`;

export const SinglePage = () => {
  return (
    <div className="flex flex-col pt-12  pb-12 px-4 max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold mb-6">
        Text-to-Speech (TTS) API - Single query
      </h2>
      <p className="text-lg mb-6">
        This API receives a text string, validates it, and converts the text to
        a single audio chunk. It enforces a maximum text length of 150
        characters. If the input text is valid, it returns the generated audio
        chunk.
      </p>
      <p className="text-lg mb-6">
        <strong>Request:</strong>
      </p>
      <ul className="list-disc list-inside text-lg mb-6">
        <li>
          <strong>text</strong>: string - The text to be converted to speech.
        </li>
      </ul>
      <p className="text-lg mb-6">
        <strong>Response:</strong>
      </p>
      <ul className="list-disc list-inside text-lg mb-6">
        <li>
          <strong>audioBuffer</strong>: Buffer - The audio buffer containing the
          converted speech.
        </li>
      </ul>
      <p className="text-lg mb-6">
        Below is an example of how to make a request to the TTS API:
      </p>
      <h3 className="text-3xl font-semibold mb-4">Javascript Example:</h3>
      <SyntaxHighlighter
        language="javascript"
        className="rounded-lg"
        style={vscDarkPlus}
      >
        {codeSnippet}
      </SyntaxHighlighter>
      {/* <h3 className="text-3xl font-semibold mb-4 mt-4">cURL Example:</h3>
      <SyntaxHighlighter
        language="bash"
        className="rounded-lg"
        style={vscDarkPlus}
      >
        {curlSnippet}
      </SyntaxHighlighter> */}
    </div>
  );
};
