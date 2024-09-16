import React, { useContext, useEffect, useState } from "react";
import SummaryApi from "../common";
import displayINRCurrency from "../helpers/displayCurrency";
import { MdCheckCircle, MdDelete } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import Context from "../context";
import { Plus, Minus } from 'react-feather';
import AddressForm from "../components/AddressForm";
import { uploadAddress } from "../helpers/uploadAddress";

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasAddress, setHasAddress] = useState(false);
  const context = useContext(Context);
  const [finalAmount, setFinalAmount] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0); 
  const [selectedAddress, setSelectedAddress] = useState(user?.address[0]); 
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [showAllAddresses, setShowAllAddresses] = useState(false);
  

  const [userData, setUserData] = useState({});
  const [address, setAddress] = useState({});

  const handleAddNewAddress = () => {
    // Toggle the form's visibility
    setShowAddressForm((prevState) => !prevState);

    // Reset the address only when opening the form
    // if (!showAddressForm) {
    //   setAddress({ street: "", city: "", state: "", zip: "" });
    // }
  };

  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
    setShowAllAddresses(false); // Hide the list once an address is selected
  };



  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   uploadAddress(address, setUserData, setShowAddressForm, setAddress);
  //   setShowAddressForm(false); // Hide the form after submission
  // };

  const fetchUserDetails = async () => {
    try {
      const response = await fetch(SummaryApi.current_user.url, {
        method: "GET",
        credentials: "include", // Include cookies to send the token
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      if (result.success) {
        setUser(result.data);

        setIsLoggedIn(true);
        setHasAddress(!!result.data.address);
        setSelectedAddress(result.data.address[0])
      } else {
        setIsLoggedIn(false);
        setHasAddress(false);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      setIsLoggedIn(false);
      setHasAddress(false);
    }
  };




  const fetchData = async () => {
    try {
      const response = await fetch(SummaryApi.addToCartProductView.url, {
        method: SummaryApi.addToCartProductView.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      });

      const responseData = await response.json();
      if (responseData.success) {
        setData(responseData.data);
        console.log(data)
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchUserDetails(); // Fetch user details including address
    fetchData(); // Fetch cart data
  }, []);

  useEffect(() => {
    if (!loading && data.length > 0) {
      // Filter out products that are out of stock or have insufficient stock
      const validProducts = data.filter(
        (product) => 
          product.productId.quantity > 0 && // Ensure product has stock
          product.productId.quantity >= product.quantity // Ensure stock is enough for quantity in the cart
      );
  
      // Calculate total price only for valid products
      const total = validProducts.reduce((previousValue, currentValue) => {
        return previousValue + (currentValue.quantity * currentValue.productId.sellingPrice);
      }, 0);
  
      // Set total price and final amount
      setTotalPrice(total);
      setFinalAmount(total);
    }
  }, [data, loading]);
  
 
  const totalQty = data
  .filter(product => product.productId.quantity > 0 && product.quantity > 0)
  .reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0);
  // const totalPrice = data.reduce(
  //   (prev, curr) => (prev + curr.quantity * curr?.productId?.sellingPrice),
    
  //   setDiscountPrice = 0.05 * totalPrice
  // );

  

  const increaseQty = async (id, qty, prdId) => {
    console.log(prdId);
    const response = await fetch(SummaryApi.updateCartProduct.url, {
      method: SummaryApi.updateCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
        quantity: qty + 1,
        productId: prdId,
      }),
    });
  
    const responseData = await response.json();
  
    if (responseData.success) {
      if (responseData.outOfStock) {
        alert("Product out of stock");
      } else if (responseData.availableStock <= 5) {
        alert(`Only ${responseData.availableStock} item(s) left in stock`);
      }
      fetchData(); // Refresh the cart data
    } else {
      alert(responseData.message); // Show error message if any
    }
  };
  
  
  const decreaseQty = async (id, qty,prdId) => {
    if (qty > 1) { // Only allow decrease if quantity is greater than 1
      const response = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
          quantity: qty - 1,
          productId :prdId
        }),
      });
  
      const responseData = await response.json();
  
      if (responseData.success) {
        fetchData(); // Refresh the cart data
      } else {
        alert(responseData.message); // Show error message if any
      }
    }
  };
  

  const deleteCartProduct = async (id) => {
    const response = await fetch(SummaryApi.deleteCartProduct.url, {
      method: SummaryApi.deleteCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
      }),
    });

    const responseData = await response.json();

    if (responseData.success) {
      fetchData();
      context.fetchUserAddToCart();
    }
  };

  
  // razorepay
  const handlePayment = async (finalAddress) => {
    if (!selectedAddress) {
      alert("Add Delivery Address");
    } else {
      try {
        // Filter out products that are out of stock or have insufficient stock
        const validProducts = data.filter(
          (product) =>
            product.productId.quantity > 0 && // Product is not out of stock
            product.productId.quantity >= product.quantity // Product has sufficient stock for the requested quantity
        );
  
        if (validProducts.length === 0) {
          alert("No valid products in your cart. Some items may be out of stock or have insufficient stock.");
          return;
        }
  
        // Calculate the total amount for valid products
        const totalAmount = validProducts.reduce((prev, curr) => {
          return prev + (curr.quantity * curr.productId.sellingPrice);
        }, 0);
  
        // Create an order on the backend
        const response = await fetch(SummaryApi.createOrder.url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: totalAmount, // Total for valid products
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
            products: validProducts, // Only valid products
            userId: data[0].userId,
            deliveryAddress: finalAddress,
          }),
        });
  
        const responseData = await response.json();
  
        if (!responseData.success) {
          alert("Unable to create order. Please try again.");
          return;
        }
  
        // Open Razorpay payment gateway
        const options = {
          key: process.env.RAZARPAY_KEY, // Razorpay key_id
          amount: responseData.order.amount, // Amount in paisa
          currency: responseData.order.currency,
          name: "YML Mart",
          description: "Payment for Order",
          image: "/logo.png",
          order_id: responseData.order.id, // order_id returned from backend
          handler: async function (response) {
            // Send payment details to backend to store the order
            const paymentResponse = await fetch(SummaryApi.payment_Success.url, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                order_id: response.razorpay_order_id,
                payment_id: response.razorpay_payment_id,
                signature: response.razorpay_signature,
                userId: data[0].userId,
                products: validProducts, // Ensure only valid products are saved in the final order
                amount: totalAmount,
                currency: "INR",
              }),
            });
  
            const paymentResult = await paymentResponse.json();
  
            if (paymentResult.success) {
              alert("Payment Successful! Order has been stored.");
            } else {
              alert("Payment was successful, but there was an issue storing the order. Please contact support.");
            }
          },
          prefill: {
            name: user?.name || "Your Name",
            email: user?.email || "Your Email Id",
            contact: user?.contact || "0000000000",
          },
          theme: {
            color: "#3399cc",
          },
        };
  
        const rzp = new window.Razorpay(options);
        rzp.open();
  
        rzp.on("payment.failed", function (response) {
          alert("Payment Failed");
          console.error("Payment Failed:", response.error);
        });
      } catch (error) {
        console.error("Payment error:", error);
      }
    }
  };
  
  

  return (
   <div className="container mx-auto flex flex-col lg:flex-row gap-8 p-6 lg:p-8">
  {/*** Left Column - LOGIN, Delivery Address, Payment ***/}
  <div className="w-full lg:w-[70%] h-max-content bg-white border border-gray-200 rounded-lg shadow-lg">
    {/* LOGIN Section */}
    <div className=" p-6 border-b border-gray-200">
      <div className="flex items-center gap-2 ">
        <h3 className="text-xl font-semibold text-gray-800">Login</h3>
        <MdCheckCircle className="text-green-500 text-xl" />
      </div>
      {isLoggedIn ? (
        <div className="flex items-center gap-2">
          <p className="text-gray-700">
            {user?.name}
          </p>
        </div>
      ) : (
        <p className="text-red-500">Please log in to proceed.</p>
      )}
    </div>

    {/* Delivery Address */}
    <div className="mb-6 p-6 border-b border-gray-200">

    <div className="flex items-center gap-2 mb-3">
        <h3 className="text-xl font-semibold text-gray-800">Delivery Address</h3>
        <MdCheckCircle className="text-green-500 text-xl" />
        
      </div>
    {selectedAddress ? (
        <div className="text-gray-700 flex gap-10">
          <p>
          {selectedAddress?.name}, {selectedAddress?.mobileNo}, <br />
            {selectedAddress?.street}, {selectedAddress?.city}, <br />
            {selectedAddress?.state}, <strong>{selectedAddress?.zip}</strong>
          </p>
          </div>
      ) : (
        <p className="text-red-500">No address provided.</p>
      )}
          <div className="flex items-center mt-4">
        <button
          className="ml-2  text-sky-600 hover:text-sky-700"
          onClick={() => setShowAllAddresses(!showAllAddresses)}
        >
          {showAllAddresses ? 'Hide Addresses' : 'Change Address'}
        </button>
      </div>

      {showAllAddresses && (
        <div className="mt-4">
          {user?.address?.length > 0 ? (
            user?.address.map((addr, index) => (
              <div key={index} className="p-4 mb-4 border rounded-lg bg-gray-100">
                <p className="text-gray-700">
                {addr?.name}, {addr?.mobileNo}, <br />
                  {addr?.street}, {addr?.city}, <br />
                  {addr?.state} - <strong>{addr?.zip}</strong>
                </p>
                <button
                  className="mt-2 text-green-500 hover:text-green-700"
                  onClick={() => handleSelectAddress(addr)}
                >
                  Select
                </button>
              </div>
            ))
          ) : (
            <p className="text-red-500">No addresses available.</p>
          )}
        </div>
      )}
              

      
      </div>
    {/* Payment Section */}
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Payment</h3>
      <button
        className="bg-green-600 text-white py-2 px-4 rounded-lg w-[300px]"
        onClick={() => handlePayment(selectedAddress)}      >
        Proceed to Payment
      </button>
    </div>
  </div>

  {/*** Right Column - My Cart Summary ***/}
  <div className="w-full lg:w-[30%] bg-white border border-gray-200 rounded-lg shadow-lg">
  <div className="p-6">
    <div className="flex justify-between mb-4">
      <h3 className="text-xl font-semibold text-gray-800">My Cart</h3>
      <span className="text-gray-600">{totalQty} items</span>
    </div>

    <div className="mb-4">
      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : (
        data.map((product) => {
          // Check if product is out of stock (based on available stock)
          const isOutOfStock = product.productId.quantity === 0;
          const isPartialStock = product.productId.quantity < product.quantity;
          
          return (
            <div
              key={product._id}
              className={`flex justify-between mb-4 p-3 border-b border-gray-200 ${isOutOfStock || isPartialStock ? 'opacity-50' : ''}`}
            >
              {/* Product Image and Quantity */}
              <div className="flex flex-col items-center w-24">
                <div className="w-16 h-16 bg-white flex items-center justify-center border-gray-300 rounded-lg overflow-hidden">
                  <div className="relative">
                    <div className={`max-w-full max-h-full object-contain ${isOutOfStock ? 'grayscale' : ''}`}>
                      <img
                        src={product.productId.productImage[0]}
                        alt={product.productId.productName}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
        
                    {/* Show out-of-stock or partial stock warning */}
                    {isOutOfStock && (
                      <div className="absolute top-0 left-0 w-full bg-red-600 text-white text-center font-bold py-1">
                        Out of Stock
                      </div>
                    )}
        
                    {isPartialStock &&  !isOutOfStock && (
                      <div className="absolute top-0 left-0 w-full bg-yellow-600 text-white text-center font-bold py-1">
                        Only {product.productId.quantity} left
                      </div>
                    )}
                  </div>
                </div>
        
                {/* Quantity Controls */}
                <div className="flex items-center gap-2 mt-2">
                  <button
                    className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-5 h-5 flex justify-center items-center rounded-full"
                    onClick={() => decreaseQty(product?._id, product?.quantity, product.productId._id)}
                    disabled={isOutOfStock} // Disable button if out of stock
                  >
                    -
                  </button>
                  <span className="text-gray-700">{product?.quantity}</span>
                  <button
                    className="border border-green-600 text-green-600 hover:bg-green-600 hover:text-white w-5 h-5 flex justify-center items-center rounded-full"
                    onClick={() => increaseQty(product?._id, product?.quantity, product.productId._id)}
                    disabled={isOutOfStock || isPartialStock} // Disable button if out of stock or insufficient stock
                  >
                    +
                  </button>
                </div>
              </div>
        
              {/* Product Details and Delete Button */}
              <div className="flex flex-col flex-1 ml-4">
                <div className="flex flex-col">
                  <p className="text-sm font-medium text-gray-800">
                    {product.productId.productName}
                  </p>
                  <p className="text-sm font-semibold text-gray-500 line-through">
                    {displayINRCurrency(product.quantity * product.productId.price)}
                  </p>
                  <p className="text-sm font-semibold text-gray-800">
                    {displayINRCurrency(product.quantity * product.productId.sellingPrice)}
                  </p>
                </div>
                {/* Delete Button */}
                <div className="flex justify-end mt-2">
                  <div
                    className="text-red-600 hover:bg-red-600 hover:text-white p-2 rounded-full cursor-pointer"
                    onClick={() => deleteCartProduct(product?._id)}
                  >
                    <MdDelete />
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>

    {/* Cart Summary */}
    <div className="border-t pt-4">
      <div className="flex justify-between mb-2 text-gray-700">
        <span>Delivery Charges:</span>
        <span>₹0</span>
      </div>
      <div className="flex justify-between mb-2 text-red-500">
        <span>Discount:</span>
        {displayINRCurrency(0)}
      </div>
      <div className="flex justify-between font-semibold text-gray-800">
        <span>Total:</span>
        <span className="text-md">
          {displayINRCurrency(totalPrice)}
        </span>
      </div>
    </div>
  </div>
</div>

</div>

  );
};

export default Cart;