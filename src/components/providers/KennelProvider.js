import React from "react"

import { LocationProvider } from "./LocationProvider"
import { AnimalProvider } from "./AnimalProvider"
import { EmployeeProvider } from "./EmployeeProvider"

export const KennelProvider = props => {

    return (
        <AnimalProvider>
            <LocationProvider>
                <EmployeeProvider>
                    {props.children}
                </EmployeeProvider>
            </LocationProvider>
        </AnimalProvider>
    )
}

