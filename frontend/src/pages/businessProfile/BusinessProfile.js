import React, { useState } from 'react';
import MyProfile from './ProfileForm';
import { FaTimes, FaBars } from "react-icons/fa";


const BusinessProfile = () => {
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [activeSection, setActiveSection] = useState("Orders");
  const [sidebarOpen, setSidebarOpen] = useState(false);


  const handleProfileClick = () => {
    setShowProfileForm(!showProfileForm);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
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
    <div className="relative max-w-4xl h-screen mt-10 mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
      
      
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <div className="w-16 h-16 bg-sky-600 rounded-full flex justify-center items-center text-white text-xl">
            AH
          </div>
          <div className="ml-4 text-2xl font-bold">Arjun Hanwate</div>
        </div>
        <button
          className="px-4 py-2 bg-sky-600 z-50 text-white rounded-md hover:bg-sky-700"
          onClick={handleProfileClick}
        >
          {showProfileForm ? 'Close Profile' : 'My Profile'}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-100 p-4 rounded-md shadow-md">
          <h3 className="text-lg font-semibold">Self Balance Rupees</h3>
          <p className="text-xl">$123</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-md shadow-md">
          <h3 className="text-lg font-semibold">Business Volume/Intensive</h3>
          <p className="text-xl">$123</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-md shadow-md">
          <h3 className="text-lg font-semibold">Other Info</h3>
          <p className="text-xl">Details...</p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row h-[500px] bg-white rounded-lg shadow-lg overflow-hidden">
  {/* Sidebar */}
  <div className="w-full sm:w-1/3 p-4 bg-gray-50">
  <button
        className="absolute right-10 bg-sky-600 text-white p-2 rounded-md md:hidden z-50"
        onClick={toggleSidebar}
      >
        {sidebarOpen ? <FaTimes /> : <FaBars />}
      </button>
  <div
  
        className={`fixed top-0 left-0 h-full bg-gray-100 p-4 transition-transform transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0 md:w-64 z-40`}
      >
        <ul className="space-y-5">
          <li
            className={activeSection === 'Orders' ? 'font-bold text-sky-600' : ''}
          >
            <button
              onClick={() => {
                setActiveSection('Orders');
                if (sidebarOpen) toggleSidebar(); // Close sidebar on mobile
              }}
              className="text-lg "
            >
              Orders
            </button>
          </li>
          <li
            className={activeSection === 'Business' ? 'font-bold text-sky-600' : ''}
          >
            <button
              onClick={() => {
                setActiveSection('Business');
                if (sidebarOpen) toggleSidebar(); // Close sidebar on mobile
              }}
              className="text-lg"
            >
              Business
            </button>
          </li>
          <li
            className={activeSection === 'My Team' ? 'font-bold text-sky-600' : ''}
          >
            <button
              onClick={() => {
                setActiveSection('My Team');
                if (sidebarOpen) toggleSidebar(); // Close sidebar on mobile
              }}
              className="text-lg"
            >
              My Team
            </button>
          </li>
          <li
            className={activeSection === 'Business Record' ? 'font-bold text-sky-600' : ''}
          >
            <button
              onClick={() => {
                setActiveSection('Business Record');
                if (sidebarOpen) toggleSidebar(); // Close sidebar on mobile
              }}
              className="text-lg"
            >
              Business Record
            </button>
          </li>
        </ul>
      </div>

  </div>

  {/* Content Area */}
  <div className="w-full sm:w-2/3 bg-white p-6">
    {renderContent()}
  </div>
</div>


      {showProfileForm && (
        <div className="absolute top-0 right-0 w-full sm:w-2/3 h-full bg-white p-6 shadow-lg transition-transform transform translate-x-0 z-20">
          <MyProfile />
        </div>
      )}
    </div>
  );
};

export default BusinessProfile;
