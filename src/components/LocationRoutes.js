import React from "react"
import { Route } from "react-router-dom"
import AuthRoute from "./auth/AuthRoute"

import { LocationProviders } from "./providers/LocationProviders"
import LocationList from "./locations/LocationList"
import LocationDetail from "./locations/LocationDetail"

export default (props) => {
    return (
        <>
            <LocationProviders {...props}>
                <AuthRoute exact path="/" component={LocationList} />
                <AuthRoute exact path="/locations" component={LocationList} />
                <Route path="/locations/:locationId(\d+)" render={(props) => {
                    return <LocationDetail {...props} />
                }} />
            </LocationProviders>
        </>
    )
}
