import { useState, useEffect } from "react"

const useSimpleAuth = () => {

    const [loggedIn, setIsLoggedIn] = useState(false)
    const [storage, setStorage] = useState(null)

    const isAuthenticated = () =>
        loggedIn
        || localStorage.getItem("credentials") !== null
        || sessionStorage.getItem("credentials") !== null

    const login = (email, password, storageType = localStorage) => {
        console.log(storageType)
        storageType.setItem(
            "credentials",
            JSON.stringify({
                email: email,
                password: password
            })
        )
        setStorage(storageType)
        setIsLoggedIn(true)
    }

    const logout = () => {
        setIsLoggedIn(false)
        localStorage.removeItem("credentials")
        sessionStorage.removeItem("credentials")
    }

    return { isAuthenticated, logout, login, setStorage }
}

export default useSimpleAuth



