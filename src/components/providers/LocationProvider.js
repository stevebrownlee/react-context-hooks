import React, { useState, useEffect } from "react"
import LocationRepository from "../../repositories/LocationRepository"

export const LocationContext = React.createContext()

export const LocationProvider = props => {
    const [locations, setLocations] = useState([])

    useEffect(() => {
        LocationRepository.getAll()
        .then(packet => {
            if (packet.tokenStatus === "valid") {
                return packet.data
            }
            "history" in props && props.history.push("/login")
        })
        .then(setLocations)
    }, [])

    return (
        <LocationContext.Provider value={{locations}}>
            {props.children}
        </LocationContext.Provider>
    )
}
