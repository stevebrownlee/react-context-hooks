import React from 'react';

import { LocationProvider } from "../data/LocationProvider"
import { AnimalProvider } from "../data/AnimalProvider"

export const KennelProvider = props => {

    return (
        <AnimalProvider>
            <LocationProvider>
                {props.children}
            </LocationProvider>
        </AnimalProvider>
    )
}

