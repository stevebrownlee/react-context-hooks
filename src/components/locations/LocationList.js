import React, { useContext } from "react"
import { LocationContext } from "../../data/LocationProvider"
import Location from "./Location"
import "./LocationList.css"


export default () => {
    const { locations } = useContext(LocationContext)

    return (
        <div className="locations">
            {locations.map(l => <Location key={l.id} location={l} />)}
        </div>
    )
}
