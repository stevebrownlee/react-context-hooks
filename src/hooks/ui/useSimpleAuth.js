import { useState } from "react"

const useSimpleAuth = () => {

    const [loggedIn, setIsLoggedIn] = useState(false)

    const isAuthenticated = () =>
        loggedIn
        || localStorage.getItem("credentials") !== null
        || sessionStorage.getItem("credentials") !== null

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
        fetch("http://localhost:5002/login", {
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

    const logout = () => {
        setIsLoggedIn(false)
        localStorage.removeItem("credentials")
        sessionStorage.removeItem("credentials")
    }

    return { isAuthenticated, logout, login }
}

export default useSimpleAuth



