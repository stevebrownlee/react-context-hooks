import React from "react"
import { Route, Redirect } from "react-router-dom"
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

const isAuthenticated = () => sessionStorage.getItem("credentials") !== null

export default () => (
    <React.Fragment>
        <KennelProvider>
            <Route exact path="/animals" component={AnimalList} />
            <Route path="/animals/:animalId(\d+)" render={(props) => {
                return <Animal {...props} />
            }} />
            <Route path="/animals/new" render={(props) => {
                if (isAuthenticated()) {
                    return <AnimalForm {...props} />
                } else {
                    return <Redirect to="/login" />
                }
            }} />

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
