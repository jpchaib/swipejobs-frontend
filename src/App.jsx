import { useState, useEffect, useContext } from "react";
import style from "./App.module.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./components/userContext/UserContext";
import { MatchesProvider } from "./components/matchesContext/MatchesContext";
import Profile from "./components/profile/Profile";

function App() {
    return (
        <div className={style.Body}>
            <UserProvider>
                <MatchesProvider>
                    <Profile />
                </MatchesProvider>
            </UserProvider>
        </div>
    );
}

export default App;
