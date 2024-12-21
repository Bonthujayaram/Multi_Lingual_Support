import React, { useState } from 'react';
import LanguageSelector from './components/LanguageSelector';
import VerificationUI from './components/VerificationUI';

const App = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(''); // No language selected initially

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang); // Update the selected language
  };

  return (
    <div>
      <h1>Select Language</h1>
      <LanguageSelector
        selectedLanguage={selectedLanguage}
        onChangeLanguage={handleLanguageChange}
      />
      {/* Show the verification button only if a language is selected */}
      {selectedLanguage && (
        <VerificationUI selectedLanguage={selectedLanguage} />
      )}
    </div>
  );
};

export default App;
