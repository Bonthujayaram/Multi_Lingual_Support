import React, { useState } from 'react';
import VerificationUI from './VerificationUI'; // Ensure this is implemented properly

const LanguageSelector = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(''); // Default empty string for language

  // Handle language change
  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column', // Ensure vertical alignment
        alignItems: 'center',
        minHeight: '100vh',
        background: '#ffffff', // Plain white background
        fontFamily: "'Roboto', sans-serif",
        padding: '20px',
      }}
    >
      {/* Language Selector at the top */}
      <div
        style={{
          position: 'fixed',
          top: '20px',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          zIndex: '10', // Ensure it's on top of other content
          backgroundColor: '#ffffff',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          padding: '10px 0',
        }}
      >
        <select
          value={selectedLanguage}
          onChange={handleLanguageChange}
          style={{
            width: '300px',
            padding: '10px',
            fontSize: '16px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            outline: 'none',
            cursor: 'pointer',
            color: '#555',
          }}
        >
          <option value="" enabled>
            Select Language
          </option>
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="hi">Hindi</option>
          <option value="pt">Portuguese</option>
          <option value="zh">Chinese</option>
          <option value="fr">French</option>
        </select>
      </div>

    

      {/* Main content */}
      <div
        style={{
          marginTop: '80px', // Offset for fixed dropdown
          backgroundColor: '#f9f9f9',
          borderRadius: '15px',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
          maxWidth: '400px',
          width: '100%',
          padding: '30px',
          textAlign: 'center',
        }}
      >
    


        {/* Verification UI */}
        {selectedLanguage && (
          <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'center' }}>
            <VerificationUI selectedLanguage={selectedLanguage} />
          </div>
        )}
      </div>
    </div>
  );
};

export default LanguageSelector;
