// src/context/CartContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import SummaryApi from '../common';

// Create the context
const CartContext = createContext();

// Create a provider component
export const CartProvider = ({ children }) => {
  const [cartProductCount, setCartProductCount] = useState(0);

  const fetchCartProductCount = async () => {
    try {
      const response = await fetch(SummaryApi.addToCartProductCount.url, {
        method: SummaryApi.addToCartProductCount.method,
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setCartProductCount(data?.data?.count || 0);
    } catch (error) {
      console.error('Error fetching cart product count:', error);
    }
  };
  

  useEffect(() => {
    fetchCartProductCount();
  }, []);

  // Function to manually update the cart count
  const updateCartProductCount = async () => {
    await fetchCartProductCount();
  };

  return (
    <CartContext.Provider value={{ cartProductCount, updateCartProductCount }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the CartContext
export const useCart = () => {
  return useContext(CartContext);
};
