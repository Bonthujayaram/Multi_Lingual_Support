import React, { useEffect } from 'react';

const EmailVerificationButton = () => {
  useEffect(() => {
    const loadScript = () => {
      const script = document.createElement('script');
      script.src = 'https://www.phone.email/verify_email_v1.js';
      script.async = true;
      document.body.appendChild(script);

      window.phoneEmailReceiver = (userObj) => {
        const { user_json_url } = userObj;
        alert(`Email verified! Fetch details from: ${user_json_url}`);
      };
    };
    loadScript();
  }, []);

  return (
    <div id="verifyEmailContainer" className="container">
      <div
        className="pe_verify_email"
        data-client-id="18042619365038496745"
      ></div>
    </div>
  );
};

export default EmailVerificationButton;
