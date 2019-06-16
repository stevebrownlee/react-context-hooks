import { Route } from 'react-router-dom'
import React, { Component } from "react"
import Login from './auth/Login'
import SearchResults from './search/SearchResults'
import AuthRoute from './auth/AuthRoute'
import AnimalList from './animals/AnimalList';
import Animal from './animals/Animal';
import { AnimalProvider } from "../data/AnimalProvider"

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

                <Route path="/login" component={Login} />
                <AuthRoute path="/search" Destination={SearchResults} />
            </React.Fragment>
        )
    }
}
