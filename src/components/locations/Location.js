import React, {useContext} from "react"
import { Link } from "react-router-dom"
import location from "./location.png"
import "./Location.css"
import { AnimalContext } from "../providers/AnimalProvider";
import { EmployeeContext } from "../providers/EmployeeProvider";


export default props => {
    const { animals } = useContext(AnimalContext)
    const { employees } = useContext(EmployeeContext)

    const animalCount = animals.filter(a => a.locationId === props.location.id).length
    const employeeCount = employees.filter(e => e.locationId === props.location.id).length

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
