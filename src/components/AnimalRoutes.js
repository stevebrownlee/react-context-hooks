import React from "react"
import AuthRoute from "./auth/AuthRoute"
import Animal from "./animals/Animal"
import AnimalForm from "./animals/AnimalForm"
import { AnimalProviders } from "./providers/AnimalProviders"
import { AnimalListComponent } from "./animals/AnimalList"

export default (props) => {
    return (
        <>
            <AnimalProviders>
                <AuthRoute exact path="/animals" Destination={AnimalListComponent} />
                <AuthRoute path="/animals/:animalId(\d+)" Destination={Animal} />
                <AuthRoute path="/animals/new" Destination={AnimalForm} />
            </AnimalProviders>
        </>
    )
}
