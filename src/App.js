import React, { useState, useEffect } from "react";
import "./style.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./components/Home";
import Cookies from "js-cookie";

function App() {
    const [user, setUser] = useState();

    useEffect(() => {
        if (Cookies.get("accessToken")) {
            setUser({
                name: Cookies.get("name"),
                picture: Cookies.get("picture"),
            });
        }
    }, []);

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route
                        exact
                        path="/"
                        element={<Home user={user} setUser={setUser} />}
                    />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
