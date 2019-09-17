import React from "react"

import { LocationProvider } from "./LocationProvider"
import { AnimalProvider } from "./AnimalProvider"
import { EmployeeProvider } from "./EmployeeProvider"

export const SearchProviders = props => {

    return (
        <LocationProvider>
            <AnimalProvider>
                <EmployeeProvider>
                    {props.children}
                </EmployeeProvider>
            </AnimalProvider>
        </LocationProvider>
    )
}

