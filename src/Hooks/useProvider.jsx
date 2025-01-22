import React, { useContext } from 'react';
import { AuthContext } from '../Context API/AuthProvider';

const useProvider = () => {
    const authContext = useContext(AuthContext)
    return authContext;
};

export default useProvider;