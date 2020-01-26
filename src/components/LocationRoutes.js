import React from "react"
import { Route } from "react-router-dom"

import { LocationProviders } from "./providers/LocationProviders"
import LocationList from "./locations/LocationList"
import LocationDetail from "./locations/LocationDetail"

export default (props) => {
    return (
        <LocationProviders {...props}>
            <Route exact path="/" render={p => <LocationList {...p} />} />
            <Route exact path="/locations" render={p => <LocationList {...p} />} />
            <Route path="/locations/:locationId(\d+)" render={p => <LocationDetail {...p} />} />
        </LocationProviders>
    )
}
