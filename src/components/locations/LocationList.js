import React, { useContext } from "react"
import { LocationContext } from "../providers/LocationProvider"
import Location from "./Location"
import "./LocationList.css"


const LocationList = () => {
    const { locations } = useContext(LocationContext)

    return (
        <div className="locations">
            {locations.map(l => <Location key={l.id} location={l} />)}
        </div>
    )
}

export default LocationList
