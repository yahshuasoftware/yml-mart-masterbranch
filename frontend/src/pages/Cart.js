import React, { useContext, useEffect, useState } from "react";
import SummaryApi from "../common";
import displayINRCurrency from "../helpers/displayCurrency";
import { MdCheckCircle, MdDelete } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import Context from "../context";
import AddressForm from "../components/AddressForm";
import { uploadAddress } from "../helpers/uploadAddress";

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasAddress, setHasAddress] = useState(false);
  const context = useContext(Context);

  const [userData, setUserData] = useState({});
  const [address, setAddress] = useState({});
  const [showAddressForm, setShowAddressForm] = useState(false);

  const handleAddNewAddress = () => {
    // Toggle the form's visibility
    setShowAddressForm((prevState) => !prevState);

    // Reset the address only when opening the form
    if (!showAddressForm) {
      setAddress({ street: "", city: "", state: "", zip: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    uploadAddress(address, setUserData, setShowAddressForm, setAddress);
    setShowAddressForm(false); // Hide the form after submission
  };

  const fetchUserDetails = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/user-details", {
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

  const totalQty = data.reduce(
    (previousValue, currentValue) => previousValue + currentValue.quantity,
    0
  );
  const totalPrice = data.reduce(
    (prev, curr) => prev + curr.quantity * curr?.productId?.sellingPrice,
    0
  );

  const increaseQty = async (id, qty) => {
    const response = await fetch(SummaryApi.updateCartProduct.url, {
      method: SummaryApi.updateCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
        quantity: qty + 1,
      }),
    });

    const responseData = await response.json();

    if (responseData.success) {
      fetchData();
    }
  };

  const decraseQty = async (id, qty) => {
    if (qty >= 2) {
      const response = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
          quantity: qty - 1,
        }),
      });

      const responseData = await response.json();

      if (responseData.success) {
        fetchData();
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
  const handlePayment = async () => {
   
    try {
      // Step 1: Create an order on the backend
      const response = await fetch(
        "http://localhost:8080/api/payment/create-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: totalPrice, // in INR
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
            products: data,
            userId: data[0].userId,
          }),
        }
      );

      const responseData = await response.json();

      if (!responseData.success) {
        alert("Unable to create order. Please try again.");
        return;
      }

      // Step 2: Open Razorpay payment gateway
      const options = {
        key: "rzp_test_U4XuiM2cjeWzma", // Razorpay key_id
        amount: responseData.order.amount, // Amount in paisa
        currency: responseData.order.currency,
        name: "YML Mart",
        description: "Payment for Order",
        image: "/logo.png",
        order_id: responseData.order.id, // order_id returned from backend
        handler: async function (response) {
          // Step 3: Send payment details to backend to store the order
          const paymentResponse = await fetch(
            "http://localhost:8080/api/payment/payment-success",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                order_id: response.razorpay_order_id,
                payment_id: response.razorpay_payment_id,
                signature: response.razorpay_signature,
                userId: data[0].userId,
                products: data,
                amount: totalPrice,
                currency: "INR",
              }),
            }
          );

          const paymentResult = await paymentResponse.json();

          if (paymentResult.success) {
            alert("Payment Successful! Order has been stored.");
          } else {
            alert(
              "Payment was successful, but there was an issue storing the order. Please contact support."
            );
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
  };

  return (
   <div className="container mx-auto flex flex-col lg:flex-row gap-8 p-6 lg:p-8">
  {/*** Left Column - LOGIN, Delivery Address, Payment ***/}
  <div className="w-full lg:w-[70%] h-max-content bg-white border border-gray-200 rounded-lg shadow-lg">
    {/* LOGIN Section */}
    <div className="mb-6 p-6 border-b border-gray-200">
      <div className="flex items-center gap-2 mb-3">
        <h3 className="text-xl font-semibold text-gray-800">Login</h3>
        <MdCheckCircle className="text-green-500 text-xl" />
      </div>
      {isLoggedIn ? (
        <div className="flex items-center gap-2">
          <p className="text-gray-700">
            {user?.name} ({user?.email})
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
      {hasAddress ? (
        <div className="text-gray-700">
          <p>
            <strong>Street:</strong> {user?.address?.street}<br />
            <strong>City:</strong> {user?.address?.city}<br />
            <strong>State:</strong> {user?.address?.state}<br />
            <strong>ZIP:</strong> {user?.address?.zip}
          </p>
        </div>
      ) : (
        <p className="text-red-500">No address provided.</p>
      )}
      <div className="flex items-center mt-4">
        <IoIosAddCircle className="text-sky-500 text-xl" />
        <button
          className="ml-2 text-blue-500 hover:text-blue-700"
          onClick={handleAddNewAddress}
        >
          {showAddressForm ? "Cancel" : "Add New Address"}
        </button>
      </div>

      {showAddressForm && (
        <form className="grid gap-4 mt-4" onSubmit={handleSubmit}>
          <AddressForm address={address} setAddress={setAddress} />
          <button className="bg-green-600 text-white py-2 px-4 rounded-lg w-[300px]">
            Update Address
          </button>
        </form>
      )}
    </div>
    {/* Payment Section */}
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Payment</h3>
      <button
        className="bg-green-600 text-white py-2 px-4 rounded-lg w-[300px]"
        onClick={handlePayment}
      >
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
          data.map((product) => (
            <div
              key={product._id}
              className="flex justify-between mb-4 p-3 border-b border-gray-200"
            >
              {/* Product Image and Quantity */}
              <div className="flex flex-col items-center w-24">
                <div className="w-16 h-16 bg-white flex items-center justify-center  border-gray-300 rounded-lg overflow-hidden">
                  <img
                    src={product.productId.productImage[0]}
                    alt={product.productId.productName}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                {/* Quantity Controls */}
                <div className="flex items-center gap-2 mt-2">
                  <button
                    className="border border-red-500 text-red-500 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded-full"
                    onClick={() =>
                      decraseQty(product?._id, product?.quantity)
                    }
                  >
                    -
                  </button>
                  <span className="text-gray-700">{product?.quantity}</span>
                  <button
                    className="border border-green-600 text-green-600 hover:bg-green-600 hover:text-white w-6 h-6 flex justify-center items-center rounded-full"
                    onClick={() =>
                      increaseQty(product?._id, product?.quantity)
                    }
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
                    {displayINRCurrency(
                      product.quantity * product.productId.price
                    )}
                  </p>
                  <p className="text-sm font-semibold text-gray-800">
                    {displayINRCurrency(
                      product.quantity * product.productId.sellingPrice
                    )}
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
          ))
        )}
      </div>
      <div className="border-t pt-4">
        <div className="flex justify-between mb-2 text-gray-700">
          <span>Delivery Charges:</span>
          <span>₹0</span>
        </div>
        <div className="flex justify-between mb-2 text-gray-700">
          <span>Discount:</span>
          <span>₹0</span>
        </div>
        <div className="flex justify-between text-lg font-semibold text-gray-800">
          <span>Total:</span>
          <span>{displayINRCurrency(totalPrice)}</span>
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default Cart;
