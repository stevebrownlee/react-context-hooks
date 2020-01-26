import React from "react"
import { Route } from "react-router-dom"
import Animal from "./animals/Animal"
import AnimalForm from "./animals/AnimalForm"
import { AnimalProviders } from "./providers/AnimalProviders"
import { AnimalListComponent } from "./animals/AnimalList"

export default () => {
    return (
        <>
            <AnimalProviders>
                <Route exact path="/animals" render={p => <AnimalListComponent {...p} />} />
                <Route exact path="/animals/:animalId(\d+)" render={p => <Animal {...p} />} />
                <Route exact path="/animals/new" render={p => <AnimalForm {...p} />} />
            </AnimalProviders>
        </>
    )
}
