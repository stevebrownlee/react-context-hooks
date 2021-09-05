import React, {useState} from "react"
import { Link } from "react-router-dom"
import locationImage from "./location.png"
import "./Location.css"


export default ({location}) => {
    const [animalCount, setAnimalCount] = useState(0)
    const [employeeCount, setEmployeeCount] = useState(0)

    return (
        <article className="card location" style={{ width: `18rem` }}>
            <section className="card-body">
                <img alt="Kennel location icon" src={locationImage} className="icon--location" />
                <h5 className="card-title">
                    <Link className="card-link"
                        to={{
                            pathname: `/locations/${location.id}`,
                            state: { location: location }
                        }}>
                        {location.name}
                    </Link>
                </h5>
            </section>
            <section>
                {`${location.animals.length} ${location.animals.length === 1 ? "animal" : "animals"}`}
            </section>
            <section>
                {`${location.employeeLocations.length} ${location.employeeLocations.length === 1 ? "employee" : "employees"}`}
            </section>
        </article>
    )
}
