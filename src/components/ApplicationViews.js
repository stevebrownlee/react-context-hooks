import React from "react"
import { Route } from "react-router-dom"
import { AnimalProviders } from "./providers/AnimalProviders"
import { LocationProviders } from "./providers/LocationProviders"
import { EmployeeProviders } from "./providers/EmployeeProviders"
import { SearchProviders } from "./providers/SearchProviders"

import AuthRoute from "./auth/AuthRoute"

import Login from "./auth/Login"
import Register from "./auth/Register"

import SearchResults from "./search/SearchResults"

import Animal from "./animals/Animal"
import { AnimalListComponent } from "./animals/AnimalList"
import AnimalForm from "./animals/AnimalForm"

import LocationList from "./locations/LocationList"
import LocationDetail from "./locations/LocationDetail"

import Employee from "./employees/Employee"
import EmployeeList from "./employees/EmployeeList"

export default () => {
    return (
        <React.Fragment>
            <AnimalProviders>
                <AuthRoute exact path="/animals" Destination={AnimalListComponent} />
                <AuthRoute path="/animals/:animalId(\d+)" Destination={Animal} />
                <AuthRoute path="/animals/new" Destination={AnimalForm} />
            </AnimalProviders>

            <EmployeeProviders>
                <AuthRoute exact path="/employees" Destination={EmployeeList} />
                <Route path="/employees/:employeeId(\d+)" render={(props) => {
                    return <Employee {...props} />
                }} />
            </EmployeeProviders>

            <LocationProviders>
                <Route exact path="/" component={LocationList} />
                <Route exact path="/locations" component={LocationList} />
                <Route path="/locations/:locationId(\d+)" render={(props) => {
                    return <LocationDetail {...props} />
                }} />
            </LocationProviders>

            <SearchProviders>
                <AuthRoute path="/search" Destination={SearchResults} />
                {/* <AuthRoute exact path="/dashboard" Destination={Dashboard} /> */}
            </SearchProviders>

            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
        </React.Fragment>
    )
}
