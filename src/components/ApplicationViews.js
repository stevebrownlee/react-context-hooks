import React from "react"
import { Route } from "react-router-dom"
import { AnimalProviders } from "./providers/AnimalProviders"
import { LocationProviders } from "./providers/LocationProviders"
import { EmployeeProviders } from "./providers/EmployeeProviders"
import { SearchProviders } from "./providers/SearchProviders"

import Login from "./auth/Login"
import AuthRoute from "./auth/AuthRoute"

import SearchResults from "./search/SearchResults"

import AnimalList from "./animals/AnimalList"
import Animal from "./animals/Animal"

import LocationList from "./locations/LocationList"
import LocationDetail from "./locations/LocationDetail"

import EmployeeList from "./employees/EmployeeList"
import Employee from "./employees/Employee"
import AnimalForm from "./animals/AnimalForm"
import Register from "./auth/Register";

export default () => {
    return (
        <React.Fragment>
            <AnimalProviders>
                <AuthRoute exact path="/animals" Destination={AnimalList} />
                <AuthRoute path="/animals/:animalId(\d+)" Destination={Animal} />
                <AuthRoute path="/animals/new" Destination={AnimalForm} />
            </AnimalProviders>

            <EmployeeProviders>
                <AuthRoute exact path="/employees" Destination={EmployeeList} />
                <Route path="/employees/:employeeId" render={(props) => {
                    return <Employee {...props} />
                }} />
            </EmployeeProviders>

            <LocationProviders>
                <Route exact path="/" component={LocationList} />
                <Route exact path="/locations" component={LocationList} />
                <Route path="/locations/:locationId" render={(props) => {
                    return <LocationDetail {...props} />
                }} />
            </LocationProviders>

            <SearchProviders>
                <AuthRoute path="/search" Destination={SearchResults} />
            </SearchProviders>

            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
        </React.Fragment>
    )
}
