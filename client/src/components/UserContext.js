import { createContext, useState, useEffect } from 'react';
import AuthService from '../utils/auth';


export const UserContext = createContext();

const AuthProvider =  ({ children }) => {

    const [user, setUser] = useState({
        loggedIn: false,
        user: null,
    });

    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme !== null ? JSON.parse(savedTheme) : { greyscale: false };
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

    },[localStorage.getItem('id_token')]);

    // const toggleTheme = () => {
    //     const newTheme = { ...theme, greyscale: !theme.greyscale };
    //     setTheme(newTheme);
    //     localStorage.setItem('theme', JSON.stringify(newTheme));
    // };

    const toggleTheme = () => {
        const newTheme = { ...theme, greyscale: !theme.greyscale };
        setTheme(newTheme);
        localStorage.setItem('theme', JSON.stringify(newTheme));
      };


    return <UserContext.Provider value={[user, setUser, theme, setTheme, toggleTheme]}>{ children }</UserContext.Provider>;

};

export default AuthProvider; 