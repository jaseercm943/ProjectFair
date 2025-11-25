import React, { useEffect, useState } from "react";
import { createContext } from "react";

export const addResponseContext = createContext();

export const editResponseContext = createContext();

export const LoginResponseContext = createContext();

function Context({ children }) {
    const [addProjectResponse, setaddProjectResponse] = useState({});

    const [editProjectResponse, seteditProjectResponse] = useState({});

    const [isLoginResponse, setisLoginResponse] = useState(false);

    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            setisLoginResponse(true);
        } else {
            setisLoginResponse(false);
        }
    }, [isLoginResponse]);

    return (
        <div>
            <LoginResponseContext.Provider value={{ isLoginResponse, setisLoginResponse }}>
                <editResponseContext.Provider value={{ editProjectResponse, seteditProjectResponse }}>
                    <addResponseContext.Provider value={{ addProjectResponse, setaddProjectResponse }}>
                        {children}
                    </addResponseContext.Provider>
                </editResponseContext.Provider>
            </LoginResponseContext.Provider>
        </div>
    );
}

export default Context;
