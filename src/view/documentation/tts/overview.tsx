export const OverviewPage = () => {
  return (
    <div className="flex flex-col pt-12 pb-12 px-4 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">
        Text-to-Speech (TTS) API Overview
      </h1>
      <p className="text-lg mb-6">
        Welcome to the Text-to-Speech (TTS) API documentation. This API allows
        you to convert text into natural-sounding speech, with various options
        for handling audio responses. The TTS API provides flexible and
        efficient methods to integrate speech synthesis into your applications,
        enhancing user interaction and accessibility.
      </p>

      <p>
        Url of the api: <code>https://oyqiz.airi.uz/api/v1</code>
      </p>

      <h2 className="text-3xl font-semibold my-4">Core Features</h2>
      <ul className="list-disc list-inside text-lg mb-6">
        <li>
          <strong>Single Query Conversion:</strong> Convert a given text string
          into a single audio chunk, ideal for shorter texts.
        </li>
        <li>
          <strong>Streaming Conversion:</strong> Convert longer texts into
          speech by streaming audio chunks, allowing for real-time playback as
          data is received.
        </li>
        <li>
          <strong>Index Support:</strong> Optionally include index data in
          responses, providing detailed information about the text segments in
          the audio.
        </li>
      </ul>

      <h2 className="text-3xl font-semibold mb-4">Endpoints</h2>
      <p className="text-lg mb-4">
        The TTS API provides several endpoints to handle different types of
        text-to-speech requests:
      </p>
      <ul className="list-disc list-inside text-lg mb-6">
        <li>
          <strong>/tts:</strong> Converts a short text string to a single audio
          chunk.
        </li>
        <li>
          <strong>/tts-short:</strong> Converts text to speech and optionally
          returns index data, providing immediate and streamed audio responses.
        </li>
        <li>
          <strong>/tts-stream:</strong> Streams audio responses for longer
          texts, handling the conversion and playback of text in real-time.
        </li>
      </ul>

      <h2 className="text-3xl font-semibold mb-4 mt-4">Further Information</h2>
      <p className="text-lg mb-6">
        For more detailed information on each endpoint, including parameters and
        example responses, please refer to the specific sections of the
        documentation. You can also find code snippets and use cases to help you
        integrate the TTS API into your projects effectively.
      </p>
    </div>
  );
};
