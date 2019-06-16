import { Route } from "react-router-dom"
import React, { Component } from "react"

import Login from "./auth/Login"
import AuthRoute from "./auth/AuthRoute"

import SearchResults from "./search/SearchResults"

import AnimalList from "./animals/AnimalList"
import Animal from "./animals/Animal"
import { AnimalProvider } from "../data/AnimalProvider"

import LocationList from "./locations/LocationList"
import Location from "./locations/Location"
import { LocationProvider } from "../data/LocationProvider"


export default class ApplicationViews extends Component {
    render() {
        return (
            <React.Fragment>
                <AnimalProvider>
                    <Route path="/animals" component={AnimalList} />
                    <Route path="/animals/:animalId" render={(props) => {
                        return <Animal {...props} />
                    }} />
                </AnimalProvider>

                <LocationProvider>
                    <Route path="/locations" component={LocationList} />
                    <Route path="/locations/:locationId" render={(props) => {
                        return <Location {...props} />
                    }} />
                </LocationProvider>

                <Route path="/login" component={Login} />
                <AuthRoute path="/search" Destination={SearchResults} />
            </React.Fragment>
        )
    }
}
