import React from "react"
import { Route } from "react-router-dom"
import Login from "./auth/Login"
import Register from "./auth/Register"
import AuthRoute from "./auth/AuthRoute"
import KennelApplication from "./KennelApplication"
import "bootstrap/dist/css/bootstrap.min.css"


export default () => {
    return <>
        <AuthRoute component={KennelApplication} />
        <Route path="/login" render={p => <Login {...p} /> } />
        <Route path="/register" render={p => <Register {...p} /> } />
    </>
}
