
import { createContext, useContext } from "react";

export const UserContext = createContext();

export const ContextProvider = UserContext.Provider;

export const useContextData = () => {
    return useContext(UserContext);
}