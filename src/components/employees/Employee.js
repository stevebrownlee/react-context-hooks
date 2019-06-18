import React, { useContext } from "react"
import { Link } from "react-router-dom"
import person from "./person.png"
import { AnimalContext } from "../providers/AnimalProvider"
import { LocationContext } from "../providers/LocationProvider"
import "./Employee.css"


export default props => {
    const { animals } = useContext(AnimalContext)
    const { locations } = useContext(LocationContext)

    const animalCount = animals.filter(a => a.employeeId === props.employee.id).length
    const location = locations.find(l => l.id === props.employee.locationId) || {}

    return (
        <article className="card employee" style={{ width: `18rem` }}>
            <section className="card-body">
                <img src={person} className="icon--person" />
                <h5 className="card-title">
                    <Link className="card-link"
                        to={{
                            pathname: `/employees/${props.employee.id}`,
                            state: { employee: props.employee }
                        }}>
                        {props.employee.name}
                    </Link>
                </h5>
                <section>
                    Caring for {animalCount} animals
                </section>
                <section>
                    Working at {location.name}
                </section>

                <button className="btn--fireEmployee" onClick={() => props.fireEmployee(props.employee.id)} >Fire</button>
            </section>

        </article>
    )
}
