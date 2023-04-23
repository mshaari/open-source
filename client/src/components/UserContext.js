import { createContext, useState } from 'react';

export const UserContext = createContext();

const Context = ({ children }) => {

<<<<<<< HEAD
    const [ user,setUser ] = useState(()=> ({ loggedIn: true, paidMember: true }));
=======
    const [ user, setUser ] = useState(()=> ({ loggedIn: true, paidMember: true }));
>>>>>>> 18ca85bc7e7acfa8ef963b7d8daf84bddb65afe5

    return <UserContext.Provider value={ [user, setUser] }>{ children }</UserContext.Provider>;

};

export default Context;