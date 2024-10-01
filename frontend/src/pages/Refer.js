import React, { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import { FaInstagram, FaWhatsapp, FaFacebook } from 'react-icons/fa';
import SummaryApi from '../common';
import Context from '../context/index';

const ReferCard = () => {
  const { authToken } = useContext(Context);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async (authToken) => {
      try {
        const response = await fetch(SummaryApi.current_user.url, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setUserData(data.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUserData(authToken);
  }, [authToken]);

  const copyToClipboard = () => {
    if (userData && userData.refferal && userData.refferal.refferalcode) {
      navigator.clipboard.writeText(userData.refferal.refferalcode);
      toast.success('Referral code copied to clipboard!');
    }
  };

  const generateMessage = (platform) => {
    const referralCode = userData?.refferal?.refferalcode;
    const baseMessage = `Check out YML Mart for amazing deals! Use my referral code ${referralCode} to get an extra 5% off on every order. Visit: https://ymlmart.com`;

    if (platform === 'whatsapp') {
      return `https://wa.me/?text=${encodeURIComponent(baseMessage)}`;
    } else if (platform === 'instagram') {
      return `https://www.instagram.com?text=${encodeURIComponent(baseMessage)}`;
    } else if (platform === 'facebook') {
      return `https://www.facebook.com/sharer/sharer.php?u=https://ymlmart.com&quote=${encodeURIComponent(baseMessage)}`;
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* Image Section */}
      <div className="flex items-center mb-6 md:mb-0">
        <img
          src="reffer.png"
          alt="Referral"
          className="object-cover h-64 w-64 md:h-auto md:w-auto md:max-h-[500px] rounded-lg shadow-lg md:ml-4"
        />
      </div>

      {/* Card Section */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden p-6 flex flex-col justify-center items-center w-full md:w-96">
        <h1 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Welcome Message</h1>

        {/* Referral Code Section */}
        <div className="mb-4">
          <div className="text-2xl font-bold text-black">₹00</div>
        </div>

        <div className="flex items-center justify-between mb-4 bg-gray-100 p-3 rounded-lg shadow-inner w-full">
          <span className="text-gray-800 font-mono text-sm overflow-hidden text-ellipsis whitespace-nowrap">
            {userData?.refferal?.refferalcode || 'No referral code available'}
          </span>
          <button
            onClick={copyToClipboard}
            className="ml-2 bg-blue-500 text-white px-3 py-1 rounded-lg shadow-md hover:bg-blue-700"
          >
            Copy
          </button>
        </div>

        {/* Redeem Section */}
        <div className="mb-4 w-full">
          <div className="text-sm font-bold text-gray-900 mb-2">REDEEM NOW</div>
          <button className="bg-white border border-gray-300 w-full py-3 rounded-full shadow-md text-red-600 font-semibold">
            UPI CASH
          </button>
        </div>

        {/* Social Share Section */}
        <div className="text-center mb-4 mt-6 w-full">
          <p className="text-md font-bold text-gray-900 mb-2">Share with friends via</p>
          <div className="flex justify-center space-x-4">
            <a
              href={generateMessage('whatsapp')}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500"
            >
              <FaWhatsapp size={30} />
            </a>
            <a
              href={generateMessage('instagram')}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500"
            >
              <FaInstagram size={30} />
            </a>
            <a
              href={generateMessage('facebook')}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              <FaFacebook size={30} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferCard;
