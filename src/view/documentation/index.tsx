export const IntroductionPage = () => {
  return (
    <div className="flex flex-col pt-12  pb-12 px-4 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">
        Welcome to the TTS and STT Documentation
      </h1>
      <p className="text-lg mb-4">
        Our Text-to-Speech (TTS) and Speech-to-Text (STT) services provide
        powerful and flexible solutions to convert text into natural-sounding
        speech and speech into accurate text. Whether you are building
        accessibility features, virtual assistants, or any application requiring
        voice interaction, our services offer high-quality, reliable, and
        scalable options to meet your needs.
      </p>
      <h2 className="text-3xl font-semibold mb-3">Text-to-Speech (TTS)</h2>
      <p className="text-lg mb-4">
        The TTS service transforms written text into spoken words, allowing you
        to create lifelike speech outputs for various applications. With support
        for multiple languages and voices, you can tailor the speech synthesis
        to match the context and user preferences.
      </p>
      <h2 className="text-3xl font-semibold mb-3">Speech-to-Text (STT)</h2>
      <p className="text-lg mb-4">
        The STT service converts spoken language into written text, enabling a
        wide range of applications from transcription services to
        voice-controlled interfaces. Our STT technology is designed to handle
        diverse accents and dialects, ensuring high accuracy and usability.
      </p>
      <h2 className="text-3xl font-semibold mb-3">Key Features</h2>
      <ul className="list-disc list-inside text-lg mb-4">
        <li>High-quality audio output and text conversion</li>
        <li>Support for multiple languages and voices</li>
        <li>Real-time streaming capabilities</li>
        <li>Customizable voice parameters and transcription settings</li>
        <li>Scalable and reliable performance</li>
      </ul>
      <p className="text-lg mb-4">
        Explore the documentation to learn more about integrating our TTS and
        STT services into your applications. From API references to code
        examples, you will find everything you need to get started.
      </p>
      <p className="text-lg">
        Thank you for choosing our TTS and STT services. We look forward to
        helping you build innovative and engaging voice-enabled applications.
      </p>
    </div>
  );
};
