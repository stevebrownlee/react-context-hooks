import React, { useState } from "react"
import { Link } from "react-router-dom"
import { useOxfordList } from "../../hooks/string/useOxfordList"
import "./Location.css"


export default props => {
    const [animals, setAnimals] = useState([])
    const [employees, updateEmployees] = useState([])
    const [locations, defineLocations] = useState([])

    const locationId = parseInt(props.match.params.locationId)
    const location = locations.find(a => a.id === locationId) || {}
    const locationAnimals = animals.filter(a => a.locationId === locationId)
    const locationEmployees = employees.filter(e => e.locationId === locationId)

    return (
        <>
            <div className="jumbotron detailCard">
                <h1 className="display-4">{location.name}</h1>
                <p className="lead detailCard__lead">
                    Currently caring for
                    {
                        locationAnimals.map((a, idx, arr) =>
                            <span key={idx}>
                                {idx > 0 && ", "}
                                <Link to={`/animals/${a.id}`}> {a.name}</Link>
                            </span>
                        )
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
        </>
    )
}
