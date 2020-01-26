import React from "react"

import { OwnerProvider } from "./OwnerProvider"
import { AnimalProvider } from "./AnimalProvider"
import { AnimalOwnerProvider } from "./AnimalOwnerProvider"
import { EmployeeProvider } from "./EmployeeProvider"

export const AnimalProviders = props => {

    return (
        <AnimalProvider>
            <AnimalOwnerProvider>
                <OwnerProvider>
                    <EmployeeProvider>
                        {props.children}
                    </EmployeeProvider>
                </OwnerProvider>
            </AnimalOwnerProvider>
        </AnimalProvider>
    )
}
