import React, {useContext, useState} from "react"
import { Link } from "react-router-dom"
import location from "./location.png"
import "./Location.css"


export default props => {
    const [animalCount, setAnimalCount] = useState(0)
    const [employeeCount, setEmployeeCount] = useState(0)

    return (
        <article className="card location" style={{ width: `18rem` }}>
            <section className="card-body">
                <img alt="Kennel location icon" src={location} className="icon--location" />
                <h5 className="card-title">
                    <Link className="card-link"
                        to={{
                            pathname: `/locations/${props.location.id}`,
                            state: { location: props.location }
                        }}>
                        {props.location.name}
                    </Link>
                </h5>
            </section>
            <section>
                {`${animalCount} ${animalCount === 1 ? "animal" : "animals"}`}
            </section>
            <section>
                {`${employeeCount} ${employeeCount === 1 ? "employee" : "employees"}`}
            </section>
        </article>
    )
}
