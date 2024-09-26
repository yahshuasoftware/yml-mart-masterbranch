import React, { createContext, useContext, useEffect, useState } from 'react';
import SummaryApi from '../common';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../store/userSlice';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));

  const fetchUserDetails = async () => {
    try {
      if (!authToken) {
        console.error("No auth token found");
        return;
      }

      const dataResponse = await fetch(SummaryApi.current_user.url, {
        method: SummaryApi.current_user.method,
        headers: {
          'Authorization': `Bearer ${authToken}`, // Include the token in the Authorization header
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const dataApi = await dataResponse.json();
      if (dataApi.success) {
        dispatch(setUserDetails(dataApi.data));
        setUser(dataApi.data);
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [authToken]); // Re-fetch if authToken changes

  return (
    <UserContext.Provider value={{ user, fetchUserDetails, authToken, setAuthToken }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
