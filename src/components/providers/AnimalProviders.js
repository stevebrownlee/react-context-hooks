import React from "react"

import { OwnerProvider } from "./OwnerProvider"
import { AnimalProvider } from "./AnimalProvider"
import { AnimalOwnerProvider } from "./AnimalOwnerProvider"

export const AnimalProviders = props => {

    return (
        <AnimalProvider>
            <AnimalOwnerProvider>
                <OwnerProvider>
                    {props.children}
                </OwnerProvider>
            </AnimalOwnerProvider>
        </AnimalProvider>
    )
}
