import { createContext } from 'react';

export const userContext = createContext(
    {
        user: {
            userId: null,
            userToken: null,
            userName: null,
            userPermissions: []
        },  
        setUser: (user) => {}
    }
);