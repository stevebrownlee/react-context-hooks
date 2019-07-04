import React from "react"
import { Route } from "react-router-dom"
import { KennelProvider } from "./providers/KennelProvider"

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

export default () => (
    <React.Fragment>
        <KennelProvider>
            <AuthRoute exact path="/animals" Destination={AnimalList} />
            <AuthRoute path="/animals/:animalId(\d+)" Destination={Animal} />
            <AuthRoute path="/animals/new" Destination={AnimalForm} />

            <AuthRoute exact path="/employees" Destination={EmployeeList} />
            <Route path="/employees/:employeeId" render={(props) => {
                return <Employee {...props} />
            }} />

            <Route exact path="/" component={LocationList} />
            <Route exact path="/locations" component={LocationList} />
            <Route path="/locations/:locationId" render={(props) => {
                return <LocationDetail {...props} />
            }} />
            <AuthRoute path="/search" Destination={SearchResults} />
            <AuthRoute path="/logout" Destination={SearchResults} />
        </KennelProvider>

        <Route path="/login" component={Login} />
    </React.Fragment>
)
