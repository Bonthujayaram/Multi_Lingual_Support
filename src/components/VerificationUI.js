import React, { useEffect, useState } from 'react';
import './styles.css'; // Import your CSS file for styling

const translations = {
  en: {
    verificationPrompt: 'Please verify your phone number to proceed.',
    additionalInfo: 'We will send you an OTP (One-Time Password) to confirm your identity.',
    additionalInfoAfterOtp: 'Once your phone is verified, you will be granted access to your account.',
    welcomeMessage: 'Welcome to Multi-Language Support! Please select your preferred language to continue.',
  },
  es: {
    verificationPrompt: 'Por favor, verifique su número de teléfono para continuar.',
    additionalInfo: 'Enviaremos un OTP (Código de verificación) a su número para confirmar su identidad.',
    additionalInfoAfterOtp: 'Una vez verificado su teléfono, se le otorgará acceso a su cuenta.',
    welcomeMessage: '¡Bienvenido al soporte multilingüe! Por favor, seleccione su idioma preferido para continuar.',
  },
  hi: {
    verificationPrompt: 'कृपया जारी रखने के लिए अपना फोन नंबर सत्यापित करें।',
    additionalInfo: 'हम आपके पहचान की पुष्टि के लिए एक वन-टाइम पासवर्ड (OTP) भेजेंगे।',
    additionalInfoAfterOtp: 'जब आपका फोन सत्यापित हो जाएगा, तो आपको अपनी खाता तक पहुंच प्राप्त होगी।',
    welcomeMessage: 'बहु-भाषा समर्थन में आपका स्वागत है! कृपया अपनी वरीय भाषा चुनें जो आप जारी रखना चाहते हैं।',
  },
  pt: {
    verificationPrompt: 'Por favor, verifique seu número de telefone para continuar.',
    additionalInfo: 'Enviaremos um OTP (Código de verificação) ao seu नंबर para confirmar sua identidade.',
    additionalInfoAfterOtp: 'Depois de verificar seu telefone, você terá acesso à sua conta.',
    welcomeMessage: 'Bem-vindo ao suporte multilíngue! Por favor, selecione seu idioma preferido para continuar.',
  },
  zh: {
    verificationPrompt: '请验证您的电话号码以继续。',
    additionalInfo: '我们将向您发送一个一次性密码（OTP）来确认您的身份。',
    additionalInfoAfterOtp: '验证成功后，您将获得对您的帐户的访问权限。',
    welcomeMessage: '欢迎来到多语言支持！ 请选择您继续使用的首选语言。',
  },
  fr: {
    verificationPrompt: 'Veuillez vérifier votre numéro de téléphone pour continuer.',
    additionalInfo: 'Nous vous enverrons un OTP (Code de vérification) pour confirmer votre identité.',
    additionalInfoAfterOtp: 'Une fois votre téléphone vérifié, vous aurez accès à votre compte.',
    welcomeMessage: 'Bienvenue dans le support multilingue ! Veuillez sélectionner votre langue préférée pour continuer.',
  },
};

const VerificationUI = ({ selectedLanguage, onSuccess }) => {
  const [currentMessage, setCurrentMessage] = useState(translations.en.verificationPrompt); // Default is English
  const [currentAdditionalInfo, setCurrentAdditionalInfo] = useState(translations.en.additionalInfo); // Default is English
  const [currentAdditionalInfoAfterOtp, setCurrentAdditionalInfoAfterOtp] = useState(translations.en.additionalInfoAfterOtp); // Default after OTP
  const [welcomeMessage, setWelcomeMessage] = useState(translations.en.welcomeMessage); // Default Welcome message

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
            setCurrentMessage(translations[selectedLanguage].verificationPrompt); // Update message after verification
            setCurrentAdditionalInfo(translations[selectedLanguage].additionalInfo); // Update additional info after verification
            setCurrentAdditionalInfoAfterOtp(translations[selectedLanguage].additionalInfoAfterOtp); // Update additional info after OTP verification
            setWelcomeMessage(translations[selectedLanguage].welcomeMessage); // Update welcome message after verification
            onSuccess(); // Notify verification success
          };
        };
      } else {
        script.src = 'https://www.phone.email/sign_in_button_v1.js';
        script.onload = () => {
          window.phoneEmailListener = (userObj) => {
            const { user_json_url } = userObj;
            alert(`Phone verified! Fetch details from: ${user_json_url}`);
            setCurrentMessage(translations[selectedLanguage].verificationPrompt); // Update message after verification
            setCurrentAdditionalInfo(translations[selectedLanguage].additionalInfo); // Update additional info after verification
            setCurrentAdditionalInfoAfterOtp(translations[selectedLanguage].additionalInfoAfterOtp); // Update additional info after OTP verification
            setWelcomeMessage(translations[selectedLanguage].welcomeMessage); // Update welcome message after verification
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
    <div
      className="verification-ui"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'auto', // Adjust height as necessary
        backgroundColor: '#f9f9f9',
        borderRadius: '10px',
        padding: '20px',
      }}
    >
      <h1
        style={{
          fontSize: '1.5rem',
          color: '#333',
          marginBottom: '20px',
          fontWeight: 'bold',
          lineHeight: '1.5',
        }}
      >
        {welcomeMessage}
      </h1>
      {selectedLanguage === 'fr' ? (
        <div className="pe_verify_email" data-client-id="18042619365038496745"></div>
      ) : (
        <div className="pe_signin_button" data-client-id="18042619365038496745"></div>
      )}
      <p style={{ marginTop: '20px', fontSize: '14px', color: '#444' }}>
        {currentMessage} <br />
        {currentAdditionalInfo} <br />
        {currentAdditionalInfoAfterOtp}
      </p>
    </div>
  );
};

export default VerificationUI;
