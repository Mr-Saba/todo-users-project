import { createContext, useState } from "react";

const UserContext = createContext({
    userData: null
})

const UserProvider = ({children}) => {
    const [userData, setUserData] = useState(null)

    return (
        <UserContext.Provider value={{userData, setUserData}}>
            {children}
        </UserContext.Provider>
    )
}

export {UserContext, UserProvider}