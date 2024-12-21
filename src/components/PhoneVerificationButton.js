import React, { useEffect, useState } from 'react';
import './styles.css'; // Import your CSS file

const translations = {
  en: 'Please verify your phone number to proceed.',
  es: 'Por favor, verifique su número de teléfono para continuar.',
  hi: 'कृपया जारी रखने के लिए अपना फोन नंबर सत्यापित करें।',
  pt: 'Por favor, verifique seu número de telefone para continuar.',
  zh: '请验证您的电话号码以继续。',
  fr: 'Veuillez vérifier votre numéro de téléphone pour continuer.',
};

const VerificationUI = ({ selectedLanguage, onSuccess }) => {
  const [currentMessage, setCurrentMessage] = useState(translations.en); // Default is English

  useEffect(() => {
    const loadScript = () => {
      const script = document.createElement('script');
      script.async = true;

      if (selectedLanguage === 'fr') {
        script.src = 'https://www.phone.email/verify_email_v1.js';
        script.onload = () => {
          window.phoneEmailReceiver = (userObj) => {
            const { user_json_url } = userObj;
            alert(`Email verified! Fetch details from: ${user_json_url}`);
            setCurrentMessage(translations[selectedLanguage]); // Update message after verification
            onSuccess(); // Notify verification success
          };
        };
      } else {
        script.src = 'https://www.phone.email/sign_in_button_v1.js';
        script.onload = () => {
          window.phoneEmailListener = (userObj) => {
            const { user_json_url } = userObj;
            alert(`Phone verified! Fetch details from: ${user_json_url}`);
            setCurrentMessage(translations[selectedLanguage]); // Update message after verification
            onSuccess(); // Notify verification success
          };
        };
      }

      document.body.appendChild(script);
    };

    // Clear previous script and reload for the new language
    const existingScript = document.getElementById('verification-script');
    if (existingScript) existingScript.remove();

    loadScript();
  }, [selectedLanguage, onSuccess]);

  return (
    <div>
      {selectedLanguage === 'fr' ? (
        <div className="pe_verify_email" data-client-id="18042619365038496745"></div>
      ) : (
        <div className="pe_signin_button" data-client-id="18042619365038496745"></div>
      )}
      <p style={{ marginTop: '15px', fontSize: '14px', color: '#555' }}>
        {currentMessage}
      </p>
    </div>
  );
};

export default VerificationUI;
