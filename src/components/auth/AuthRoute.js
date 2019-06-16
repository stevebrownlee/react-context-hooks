import React from "react"
import { Route } from "react-router-dom"
import Login from "./Login"

const isAuthenticated = () =>
    localStorage.getItem("credentials") !== null ||
    sessionStorage.getItem("credentials") !== null

const AuthRoute = ({ path, Destination}) =>
    <Route exact path={path} render={props => {
        if (isAuthenticated()) {
            return <Destination {...props} />
        } else {
            return <Login />
        }
    }} />


export default AuthRoute
