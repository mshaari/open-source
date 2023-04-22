import { createContext, useState } from 'react';

export const UserContext = createContext();

const Context = ({ children }) => {

    const [ user, setUser ] = useState(()=> ({ loggedIn: true, paidMember: true }));

    return <UserContext.Provider value={ [user, setUser] }>{ children }</UserContext.Provider>;

};

export default Context;