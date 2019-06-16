import React, { useState, useEffect } from "react"
import LocationRepository from "../../repositories/LocationRepository"

export const LocationContext = React.createContext()

export const LocationProvider = props => {
    const [locations, setLocations] = useState([])

    useEffect(() => {
        LocationRepository.getAll().then(setLocations)
    }, [])

    return (
        <LocationContext.Provider value={{locations}}>
            {props.children}
        </LocationContext.Provider>
    )
}
