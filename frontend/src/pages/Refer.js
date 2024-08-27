import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify'

const ReferCard = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/user-details", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setUserData(data.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUserData();
  }, []);

  const copyToClipboard = () => {
    if (userData && userData.refferal && userData.refferal.refferalcode) {
      navigator.clipboard.writeText(userData.refferal.refferalcode);
      toast.success("Referral code copied to clipboard!")
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex items-stretch h-[500px]">
       
        <div className="flex items-center">
          <img src="reffer.png" alt="Referral" className="object-cover h-full rounded-lg shadow-lg ml-4" />
        </div>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden p-6 flex flex-col justify-centre items-centre w-80">
          <h1 className="text-lg font-semibold text-gray-900 mb-4">Welcome Message</h1>
          
          <div className="mb-4">
            <div className="text-2xl font-bold text-black">$00</div>
            <div className="text-sm text-gray-600"></div>
          </div>

          <div className="flex items-center justify-between mb-4 bg-gray-100 p-3 rounded-lg shadow-inner">
            <span className="text-gray-800 font-mono text-sm overflow-hidden text-ellipsis whitespace-nowrap">
              {userData?.refferal?.refferalcode || "No referral code available"}
            </span>
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
        </div>
      </div>
    </div>
  );
};

export default ReferCard;
