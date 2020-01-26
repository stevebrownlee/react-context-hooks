import React from "react"
import { Route } from "react-router-dom"
import NavBar from "./nav/NavBar"
import ApplicationViews from "./ApplicationViews"
import "bootstrap/dist/css/bootstrap.min.css"
import useSimpleAuth from "../hooks/ui/useSimpleAuth"
import Login from "./auth/Login"


export default () => {
    const { isAuthenticated } = useSimpleAuth()

    if (isAuthenticated()) {
        return  <>
                    <Route render={p => <NavBar {...p} />} />
                    <Route render={p => <ApplicationViews {...p} />} />
                </>

    } else {
        return <Route render={p => <Login  {...p} />} />
    }
}
