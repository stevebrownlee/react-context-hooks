import React from "react"
import { Route } from "react-router-dom"

import AnimalRoutes from "./AnimalRoutes"
import EmployeeRoutes from "./EmployeeRoutes"
import LocationRoutes from "./LocationRoutes"

import { SearchProviders } from "./providers/SearchProviders"
import SearchResults from "./search/SearchResults"


export default () => {
    return (
        <>
            <LocationRoutes />
            <AnimalRoutes />
            <EmployeeRoutes />

            <SearchProviders>
                <Route path="/search" render={p => <SearchResults {...p} />} />
            </SearchProviders>
        </>
    )
}
