import React, { useState } from "react";

const SignInScreen = ({ onContinue }) => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [referralCode, setReferralCode] = useState("");

  const handleContinueClick = () => {
    if (mobileNumber) {
      onContinue(mobileNumber); // Pass mobile number to parent component
    } else {
      alert("Please enter a mobile number");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Column with Image */}
      <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: 'url("/path-to-your-image.jpg")' }}>
        {/* You can place your image URL here */}
      </div>

      {/* Right Column for Sign In Form */}
      <div className="w-1/2 flex flex-col justify-center items-center p-10">
        {/* Heading */}
        <h1 className="text-4xl font-bold mb-2">Sign In</h1>
        <p className="text-sm text-gray-600 mb-8">
          Get started by entering your details below.
        </p>

        {/* Mobile Number Input */}
        <div className="w-full mb-4">
          <label htmlFor="mobileNumber" className="block text-gray-700 text-sm mb-2">
            Mobile Number
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
              +91
            </span>
            <input
              type="tel"
              id="mobileNumber"
              className="rounded-r-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 block w-full p-2"
              placeholder="Enter your mobile number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
          </div>
        </div>

        {/* Referral Code Input */}
        <div className="w-full mb-6">
          <label htmlFor="referralCode" className="block text-gray-700 text-sm mb-2">
            Referral Code (Optional)
          </label>
          <input
            type="text"
            id="referralCode"
            className="border border-gray-300 rounded-md p-2 w-full focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter referral code"
            value={referralCode}
            onChange={(e) => setReferralCode(e.target.value)}
          />
        </div>

        {/* Continue Button */}
        <button
          className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition"
          onClick={handleContinueClick}
        >
          Continue
        </button>

        {/* Privacy Policy */}
        <p className="text-xs text-gray-500 text-center mt-4">
          By continuing, you agree to our{" "}
          <a href="/privacy-policy" className="text-blue-500 underline">
            Privacy Policy
          </a>.
        </p>
      </div>
    </div>
  );
};

export default SignInScreen;
