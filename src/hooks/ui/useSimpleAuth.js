const useSimpleAuth = () => {
    const isAuthenticated = () =>
        localStorage.getItem("credentials") !== null ||
        sessionStorage.getItem("credentials") !== null

    const logout = () => {
        localStorage.removeItem("credentials")
        sessionStorage.removeItem("credentials")
    }


    return { isAuthenticated, logout }
}

export default useSimpleAuth



