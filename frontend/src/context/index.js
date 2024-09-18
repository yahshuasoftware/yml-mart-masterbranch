import { createContext, useState } from 'react';

const Context = createContext(null);

export const ContextProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(null);

    const saveAuthToken = (token) => {
        setAuthToken(token);
        // Optionally, you can also store the token in localStorage or cookies for persistence.
        localStorage.setItem('authToken', token);
    };

    const clearAuthToken = () => {
        setAuthToken(null);
        localStorage.removeItem('authToken'); // Remove token from storage when logged out.
    };

    return (
        <Context.Provider value={{ authToken, saveAuthToken, clearAuthToken }}>
            {children}
        </Context.Provider>
    );
};

export default Context;
