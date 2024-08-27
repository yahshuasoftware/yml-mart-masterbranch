import React, { useState, useEffect } from 'react';

const ReferCard = () => {
  const [user, setUser] = useState(null);
  const [referralCode, setReferralCode] = useState('');

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch("http://localhost:8080/api/user-details", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();

        if (data.data) {
          const user = data.data;
          setUser(user);
          setReferralCode(user.referralCode || generateReferralCode());
        } else {
          console.log('User data is missing.');
        }
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    }

    fetchUserData();
  }, []);

  const generateReferralCode = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    let code = '';

    for (let i = 0; i < 3; i++) {
      code += letters.charAt(Math.floor(Math.random() * letters.length));
    }

    for (let i = 0; i < 3; i++) {
      code += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }

    return code;
  };

  const updateUserReferralCode = async (code) => {
    try {
      const response = await fetch("http://localhost:8080/api/update-referral-code", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ referralCode: code }),
      });
      const result = await response.json();
      if (result.success) {
        console.log('Referral code updated successfully.');
      } else {
        console.error('Failed to update referral code.');
      }
    } catch (error) {
      console.error('Error updating referral code:', error.message);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralCode);
    alert('Referral code copied to clipboard!');
  };

  useEffect(() => {
    // If referral code is generated, update it in the backend
    if (referralCode && user && !user.referralCode) {
      updateUserReferralCode(referralCode);
    }
  }, [referralCode, user]);

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('https://img.freepik.com/free-vector/colorful-dating-app-concept_23-2148523515.jpg?size=626&ext=jpg&ga=GA1.1.745416819.1724534193&semt=ais_hybrid')" }}
    >
      <div className="relative bg-white rounded-lg shadow-lg overflow-hidden w-96">
        <div className="absolute inset-0">
          <img
            src="https://imgs.search.brave.com/nBKohrYU0UeocTtfRvWa4VP3M58E3wEx5qPZ6V0yTE8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzgzLzU1Lzgx/LzM2MF9GXzI4MzU1/ODEyMl91TjZ6aXhR/VTFIMVdZTzZabWN2/NWQ4RnZ4U2x3ODZm/dC5qcGc"
            alt="Referral Background"
            className="object-cover w-full h-full opacity-20"
          />
        </div>

        <div className="relative z-10 p-8 text-center">
          {user ? (
            <>
              <h1 className="text-lg font-semibold text-gray-900 mb-4">Welcome {user.name}</h1>

              <div className="mb-4">
                <div className="text-2xl font-bold text-black">$00</div>
                <div className="text-sm text-gray-600">NO of refer</div>
              </div>

              <div className="flex items-center justify-between mb-4 bg-gray-100 p-3 rounded-lg shadow-inner">
                <span className="text-gray-800 font-mono text-sm overflow-hidden text-ellipsis whitespace-nowrap">{referralCode || 'Generating code...'}</span>
                <button
                  onClick={copyToClipboard}
                  className="ml-2 bg-blue-500 text-white px-3 py-1 rounded-lg shadow-md hover:bg-blue-700"
                >
                  Copy
                </button>
              </div>

              <div className="mb-4">
                <div className="text-sm font-bold text-gray-900 mb-2">REDEEM NOW</div>
                <button className="bg-white border border-gray-300 w-full py-3 rounded-full shadow-md text-red-600 font-semibold">
                  UPI CASH
                </button>
              </div>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReferCard;
