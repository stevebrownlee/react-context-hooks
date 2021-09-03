import React, { useState } from "react"
import { Link } from "react-router-dom"
import EmployeeRepository from "../../repositories/EmployeeRepository"
import person from "./person.png"
import "./Employee.css"


export default ({ employee }) => {
    const [ animalCount, setCount ] = useState(0)
    const [ location, markLocation ] = useState({name:""})

    return (
        <article className="card employee" style={{ width: `18rem` }}>
            <section className="card-body">
                <img alt="Kennel employee icon" src={person} className="icon--person" />
                <h5 className="card-title">
                    <Link className="card-link"
                        to={{
                            pathname: `/employees/${employee.id}`,
                            state: { employee: employee }
                        }}>
                        {employee.name}
                    </Link>
                </h5>
                <section>
                    Caring for {animalCount} animals
                </section>
                <section>
                    Working at {location.name}
                </section>

                <button className="btn--fireEmployee"
                        onClick={
                            () => {
                                EmployeeRepository.delete(employee.id)
                            }
                        } >Fire</button>
            </section>

        </article>
    )
}
