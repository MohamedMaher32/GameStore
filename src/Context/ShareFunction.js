import { createContext } from "react";
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
export let FunctionContext = createContext(null)
export function FunctionContextProvider(props) {
    let [userData, setUserData] = useState(null)
    // if condation for if user have already data in localstorage
    useEffect(() => {
        if (localStorage.getItem("token")) {
            let token = localStorage.getItem("token") // object {user data}
            let data = jwtDecode(token)
            saveUserData(data)
        }
    }, [])
    // display user name in profile page
    function saveUserData(data) {
        setUserData(data)
    }
    // logout function
    function deleteData() {
        localStorage.removeItem("token")
        setUserData(null)
    }
    return <FunctionContext.Provider value={{deleteData , saveUserData , userData}}>
        {props.children}
    </FunctionContext.Provider>
}