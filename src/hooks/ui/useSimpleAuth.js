import { useState } from "react"
import Settings from "../../repositories/Settings"
import AnimalRepository from "../../repositories/AnimalRepository"


const useSimpleAuth = () => {
    const [loggedIn, setIsLoggedIn] = useState(false)
    const [validToken, setValidToken] = useState(false)
    const [failureMessage, setFailureMessage] = useState("")

    const isAuthenticated = () => {
        const token = localStorage.getItem("kennel_token")
        console.log(token)
        if (token !== null) {
            AnimalRepository.get(1)
                .then(res => {
                    if (res.status !== 200) {
                        throw res
                    }

                    return res.json()
                })
                .then(res => {
                    setIsLoggedIn(true)
                })
                .catch(error => {
                    debugger
                    setIsLoggedIn(false)
                    if ("tokenStatus" in error && error.tokenStatus === "invalid") {
                        setValidToken(false)
                        setFailureMessage("Invalid token")
                    } else {
                        error.text().then(body => {
                            console.log(body)
                            setFailureMessage(body)
                        });
                    }
                })
        }
    }

    const register = (user) => {
        return fetch(`${Settings.remoteURL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(_ => _.json())
        .then(response => {
            localStorage.setItem("kennel_token", response.accessToken)
        })
    }

    const login = (email, password) => {
        return fetch(`${Settings.remoteURL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })
        .then(res => {
            if (res.status !== 200) {
                throw res
            }

            return res.json()
        })
        .then(response => {
            setIsLoggedIn(true)
            localStorage.setItem("kennel_token", response.accessToken)
        })
        .catch(error => {
            setIsLoggedIn(false)
            error.text().then(body => setFailureMessage(body));
        })
    }

    const logout = () => {
        console.log("*** Toggling auth state and removing credentials ***")
        setIsLoggedIn(false)
        localStorage.removeItem("kennel_token")
    }

    return { isAuthenticated, logout, login, register, validToken }
}

export default useSimpleAuth



