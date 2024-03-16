import React, { useEffect } from 'react';

const Chatbot = () => {
  useEffect(() => {
    const script1 = document.createElement('script');
    script1.src = 'https://cdn.botpress.cloud/webchat/v1/inject.js';
    script1.async = true;
    document.body.appendChild(script1);

    script1.onload = () => {
      const script2 = document.createElement('script');
      script2.src = 'https://mediafiles.botpress.cloud/09e5e424-1cfa-4754-9a8b-d356cc401890/webchat/config.js';
      script2.defer = true;
      document.body.appendChild(script2);
    };
  }, []);

  return (
    <div id="webchat">
      {/* Add your custom styling using Tailwind CSS classes */}
    </div>
  );
};

export default Chatbot;

