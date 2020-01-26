import React, { useState } from "react"
import { Route } from "react-router-dom"
import NavBar from "./nav/NavBar"
import ApplicationViews from "./ApplicationViews"
import "bootstrap/dist/css/bootstrap.min.css"
import useSimpleAuth from "../hooks/ui/useSimpleAuth"
import Login from "./auth/Login"


export default () => {
    const { isAuthenticated } = useSimpleAuth()
    const [auth, setAuth] = useState(false)

    if (isAuthenticated()) {
        console.log(("*** User is authenticated. Render Kennel app. ***"))
        return <>
            <Route render={p => <NavBar {...p} setAuth={setAuth} />} />
            <Route render={p => <ApplicationViews {...p} />} />
        </>

    } else {
        console.log(("*** User is not authenticated. Render Login. ***"))
        return <Route render={p => <Login  {...p} setAuth={setAuth} />} />
    }
}
