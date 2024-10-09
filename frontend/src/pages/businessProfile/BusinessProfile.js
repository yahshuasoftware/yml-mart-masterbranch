import React, { useState, useEffect, useContext } from 'react';
import { FaUserFriends, FaListAlt, FaMoneyCheckAlt } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import MyProfile from './ProfileForm'; // Ensure this imports your KYC form
import { FaTimes, FaBars } from "react-icons/fa";
import moment from 'moment';
import SummaryApi from '../../common';
import Context from "../../context/index";

const BusinessProfile = () => {
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [activeSection, setActiveSection] = useState("My Team");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [usersData, setUsersData] = useState(null);
  const [orderData, setOrderData] = useState([]);

  const { authToken } = useContext(Context); 

  const handleProfileClick = () => {
    setShowProfileForm(!showProfileForm);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
      fetchUserData(authToken); // Fetch user data
      fetchOrderData(authToken); // Fetch order data
  }, []);

  const fetchOrderData = async (authToken) => {
    try {
      const response = await fetch(SummaryApi.referralOrders.url, {
        method: SummaryApi.referralOrders.method,
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      let totalBusinesss = 0;

      if (Array.isArray(data.orders) && data.orders.length > 0) {
        data.orders.forEach((order) => {
          if (Array.isArray(order.products) && order.products.length > 0) {
            order.products.forEach((product) => {
              if (product.price) {
                totalBusinesss += product.price;
              }
            });
          }
        });

        setOrderData(data.orders);
        setUsersData(data.users);
      } else {
        console.log("No orders found.");
      }
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  const fetchUserData = async (authToken) => {
    try {
      const response = await fetch(SummaryApi.current_user.url, {
        method: SummaryApi.current_user.method,
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'Orders':
        return (
          <div className="order-details p-4 bg-gray-50 rounded-lg shadow-md">
            {orderData.length > 0 ? (
              <div className="overflow-x-auto max-h-64 overflow-y-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <thead className="bg-gray-100 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left font-semibold text-gray-700">Product</th>
                      <th className="px-6 py-3 text-left font-semibold text-gray-700">Quantity</th>
                      <th className="px-6 py-3 text-left font-semibold text-gray-700">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderData.map((order, index) => (
                      <React.Fragment key={index}>
                        {order.products.map((product, prodIndex) => (
                          <tr key={prodIndex} className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-gray-800">{product.name}</td>
                            <td className="px-6 py-4 text-gray-800">{product.quantity}</td>
                            <td className="px-6 py-4 text-gray-800">₹{product.price}</td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500">No orders found.</p>
            )}
          </div>
        );
      case 'Business':
        return <div className="p-4">Business Content...</div>;
      case 'My Team':
        return (
          <div className="p-4">
            {Array.isArray(userData?.data?.refferal.myrefferals) && userData.data.refferal.myrefferals.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead className="bg-gray-100 border-b border-gray-200">
                    <tr>
                      <th className="py-3 px-4 text-left text-gray-600 font-semibold">Name</th>
                      <th className="py-3 px-4 text-left text-gray-600 font-semibold">Created At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userData.data.refferal.myrefferals.map((referral, index) => (
                      <tr key={referral._id || index} className="border-b hover:bg-gray-50 border-gray-200">
                        <td className="py-3 px-4 text-gray-700">{referral.name}</td>
                        <td className="py-3 px-4 text-gray-700">{moment(referral.createdAt).format('LL')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>No referrals available.</p>
            )}
          </div>
        );
      case 'Your KYC':
        return <MyProfile />; // Render the KYC form here
      default:
        return <div className="p-4">Select an item to view details</div>;
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-gray-50 rounded-lg shadow-lg flex flex-col md:flex-row">
      {/* Left Sidebar */}
      <div className="md:w-1/4 p-4 bg-white shadow-lg rounded-lg">
        <div className="flex items-center mb-6">
          {userData?.profilePic ? (
            <img src={`${userData?.profilePic}`} alt="Profile" className="w-16 h-16 rounded-full" />
          ) : (
            <FaRegCircleUser size={40} className="text-gray-500" />
          )}
          <div className="ml-4">
            <h2 className="text-lg font-semibold">{userData?.data?.name}</h2>
          </div>
        </div>
        <nav className="space-y-4">
          <button
            onClick={() => setActiveSection('My Team')}
            className={`flex items-center w-full p-3 rounded-lg text-left transition ${
              activeSection === 'My Team' ? 'bg-sky-600 text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <FaUserFriends className="mr-2" /> My Team
          </button>
          <button
            onClick={() => setActiveSection('Orders')}
            className={`flex items-center w-full p-3 rounded-lg text-left transition ${
              activeSection === 'Orders' ? 'bg-sky-600 text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <FaListAlt className="mr-2" /> Orders
          </button>
          <button
            onClick={() => setActiveSection('Business')}
            className={`flex items-center w-full p-3 rounded-lg text-left transition ${
              activeSection === 'Business' ? 'bg-sky-600 text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <FaMoneyCheckAlt className="mr-2" /> Transactions
          </button>
          <button
            onClick={() => setActiveSection('Your KYC')} // Set active section to Your KYC
            className={`flex items-center w-full p-3 rounded-lg text-left transition ${
              activeSection === 'Your KYC' ? 'bg-sky-600 text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <FaUserFriends className="mr-2" /> Your KYC
          </button>
        </nav>
      </div>

      {/* Right Column */}
      <div className="md:w-3/4 md:ml-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-white shadow-lg rounded-lg">
            <h3 className="text-lg font-semibold text-gray-600">Total Purchasing</h3>
            <p className="text-2xl">₹{userData?.data?.businessPrices?.totalPurchase}</p>
          </div>
          <div className="p-4 bg-white shadow-lg rounded-lg">
            <h3 className="text-lg font-semibold text-gray-600">Business Incentive</h3>
            <p className="text-2xl">₹{userData?.data?.businessPrices?.totalIncentive}</p>
          </div>
          <div className="p-4 bg-white shadow-lg rounded-lg">
            <h3 className="text-lg font-semibold text-gray-600">My Purchasing</h3>
            <p className="text-2xl">₹{userData?.data?.businessPrices?.myPurchase}</p>
          </div>
        </div>
        <div className="p-6 bg-white shadow-lg rounded-lg">
          {renderContent()}
        </div>
    </div>
    </div>
  );
};
export default BusinessProfile;
