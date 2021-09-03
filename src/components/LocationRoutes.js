import React from "react"
import { Route } from "react-router-dom"
import { LocationList } from "./locations/LocationList"
import LocationDetail from "./locations/LocationDetail"

export default () => {
    return (
        <>
            <Route exact path="/">
                <LocationList />
            </Route>
            <Route exact path="/locations">
                <LocationList />
            </Route>
            <Route path="/locations/:locationId(\d+)">
                <LocationDetail />
            </Route>
        </>
    )
}
