import { Route } from "react-router-dom"
import React, { Component } from "react"
import { KennelProvider } from "../data/KennelProvider";

import Login from "./auth/Login"
import AuthRoute from "./auth/AuthRoute"

import SearchResults from "./search/SearchResults"

import AnimalList from "./animals/AnimalList"
import Animal from "./animals/Animal"

import LocationList from "./locations/LocationList"
import Location from "./locations/Location"



export default class ApplicationViews extends Component {
    render() {
        return (
            <React.Fragment>
                <KennelProvider>
                    <Route path="/animals" component={AnimalList} />
                    <Route path="/animals/:animalId" render={(props) => {
                        return <Animal {...props} />
                    }} />

                    <Route path="/locations" component={LocationList} />
                    <Route path="/locations/:locationId" render={(props) => {
                        return <Location {...props} />
                    }} />
                </KennelProvider>


                <Route path="/login" component={Login} />
                <AuthRoute path="/search" Destination={SearchResults} />
            </React.Fragment>
        )
    }
}
