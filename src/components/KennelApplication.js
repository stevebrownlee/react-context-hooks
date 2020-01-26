import React from "react"
import { Route } from "react-router-dom"
import ApplicationViews from "./ApplicationViews"
import NavBar from "./nav/NavBar"

export default () => (
    <>
        <Route render={p => <NavBar {...p} />} />
        <Route render={p => <ApplicationViews {...p} />} />
    </>
)
