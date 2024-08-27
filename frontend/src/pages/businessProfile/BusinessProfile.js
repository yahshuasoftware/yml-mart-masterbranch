import React, { useState } from 'react';
import MyProfile from './ProfileForm';

const BusinessProfile = () => {
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

  const handleProfileClick = () => {
    setShowProfileForm(!showProfileForm);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'Orders':
        return <div className="p-4">Orders Content...</div>;
      case 'Business':
        return <div className="p-4">Business Content...</div>;
      case 'My Team':
        return <div className="p-4">My Team Content...</div>;
      case 'Business Record':
        return <div className="p-4">Business Record Content...</div>;
      default:
        return <div className="p-4">Select an item to view details</div>;
    }
  };

  return (
    <div className="relative max-w-4xl h-[100vh] mx-auto p-6 bg-white border border-sky-600 rounded-lg shadow-lg">
      <div className="flex flex-col items-center">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center ml-[-20px]"> {/* Shifting profile to the left */}
            <div className="w-16 h-16 bg-sky-300 rounded-full flex justify-center items-center text-white">
              Profile
            </div>
            <div className="ml-4 text-xl font-bold">Arjun Hanwate</div>
          </div>
          <button
            className="px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-600 z-10"
            onClick={handleProfileClick}
          >
             {showProfileForm ? 'Close Profile' : 'My Profile'}          </button>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Overview</h2>
        <div className="grid grid-cols-3 gap-4">
            <div className='border-sky-600 p-4 border'>
            <div className="  rounded">Self Balance Rupees</div>
            <p>$123</p>
            </div>
             <div className='border-sky-600 p-4 border'>
            <div className="  rounded">Business Volume/Intensive</div>
            <p>$123</p>
            </div>
          <div className="p-4 border border-sky-600 rounded">Other Info</div>
        </div>
      </div>

      <div className="flex max-w-6xl h-[500px] my-10 mx-auto p-6 bg-white border rounded-lg shadow-lg">
        <div className="w-1/3 p-4 border-r">
          <div className="grid grid-cols-1 gap-4">
            <div
              className={`p-4 border rounded cursor-pointer hover:bg-sky-100 ${
                activeSection === 'Orders' ? 'font-bold text-sky-600' : ''
              }`}
              onClick={() => setActiveSection('Orders')}
            >
              Orders
            </div>
            <div
              className={`p-4 border rounded cursor-pointer hover:bg-sky-100 ${
                activeSection === 'Business' ? 'font-bold text-sky-600' : ''
              }`}
              onClick={() => setActiveSection('Business')}
            >
              Business
            </div>
            <div
              className={`p-4 border rounded cursor-pointer hover:bg-sky-100 ${
                activeSection === 'My Team' ? 'font-bold text-sky-600' : ''
              }`}
              onClick={() => setActiveSection('My Team')}
            >
              My Team
            </div>
            <div
              className={`p-4 border rounded cursor-pointer hover:bg-sky-100 ${
                activeSection === 'Business Record' ? 'font-bold text-sky-600' : ''
              }`}
              onClick={() => setActiveSection('Business Record')}
            >
              Business Record
            </div>
          </div>
        </div>

        <div className="w-2/3 bg-sky-100  rounded-md p-4">
          {renderContent()}
        </div>
      </div>

      {/* Profile form slides in from the right */}
      {showProfileForm && (
        <div
          className={`absolute top-0 right-0 w-2/3 h-full p-6 bg-white border rounded-lg shadow-lg transition-transform transform ${
            showProfileForm ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <MyProfile />
        </div>
      )}
    </div>
  );
};

export default BusinessProfile;
