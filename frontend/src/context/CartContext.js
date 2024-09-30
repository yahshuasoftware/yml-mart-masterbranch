import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from './userContext';
import SummaryApi from '../common';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartProductCount, setCartProductCount] = useState(0);
  const { authToken } = useUser();

  // Fetch cart count from the API
  const fetchCartCount = async () => {
    try {
      const response = await fetch(SummaryApi.addToCartProductCount.url, {
        method: SummaryApi.addToCartProductCount.method,
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      console.log('Fetched data:', data); // Log full response
  
      if (data.success) {
        console.log('Count:', data?.count);
        setCartProductCount(data.count);
    } else {
        console.error('Failed to fetch cart count');
      }
    } catch (error) {
      console.error('Error fetching cart count:', error);
    }
  };
  

  // Call fetchCartCount when the component mounts or authToken changes
  useEffect(() => {
    if (authToken) {
      fetchCartCount();
    }
  }, [authToken]);

  return (
    <CartContext.Provider value={{ cartProductCount, fetchCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
