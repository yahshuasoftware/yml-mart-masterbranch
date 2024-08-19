import React, { useState } from 'react';
import 'animate.css';

const ReferralPage = () => {
  const referralLink = "Enter your refferal code";
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center relative">
      {/* Background image */}
      <div className="absolute top-0 left-0 w-full h-full bg-gray-200 z-10 animate__animated animate__slideInDown animate__delay-1s">
        <img src="https://cdn.vectorstock.com/i/1000v/52/58/refer-a-friend-flat-style-design-vector-23865258.avif" alt="Background" className="w-full h-full object-cover opacity-70" />
      </div>

      {/* Referral page */}
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center z-20 relative transform transition-transform duration-500 hover:scale-105 animate__animated animate__fadeIn animate__delay-2s">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Refer a Friend</h2>
        <p className="text-gray-600 mb-6">Share the link below with your friends and get rewards!</p>
        
        <div className="bg-gray-200 p-4 rounded-lg mb-4 transition-all duration-300 hover:bg-gray-300">
          <p className="text-gray-800 truncate">{referralLink}</p>
        </div>
        
        <button
          onClick={handleCopy}
          className={`bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300 ${copied ? 'animate__animated animate__pulse' : ''}`}
        >
          {copied ? 'Link Copied!' : 'Copy Referral Link'}
        </button>

        <p className="mt-6 text-gray-500">Or share directly:</p>

        <div className="flex justify-center space-x-4 mt-4">
          <a href={`https://www.facebook.com/sharer/sharer.php?u=${referralLink}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 transition-transform duration-300 transform hover:scale-110 animate__animated animate__fadeIn animate__delay-3s">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href={`https://twitter.com/intent/tweet?url=${referralLink}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 transition-transform duration-300 transform hover:scale-110 animate__animated animate__fadeIn animate__delay-4s">
            <i className="fab fa-twitter"></i>
          </a>
          <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${referralLink}`} target="_blank" rel="noopener noreferrer" className="text-blue-700 transition-transform duration-300 transform hover:scale-110 animate__animated animate__fadeIn animate__delay-5s">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ReferralPage;
