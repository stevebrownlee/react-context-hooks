import React, { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import EmployeeRepository from "../../repositories/EmployeeRepository";
import person from "./person.png"
import "./Employee.css"
import useResourceResolver from "../../hooks/resource/useResourceResolver";


export default ({ employee }) => {
    const [animalCount, setCount] = useState(0)
    const [location, markLocation] = useState({ name: "" })
    const { employeeId } = useParams()
    const { resolveResource, resource } = useResourceResolver()

    useEffect(() => {
       resolveResource(employee, employeeId, EmployeeRepository.get)
    }, [])

    return (
        <article className="card employee" style={{ width: `18rem` }}>
            <section className="card-body">
                <img alt="Kennel employee icon" src={person} className="icon--person" />
                <h5 className="card-title">
                    <Link className="card-link"
                        to={{
                            pathname: `/employees/${resource.id}`,
                            state: { employee: resource }
                        }}>
                        {resource.name}
                    </Link>
                </h5>
                <section>
                    Caring for {animalCount} animals
                </section>
                <section>
                    Working at {location.name}
                </section>

                <button className="btn--fireEmployee"
                    onClick={ () => EmployeeRepository.delete(employee.id) }>Fire</button>
            </section>

        </article>
    )
}
