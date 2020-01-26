import React from "react"
import { Route, Redirect } from "react-router-dom"
import Login from "./auth/Login"
import Register from "./auth/Register"
import NavBar from "./nav/NavBar"
import ApplicationViews from "./ApplicationViews"
import useSimpleAuth from "../hooks/ui/useSimpleAuth"
import "bootstrap/dist/css/bootstrap.min.css"


export default () => {
    const { isAuthenticated } = useSimpleAuth()

    return <>
        <Route render={props => {
            if (isAuthenticated()) {
                return <>
                    <Route render={p => <NavBar {...p} />} />
                    <Route render={p => <ApplicationViews {...p} />} />
                </>
            } else {
                return <Redirect to="/login" />
            }
        }} />
        <Route path="/login" render={p => <Login {...p} />} />
        <Route path="/register" render={p => <Register {...p} />} />
    </>
}
