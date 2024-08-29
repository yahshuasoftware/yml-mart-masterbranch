import React, { useState,useEffect } from 'react';
import MyProfile from './ProfileForm';
import { FaTimes, FaBars } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";



const BusinessProfile = () => {
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [activeSection, setActiveSection] = useState("Orders");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [orderData, setOrderData] = useState(null);



  const handleProfileClick = () => {
    setShowProfileForm(!showProfileForm);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

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
        console.log(data)
        setUserData(data.data);
        console.log(userData.refferal.myrefferalorders[0].order_id)

        // setOrderData(data.orderDetail);
        // alert(userData.name)


        // console.log(orderData[0].deliveryStatus)

        // total purchasing
        // const totalAmount = data.orderDetail
        //   .filter((order) => order.status === "paid") // Consider only orders with status 'paid'
        //   .reduce(
        //     (acc, order) =>
        //       acc +
        //       order.products.reduce(
        //         (acc, product) => acc + product.price * product.quantity,
        //         0
        //       ),
        //     0
        //   );

        // setTotalPurchasing(totalAmount);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUserData();
  }, []);




  const renderContent = () => {
    switch (activeSection) {
      case 'Orders':
        return <div className="p-4">
              {/* {userData && userData.refferal && userData.refferal.myrefferals.length > 0 ? (
        userData.refferal.myrefferals.map((referral, index) => (
          <div className='h-14 bg-slate-300 mt-2 p-2' key={index}>
            {referral.name}
          </div>
        ))
      ) : (
        <div>No referrals available.</div>
      )} */}
        </div>;
      case 'Business':
        return <div className="p-4">Business Content...</div>;
      case 'My Team':
        return <div className="p-4">
           {userData && userData.refferal && userData.refferal.myrefferals.length > 0 ? (
        userData.refferal.myrefferals.map((referral, index) => (
          <div className='h-14 bg-slate-300 mt-2 p-2' key={index}>
            {referral.name}
          </div>
        ))
      ) : (
        <div>No referrals available.</div>
      )}
        </div>;
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
          <div className="w-16 h-16  rounded-full flex justify-center items-center text-white text-xl">
          {userData?.profilePic ? (
                  <img
                    src={`${userData?.profilePic}`}
                    alt="Profile"
                    className="w-24 h-24 rounded-full mb-2"
                  />
                ) : (
                  <FaRegCircleUser size={70} className="text-gray-500" />
                )}
          </div>
          <div className="ml-4 text-2xl font-bold">{userData && <div>Welcome, {userData.name}!</div>}</div>
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
