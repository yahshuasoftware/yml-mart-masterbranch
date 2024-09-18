import React, { useState,useEffect } from 'react';
import MyProfile from './ProfileForm';
import { FaTimes, FaBars } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import moment from 'moment';
import SummaryApi from '../../common';

const BusinessProfile = () => {
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [activeSection, setActiveSection] = useState("My Team");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [usersData, setUsersData] = useState(null);
  const [totalPurchasing, setTotalPurchasing] = useState(0);
  const [orderData, setOrderData] = useState([]);
  const [totalBusiness, setTotalBusiness] = useState(0);
  const [totalIntensive, setTotalIntensive] = useState(0);


  const handleProfileClick = () => {
    setShowProfileForm(!showProfileForm);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  function withdraw(){
    
    alert("Complete KYC!!")
  }




  useEffect(() => {
      fetchUserData(); // Fetch user data
      fetchOrderData(); // Fetch order data
    
  }, []);
  
  useEffect(() => {
    if (totalBusiness && totalIntensive && totalPurchasing && userData) {
      pushAllPricesInDb(totalBusiness, totalIntensive, totalPurchasing);
    }
  }, [totalBusiness, totalIntensive, totalPurchasing]);
  
  const fetchOrderData = async (authToken) => {
    alert(authToken)
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
        // setUserData(data.user);
        setUsersData(data.users);
        setTotalBusiness(totalBusinesss.toFixed(2));
        setTotalIntensive((0.05 * totalBusinesss).toFixed(2));
      } else {
        console.log("No orders found.");
      }
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };
  
  const fetchUserData = async (authToken) => {
    try {
      // alert(authToken)
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
      console.log(data);
      setUserData(data);
  
      if (data.orderDetail) {
        const totalAmount = data.orderDetail
          .filter((order) => order.status === 'paid')
          .reduce(
            (acc, order) =>
              acc +
              order.products.reduce(
                (acc, product) => acc + product.price * product.quantity,
                0
              ),
            0
          );
  
        setTotalPurchasing(totalAmount.toFixed(2));
        
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  const pushAllPricesInDb = async (totalBusiness, totalIntensive, totalPurchasing) => {
    try {

      const response = await fetch(SummaryApi.pushAllPricesInDb.url, {
        method: SummaryApi.pushAllPricesInDb.method,
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          totalBusiness,
          totalIntensive,
          totalPurchasing,
          userId: userData.data._id // Ensure you pass the correct userId
        }),
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      
      
      const data = await response.json();
        // setTotalBusiness(0)
        // setTotalPurchasing(0)
        // setTotalIntensive(0)
        // console.log(totalBusiness)
      console.log('Response from server:', data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  




  const renderContent = () => {
    switch (activeSection) {
      case 'Orders':
        return <div className="order-details  p-4 bg-gray-50 rounded-lg shadow-md">

    {orderData.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-100 border-b">
                <tr>
                    <th className="px-6 py-3 text-left  font-semibold text-gray-700">Product</th>
                    <th className="px-6 py-3 text-left  font-semibold text-gray-700">Quantity</th>
                    <th className="px-6 py-3 text-left  font-semibold text-gray-700">Price</th>
                    {/* <th className="px-6 py-3 text-left  font-semibold text-gray-700">Commission</th> */}
                </tr>
            </thead>
            <tbody>
                {orderData.map((order, index) => (
                    <React.Fragment key={index}>
                        {order.products.map((product, prodIndex) => (
                            <tr key={prodIndex} className="hover:bg-gray-50">
                                <td className="px-6 py-4  text-gray-800">{product.name}</td>
                                <td className="px-6 py-4  text-gray-800">{product.quantity}</td>
                                <td className="px-6 py-4  text-gray-800">₹{product.price}</td>
                                {/* <td className="px-6 py-4  text-gray-800">₹{product.totalBusiness}</td> */}
                            </tr>
                        ))}
                    </React.Fragment>
                ))}
            </tbody>
        </table>
    ) : (
        <p className="text-gray-500">No orders found.</p>
    )}


        </div>;
      case 'Business':
        return <div className="p-4">Business Content...</div>;
      case 'My Team':
        return <div className="p-4">
        {Array.isArray(usersData) && usersData.length > 0 ? (
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-gray-100 border-b border-gray-200">
                        <tr>
                            <th className="py-3 px-4 text-left text-gray-600 font-semibold">Name</th>
                            {/* <th className="py-3 px-4 text-left text-gray-600 font-semibold">Email</th>
                            <th className="py-3 px-4 text-left text-gray-600 font-semibold">Mobile No</th> */}
                            <th className="py-3 px-4 text-left text-gray-600 font-semibold">Created At</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {usersData.map((referral, index) => (
                            <tr key={referral._id || index} className="border-b hover:bg-gray-50 border-gray-200">
                                <td className="py-3 px-4 text-gray-700">{referral.name}</td>
                                {/* <td className="py-3 px-4 text-gray-700">{referral.email}</td>
                                <td className="py-3 px-4 text-gray-700">{referral.mobileNo}</td> */}
                                <td className="py-3 px-4 text-gray-700">{moment(referral?.createdAt).format('LL')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        ) : (
            <div className="text-center text-gray-500">No referrals available.</div>
        )}
    </div>
   
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
          <div className="ml-4 text-2xl font-bold">{userData && <div>Welcome, {userData.data.name}!</div>}</div>
        </div>
        <button
          className="px-4 py-2 bg-sky-600 z-30 text-white rounded-md hover:bg-sky-700"
          onClick={handleProfileClick}
        >
          {showProfileForm ? 'Close Profile' : 'My Profile'}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 ">
        <div className="bg-gray-100 p-4 rounded-md shadow-md">
          <h3 className="text-lg font-semibold">Total Purchasing</h3>
          <p className="text-xl">₹{(totalBusiness)}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-md shadow-md">
          <h3 className="text-lg font-semibold">Business Intensive(Income)</h3>
          <p className="text-xl">₹{totalIntensive}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-md shadow-md">
          <h3 className="text-lg font-semibold">My Purchasing</h3>
          <p className="text-xl">₹{totalPurchasing}</p>
        </div>
      </div>
      <button onClick={withdraw} className='h-10 w-50 mb-6 bg-red-500 text-white rounded-md mt-5 px-5'>Withdraw Balance</button>

      <div className="flex flex-col sm:flex-row h-auto   bg-white rounded-lg shadow-lg overflow-hidden">
  {/* Sidebar */}
  <div className="w-full sm:w-1/3 bg-gray-50">
  <button
        className="absolute right-10 bg-sky-600 text-white p-2 rounded-md md:hidden z-30"
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
            className={activeSection === 'Business Record' ? 'font-bold text-sky-600' : ''}
          >
            <button
              onClick={() => {
                setActiveSection('Business Record');
                if (sidebarOpen) toggleSidebar(); // Close sidebar on mobile
              }}
              className="text-lg"
            >
              Transactions
            </button>
          </li>
        </ul>
      </div>

  </div>

  {/* Content Area */}
  <div className="w-full sm:w-2/3 bg-white ">
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
