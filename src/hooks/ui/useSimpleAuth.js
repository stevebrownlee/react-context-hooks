import { useState } from "react"
import Settings from "../../repositories/Settings"


const useSimpleAuth = () => {
    const [loggedIn, setIsLoggedIn] = useState(false)

    const isAuthenticated = () =>
        loggedIn
        || localStorage.getItem("kennel_token") !== null
        || sessionStorage.getItem("kennel_token") !== null

    const register = (user) => {
        return fetch(`${Settings.remoteURL}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(_ => _.json())
        .then(response => {
            if ("id" in response) {
                localStorage.setItem("kennel_token", response.id)
            }
        })
    }

    const login = (email) => {
        return fetch(`${Settings.remoteURL}/users?email=${email}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(_ => _.json())
        .then(matchingUsers => {
            if (matchingUsers.length > 0) {
                setIsLoggedIn(true)
                localStorage.setItem("kennel_token", matchingUsers[0].id)
            }
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
