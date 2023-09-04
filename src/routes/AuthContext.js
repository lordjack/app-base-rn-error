import React, {createContext, useState} from 'react';

export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    const signIn = (userData) => {
        // Simulate successful login
        setUser(userData);
    };

    const signOut = () => {
        // Simulate logout
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{user, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    );
};
