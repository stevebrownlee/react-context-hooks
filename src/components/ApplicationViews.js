import React from "react"
import { Route } from "react-router-dom"
import AuthRoute from "./auth/AuthRoute"

import AnimalRoutes from "./AnimalRoutes"
import EmployeeRoutes from "./EmployeeRoutes"
import LocationRoutes from "./LocationRoutes"

import Login from "./auth/Login"
import Register from "./auth/Register"

import { SearchProviders } from "./providers/SearchProviders"
import SearchResults from "./search/SearchResults"


export default (props) => {
    return (
        <>
            <AnimalRoutes />
            <EmployeeRoutes />
            <LocationRoutes />

            <SearchProviders>
                <AuthRoute path="/search" Destination={SearchResults} />
            </SearchProviders>

            <Route path="/register" component={Register} />

        </>
    )
}
