import { createContext, useState, useEffect } from 'react';
import AuthService from '../utils/auth';



export const UserContext = createContext();

const Context =  ({ children }) => {

    const [user, setUser] = useState({
        loggedIn: false,
        user: null,
    });


    useEffect(() => {
        const token = AuthService.getToken();
        if (token && !AuthService.isTokenExpired(token)) {
            const user = AuthService.getProfile();
            setUser({
            loggedIn: true,
            user: user,
            user_id: user.data._id
            });


        } else {
            setUser({
            loggedIn: false,
            user: null,
            user_id: null,
            });
        }

    }, []);

    return <UserContext.Provider value={ [user, setUser] }>{ children }</UserContext.Provider>;

};

export default Context; 