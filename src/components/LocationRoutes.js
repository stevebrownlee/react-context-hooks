import React from "react"
import { Route } from "react-router-dom"

import { LocationProviders } from "./providers/LocationProviders"
import {LocationList} from "./locations/LocationList"
import LocationDetail from "./locations/LocationDetail"

export default (props) => {
    return (
        <LocationProviders {...props}>
            <Route exact path="/">
                <LocationList />
            </Route>
            <Route exact path="/locations">
                <LocationList />
            </Route>
            <Route path="/locations/:locationId(\d+)">
                <LocationDetail />
            </Route>
        </LocationProviders>
    )
}
