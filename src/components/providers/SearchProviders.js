import React from "react"

import { LocationProvider } from "./LocationProvider"
import { AnimalProvider } from "./AnimalProvider"
import { EmployeeProvider } from "./EmployeeProvider"
import { AnimalOwnerProvider } from "./AnimalOwnerProvider"
import { OwnerProvider } from "./OwnerProvider"

export const SearchProviders = props => {

    return (
        <LocationProvider>
            <AnimalProvider>
                <AnimalOwnerProvider>
                    <EmployeeProvider>
                        <OwnerProvider>
                            {props.children}
                        </OwnerProvider>
                    </EmployeeProvider>
                </AnimalOwnerProvider>
            </AnimalProvider>
        </LocationProvider>
    )
}

