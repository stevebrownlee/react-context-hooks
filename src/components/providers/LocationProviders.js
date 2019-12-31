import React from "react"

import { LocationProvider } from "./LocationProvider"
import { AnimalProvider } from "./AnimalProvider"
import { EmployeeProvider } from "./EmployeeProvider"

export const LocationProviders = props => {
    return (
        <LocationProvider {...props}>
            <AnimalProvider {...props}>
                <EmployeeProvider {...props}>
                    {props.children}
                </EmployeeProvider>
            </AnimalProvider>
        </LocationProvider>
    )
}
