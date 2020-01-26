import { useState } from "react"

const useSimpleAuth = () => {
    const [loggedIn, setIsLoggedIn] = useState(false)

    const isAuthenticated = () =>
        loggedIn
        || localStorage.getItem("kennel_token") !== null
        || sessionStorage.getItem("kennel_token") !== null

    const register = (email, password) => {
        fetch("http://localhost:5002/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })
        .then(_ => _.json())
        .then(response => {
            localStorage.setItem("kennel_token", response.accessToken)
        })
    }

    const login = (email, password) => {
        return fetch("http://localhost:5002/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })
        .then(_ => _.json())
        .then(response => {
            setIsLoggedIn(true)
            localStorage.setItem("kennel_token", response.accessToken)
        })
    }

    const logout = () => {
        console.log("*** Toggling auth state and removing credentials ***")
        setIsLoggedIn(false)
        localStorage.removeItem("kennel_token")
        sessionStorage.removeItem("kennel_token")
    }

    return { isAuthenticated, logout, login, register }
}

export default useSimpleAuth



