import React from "react"

import { LocationProvider } from "./LocationProvider"
import { AnimalProvider } from "./AnimalProvider"
import { EmployeeProvider } from "./EmployeeProvider"

export const EmployeeProviders = props => {

    return (
        <AnimalProvider>
            <EmployeeProvider>
                <LocationProvider>
                    {props.children}
                </LocationProvider>
            </EmployeeProvider>
        </AnimalProvider>
    )
}
