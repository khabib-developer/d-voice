export const ConceptPage = () => {
  return (
    <div className="flex flex-col pt-12 pb-12 px-4 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Concepts and Principles</h1>
      <p className="text-lg mb-6">
        Understanding the core concepts and principles behind Text-to-Speech
        (TTS) and Speech-to-Text (STT) technologies is crucial for effectively
        integrating these services into your applications. This page provides an
        overview of the fundamental ideas, processes, and terminologies involved
        in TTS and STT.
      </p>

      <h2 className="text-3xl font-semibold mb-4">Text-to-Speech (TTS)</h2>
      <p className="text-lg mb-4">
        Text-to-Speech (TTS) technology converts written text into spoken words.
        It involves several key components and processes:
      </p>
      <ul className="list-disc list-inside text-lg mb-6">
        <li>
          <strong>Text Processing:</strong> The input text is analyzed and
          processed to identify linguistic and syntactic elements such as words,
          sentences, punctuation, and special characters.
        </li>
        <li>
          <strong>Phonetic Transcription:</strong> The processed text is
          converted into phonetic representations, indicating how each word
          should be pronounced.
        </li>
        <li>
          <strong>Prosody Generation:</strong> Prosody refers to the rhythm,
          stress, and intonation of speech. This step involves generating
          appropriate prosodic patterns to make the speech sound natural.
        </li>
        <li>
          <strong>Speech Synthesis:</strong> The phonetic and prosodic
          information is used to generate the final audio output, which sounds
          like natural human speech.
        </li>
      </ul>

      <h2 className="text-3xl font-semibold mb-4">Speech-to-Text (STT)</h2>
      <p className="text-lg mb-4">
        Speech-to-Text (STT) technology converts spoken language into written
        text. The process involves several key steps:
      </p>
      <ul className="list-disc list-inside text-lg mb-6">
        <li>
          <strong>Audio Capture:</strong> The spoken input is captured through a
          microphone or an audio file.
        </li>
        <li>
          <strong>Preprocessing:</strong> The captured audio is preprocessed to
          remove noise, normalize volume, and segment the speech.
        </li>
        <li>
          <strong>Feature Extraction:</strong> Key features of the speech
          signal, such as frequency and amplitude, are extracted for further
          analysis.
        </li>
        <li>
          <strong>Acoustic Modeling:</strong> Acoustic models are used to map
          the extracted features to phonetic units.
        </li>
        <li>
          <strong>Language Modeling:</strong> Language models are used to
          predict the most likely sequence of words based on the phonetic units.
        </li>
        <li>
          <strong>Post-processing:</strong> The predicted text is post-processed
          to correct errors, format the text, and add punctuation.
        </li>
      </ul>

      <h2 className="text-3xl font-semibold mb-4">Key Concepts</h2>
      <ul className="list-disc list-inside text-lg mb-6">
        <li>
          <strong>Phonemes:</strong> The smallest units of sound in a language
          that distinguish one word from another.
        </li>
        <li>
          <strong>Prosody:</strong> The patterns of rhythm, stress, and
          intonation in speech.
        </li>
        <li>
          <strong>Acoustic Model:</strong> A statistical representation of the
          relationship between audio signals and phonetic units.
        </li>
        <li>
          <strong>Language Model:</strong> A model that predicts the probability
          of a sequence of words.
        </li>
        <li>
          <strong>Speech Corpus:</strong> A large collection of recorded speech
          and corresponding text used for training and evaluating TTS and STT
          systems.
        </li>
      </ul>

      <p className="text-lg">
        By understanding these concepts and principles, you will be better
        equipped to leverage our TTS and STT services effectively in your
        applications. Explore the rest of the documentation for detailed
        guidance on implementation, customization, and best practices.
      </p>
    </div>
  );
};
