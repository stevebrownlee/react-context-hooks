import React, { useState, useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { AnimalContext } from "../providers/AnimalProvider"
import { LocationContext } from "../providers/LocationProvider"
import { EmployeeContext } from "../providers/EmployeeProvider"
import useResourceResolver from "../../hooks/resource/useResourceResolver"
import person from "./person.png"
import "./Employee.css"


export default ({ employee, fireEmployee }) => {

    const { animals } = useContext(AnimalContext)
    const { locations } = useContext(LocationContext)

    const animalCount = animals.filter(a => a.employeeId === employee.id).length
    const location = locations.find(l => l.id === employee.locationId) || {}

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
                        onClick={() => fireEmployee(employee.id)} >Fire</button>
            </section>

        </article>
    )
}
