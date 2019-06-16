import React from "react"
import { Route } from "react-router-dom"
import NavBar from "./nav/NavBar"
import ApplicationViews from "./ApplicationViews"
import "bootstrap/dist/css/bootstrap.min.css"


export default () => (
    <React.Fragment>
        <Route render={props => (
            <NavBar {...props} />
        )} />
        <ApplicationViews />
    </React.Fragment>
)
