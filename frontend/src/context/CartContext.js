import React, { createContext, useContext, useState } from 'react';
import { useUser } from './userContext'; // Use the user context for authToken
import Context from "../context/index";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  // const { authToken } = useUser(); // Get authToken from userContext
  const { authToken } = useContext(Context); // Get the authToken from Context


  const fetchCartData = async (authToken) => {
    try {
      const response = await fetch('/api/cart', {
         credentials: 'include',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      setCart(data.cartItems || []);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  const addToCart = async (productId) => {
    try {
      const response = await fetch('/api/cart/add', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
      });

      if (response.ok) {
        fetchCartData(authToken); // Re-fetch cart data after adding an item
      } else {
        console.error("Failed to add product to cart");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, fetchCartData, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
