import React, { createContext, useState } from "react";
const profileNumber = process.env.REACT_APP_WORKER_ID_STRING;

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(profileNumber);

    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
