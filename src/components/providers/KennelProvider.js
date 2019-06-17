import React from "react"

import { LocationProvider } from "./LocationProvider"
import { AnimalProvider } from "./AnimalProvider"
import { EmployeeProvider } from "./EmployeeProvider"
import { OwnerProvider } from "./OwnerProvider"
import { AnimalOwnerProvider } from "./AnimalOwnerProvider"

export const KennelProvider = props => {

    return (
        <AnimalProvider>
            <LocationProvider>
                <EmployeeProvider>
                    <OwnerProvider>
                        <AnimalOwnerProvider>
                            {props.children}
                        </AnimalOwnerProvider>
                    </OwnerProvider>
                </EmployeeProvider>
            </LocationProvider>
        </AnimalProvider>
    )
}

