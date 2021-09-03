import React, { useEffect, useState } from "react"
import LocationRepository from "../../repositories/LocationRepository";
import Location from "./Location"
import "./LocationList.css"


export const LocationList = () => {
    const [ locations, updateLocations ] = useState([])

    useEffect(() => {
        LocationRepository.getAll().then(updateLocations)
    }, [])

    return (
        <div className="locations">
            {locations.map(l => <Location key={l.id} location={l} />)}
        </div>
    )
}
