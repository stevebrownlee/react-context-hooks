import React from "react"
import { Route } from "react-router-dom"
import Login from "./Login"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"

const AuthRoute = ({ path, Destination }) => {
    const { isAuthenticated } = useSimpleAuth()

    return (
        <Route exact path={path} render={props => {
            if (isAuthenticated()) {
                return <Destination {...props} />
            } else {
                return <Login  {...props} />
            }
        }} />
    )
}

export default AuthRoute
