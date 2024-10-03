import React, { useContext, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import SummaryApi from '../common';
import Context from '../context/index';


export const uploadAddress = async (address, setUserData,authToken) => {
  try {
    const response = await fetch(SummaryApi.uploadAddress.url, {  
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`, 
    },
      body: JSON.stringify({ address }),
    });

    const responseData = await response.json();

    if (response.ok) {  
      if (responseData.success) {
        toast.success(responseData?.message);
        console.log('New addresses:', responseData.data.address);

        // Update user data with the new address list(important to add address data instatnt after clicking add address button)
        setUserData(prevUserData => ({
          ...prevUserData,
          address: responseData.data.address, // Update the address list with the new data
        }));

        // Optionally, update state for address visibility
        // setHasAddress(true);
        // setShowAddressForm(false);
      } else {
        toast.error(responseData?.message || 'Failed to update address.');
      }
    } else {
      throw new Error(responseData?.message || 'Failed to update address.');
    }
  } catch (error) {
    toast.error(error.message || 'An error occurred while updating the address');
    console.error('Error:', error);
  }
};
