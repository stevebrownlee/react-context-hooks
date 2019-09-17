import { useState } from "react"

const useAPIAuth = () => {

    const [loggedIn, setIsLoggedIn] = useState(false)

    const isAuthenticated = () =>
        loggedIn
        || localStorage.getItem("credentials") !== null
        || sessionStorage.getItem("credentials") !== null

    const login = (email, password, storageType = localStorage) => {
        storageType.setItem(
            "credentials",
            JSON.stringify({
                email: email,
                password: password
            })
        )
        setIsLoggedIn(true)
    }

    const logout = () => {
        setIsLoggedIn(false)
        localStorage.removeItem("credentials")
        sessionStorage.removeItem("credentials")
    }

    return { isAuthenticated, logout, login }
}

export default useAPIAuth



