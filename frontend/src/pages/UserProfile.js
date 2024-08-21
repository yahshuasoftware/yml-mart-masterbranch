import React, { useState,useEffect } from 'react';
import { MdLocationOff } from "react-icons/md";
import { FaTimes, FaBars } from 'react-icons/fa';
import { BsBagXFill } from "react-icons/bs";
import { CgTrack } from "react-icons/cg";
import { useSelector } from 'react-redux'
import { MdModeEditOutline } from "react-icons/md";
import { FaRegCircleUser } from "react-icons/fa6";



const Profile = () => {
  const [activeSection, setActiveSection] = useState('Profile Information');
  const [sidebarOpen, setSidebarOpen] = useState(false); // State for sidebar visibility
  const [userData, setUserData] = useState(null)
  const [orderData, setOrderData] = useState(null)
  
  const user = useSelector(state => state?.user?.user)
  // const token = localStorage.getItem('token');
  // alert(token)


  useEffect(() => {
    const fetchUserData = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/user-details', {
                method: 'GET',
                credentials: 'include', 
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
                setUserData(data.data);
                setOrderData(data.orderDetail);
                

        } catch (error) {
            console.error('Error:', error);
        }
    };

    fetchUserData();
}, []);



  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  
  

  const renderContent = () => {
    switch (activeSection) {
      case 'Profile Information':
        return (
            <div>
            <h1 className="text-2xl font-bold mb-4">Profile Information</h1>
            <div className="flex flex-col items-center mb-6">
            <div className="relative inline-block">
            {userData?.profilePic ? (
              <img
                src={`${userData?.profilePic}`}
                alt="Profile"
                className="w-24 h-24 rounded-full mb-2"
              />
              ) : (
                <FaRegCircleUser size={70} className="text-gray-500" />
              )}
            <MdModeEditOutline className="bg-sky-600 text-white rounded-full p-1 text-3xl absolute bottom-3 right-5 transform translate-x-1/2 translate-y-1/2" />
          </div>

              <h2 className="text-xl font-semibold">{userData?.name.toUpperCase()}</h2>
              {/* <h2>{orderData.signature}</h2> */}
            </div>
            <form className="space-y-4">
              <div className="flex flex-col">
                <label htmlFor="first-name" className="font-semibold mb-1">Name</label>
                <input id="first-name" value={`${userData?.name}`} className="border border-gray-300 p-2 rounded"/>
                  
                
              </div>
             
              <div className="flex flex-col">
                <label htmlFor="phone" className="font-semibold mb-1">Phone Number</label>
                <input id="mobileNo" value={`${userData?.mobileNo}`}  className="border border-gray-300 p-2 rounded"/>               
                
              </div>
              <div className="flex flex-col">
                <label htmlFor="email" className="font-semibold mb-1">Email</label>
                <input id="email" value={`${userData?.email}`} className="border border-gray-300 p-2 rounded"/>               
              </div>
              <button type="submit" className="bg-sky-600 text-white py-2 px-4 rounded mt-4 w-full">Edit</button>
            </form>
          </div>
          
        );
      case 'My Orders':
        return (
          <div>
            <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
            {orderData ? (
                <div className='w-full max-w-3xl'>
                {orderData && orderData.length > 0 ? (
                    <div>
                        <h2 className='text-xl font-semibold mb-4'>Order Details</h2>
                        {orderData.map((order) => (
                            <div key={order._id} className='mb-6'>
                                <div className="order-container">
                                    {order.products.map((product) => (
                                        <div key={product._id} className='w-full bg-white h-32 my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr]'>
                                            <div className='w-30 h-30 bg-slate-200 overflow-hidden'>
                                                <img sizes='' src={product.image[0]} alt={product.name} className='w-full h-full object-cover' />
                                            </div>
                                            <div className='px-4 py-2'>
                                                <h3 className='text-lg font-medium'>{product.name}</h3>
                                                <p><strong>Quantity:</strong> {product.quantity}</p>
                                                <p><strong>Price:</strong> {"₹"+(product.price)}</p>
                                                <p><strong>Status:</strong> {order.status}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center">
                        <BsBagXFill style={{ fontSize: '6rem' }} className="text-sky-600 text-6xl mb-2" />
                        <p>No orders found!</p>
                    </div>
                )}
            </div>
            ) : (
                <div className="flex flex-col items-center">
                    <BsBagXFill style={{ fontSize: '6rem' }} className="text-sky-600 text-6xl mb-2" />
                    <p>No order found!</p>
                </div>
            )}
            
          </div>
        );
      // case 'Wishlist':
      //   return (
      //     <div>
      //       <h1 className="text-2xl font-bold mb-4">Wishlist</h1>
      //       <div className="flex flex-col items-center">
      //         <MdSpeakerNotesOff style={{ fontSize: '6rem' }} className="text-sky-600 text-6xl mb-2" />
      //         <p>No product found in wishlist</p>
      //       </div>
      //     </div>
      //   );
      case 'Address':
        return (
          <div>
            <h1 className="text-2xl font-bold mb-4">Address</h1>
            <div>
      {user.address ? (
        <p>{user.address}</p>
      ) : (
        <div className="flex flex-col items-center">
          <MdLocationOff style={{ fontSize: '6rem' }} className="text-sky-600 text-6xl mb-2" />
          <p>No address is saved</p>
        </div>
      )}
    </div>
          </div>
        );
      // case 'Coupons':
      //   return (
      //     <div>
      //       <h1 className="text-2xl font-bold mb-4">Your Coupons</h1>
      //       <div className="flex flex-col items-center">
      //       <RiDiscountPercentFill style={{ fontSize: '6rem' }} className="text-sky-600 mb-2" />
      //       <p>No coupon found!</p>
      //       </div>
      //     </div>
      //   );
      case 'Track Order':
        return (
          <div>
            <h1 className="text-2xl font-bold mb-4">Track Your Order</h1>
            <div className="flex flex-col items-center">
              <CgTrack style={{ fontSize: '6rem' }} className="text-sky-600 text-6xl mb-2" />
              <p>Order not found!</p>
            </div>
          </div>
        );
      default:
        return <div><h1 className="text-2xl font-bold mb-4">Profile Information</h1></div>;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative flex w-full max-w-5xl bg-white rounded-lg shadow-lg">
      <button className="absolute top-4 right-4 bg-sky-600 text-white p-2 rounded-md md:hidden" onClick={toggleSidebar}>
  {sidebarOpen ? <FaTimes /> : <FaBars />}
</button>

        <aside className={`z-50 md:z-10 md:h-auto fixed top-0 left-0 mt[0] h-[100vh] bg-gray-100 p-4 transition-transform transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 md:w-64`}>
          <ul className="space-y-5">
            <li className={activeSection === 'Profile Information' ? 'font-bold text-sky-600' : ''}>
              <button onClick={() => { setActiveSection('Profile Information'); toggleSidebar(); }} className="text-lg">Profile Information</button>
            </li>
            <li className={activeSection === 'My Orders' ? 'font-bold text-sky-600' : ''}>
              <button onClick={() => { setActiveSection('My Orders'); toggleSidebar(); }} className="text-lg">My Orders</button>
            </li>
            {/* <li className={activeSection === 'Wishlist' ? 'font-bold text-sky-600' : ''}>
              <button onClick={() => { setActiveSection('Wishlist'); toggleSidebar(); }} className="text-lg">Wishlist</button>
            </li> */}
            <li className={activeSection === 'Address' ? 'font-bold text-sky-600' : ''}>
              <button onClick={() => { setActiveSection('Address'); toggleSidebar(); }} className="text-lg">Address</button>
            </li>
            {/* <li className={activeSection === 'Coupons' ? 'font-bold text-sky-600' : ''}>
              <button onClick={() => { setActiveSection('Coupons'); toggleSidebar(); }} className="text-lg">Coupons</button>
            </li> */}
            <li className={activeSection === 'Track Order' ? 'font-bold text-sky-600' : ''}>
              <button onClick={() => { setActiveSection('Track Order'); toggleSidebar(); }} className="text-lg">Track Order</button>
            </li>
          </ul>
        </aside>
        <main className="flex-1 p-4 md:ml-10">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Profile;
