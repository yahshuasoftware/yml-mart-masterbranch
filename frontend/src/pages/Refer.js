import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Refer = () => {
  const [randomValue, setRandomValue] = useState(0);

  useEffect(() => {
    // Generate a random value between 1000 and 9999 when the component mounts
    const value = Math.floor(1000 + Math.random() * 9000);
    setRandomValue(value);
  }, []);

  const handleCopy = () => {
    // Copy the referral link to the clipboard
    navigator.clipboard.writeText(`https://example.com/refer?code=${randomValue}`);
    alert('Referral link copied to clipboard!');
  };

  const shareOnWhatsApp = () => {
    const message = `Hey! Use my referral code ${randomValue} to get a bonus. Check it out here: https://example.com/refer?code=${randomValue}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const shareOnInstagram = () => {
    // Instagram sharing logic (usually requires an API or a direct share link, but for simplicity, let's just open Instagram)
    window.open('https://www.instagram.com/', '_blank');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4 text-center">Refer a Friend</h2>
        <p className="text-gray-700 mb-4">Hey Piyush Singanjude,</p>
        <p className="text-gray-700 mb-4">Your unique referral code is:</p>
        <div className="text-3xl font-bold text-blue-600 text-center mb-6">{randomValue}</div>
        <p className="text-gray-600 mb-6">Copy the link below and forward it to your friends to earn referral rewards.</p>
        <div className="bg-gray-100 p-4 rounded-lg mb-4 text-center">
          <p className="text-sm">https://example.com/refer?code={randomValue}</p>
        </div>
        <button
          onClick={handleCopy}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors mb-4"
        >
          Copy Referral Link
        </button>
        <div className="flex justify-center space-x-4">
          <button
            onClick={shareOnWhatsApp}
            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors flex items-center"
          >
            <FontAwesomeIcon icon={faWhatsapp} className="mr-2" />
            Share on WhatsApp
          </button>
          <button
            onClick={shareOnInstagram}
            className="bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition-colors flex items-center"
          >
            <FontAwesomeIcon icon={faInstagram} className="mr-2" />
            Share on Instagram
          </button>
        </div>
      </div>
    </div>
  );
};

export default Refer;
