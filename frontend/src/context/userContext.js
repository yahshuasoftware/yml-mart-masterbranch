import React, { createContext, useContext, useEffect, useState } from 'react';
import SummaryApi from '../common';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../store/userSlice';

// Create the context
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);

  const fetchUserDetails = async () => {
    try {
      const dataResponse = await fetch(SummaryApi.current_user.url, {
        method: SummaryApi.current_user.method,
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
  }, []);

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => {
  return useContext(UserContext);
};
