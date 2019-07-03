import React, { useContext } from "react"
import { Link } from "react-router-dom"

import { useOxfordList } from "../../hooks/string/useOxfordList"
import { AnimalContext } from "../providers/AnimalProvider"
import { EmployeeContext } from "../providers/EmployeeProvider"
import { LocationContext } from "../providers/LocationProvider"
import "./Location.css"


export default props => {
    const { animals } = useContext(AnimalContext)
    const { employees } = useContext(EmployeeContext)
    const { locations } = useContext(LocationContext)

    const locationId = parseInt(props.match.params.locationId)
    const location = locations.find(a => a.id === locationId) || {}
    const locationAnimals = animals.filter(a => a.locationId === locationId)
    const locationEmployees = employees.filter(e => e.locationId === locationId)

    return (
        <React.Fragment>
            <div className="jumbotron detailCard">
                <h1 className="display-4">{location.name}</h1>
                <p className="lead detailCard__lead">
                    {
                        `Currently caring for ${useOxfordList(locationAnimals)}`
                    }
                </p>
                <hr className="my-4" />
                <p className="lead detailCard__info">
                    {
                        `We currently have ${locationEmployees.length}
                        well-trained animal lovers and trainers:`
                    }
                </p>
                <p className="lead detailCard__info">
                    {useOxfordList(locationEmployees)}
                </p>
            </div>
        </React.Fragment>
    )
}
