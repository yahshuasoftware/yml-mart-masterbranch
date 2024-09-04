import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SummaryApi from '../common'; // Import your API configuration
import { toast } from 'react-toastify';
import Context from '../context';

const OtpPage = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpRequested, setIsOtpRequested] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { fetchUserDetails, fetchUserAddToCart } = useContext(Context);

  // Retrieve email from the location state
  useEffect(() => {
    if (location.state && location.state.email) {
      setEmail(location.state.email);
    }
  }, [location.state]);

  const requestOtp = async () => {
    try {
      const response = await fetch(SummaryApi.requestOtp.url, {
        method: SummaryApi.requestOtp.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('OTP sent to your email');
        setIsOtpRequested(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while sending the OTP');
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await fetch(SummaryApi.verifyOtp.url, {
        method: SummaryApi.verifyOtp.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('OTP verified successfully');

        // Store the token in localStorage or sessionStorage
        localStorage.setItem('authToken', data.token);

        // Fetch user details and cart items
        await fetchUserDetails();
        await fetchUserAddToCart();

        // Redirect to the home page
        navigate('/');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while verifying the OTP');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">OTP Verification</h1>
      <div className="mb-4">
        <label htmlFor="email" className="block text-lg font-medium mb-2">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full"
          placeholder="Enter your email"
          disabled={isOtpRequested}
        />
      </div>
      {!isOtpRequested ? (
        <button
          onClick={requestOtp}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Request OTP
        </button>
      ) : (
        <div className="mt-4">
          <div className="mb-4">
            <label htmlFor="otp" className="block text-lg font-medium mb-2">Enter OTP:</label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="border p-2 w-full"
              placeholder="Enter the OTP"
            />
          </div>
          <button
            onClick={verifyOtp}
            className="bg-green-500 text-white py-2 px-4 rounded"
          >
            Verify OTP
          </button>
        </div>
      )}
    </div>
  );
};

export default OtpPage;
