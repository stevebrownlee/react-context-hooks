import React, { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import EmployeeRepository from "../../repositories/EmployeeRepository";
import person from "./person.png"
import "./Employee.css"
import useResourceResolver from "../../hooks/resource/useResourceResolver";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";


export default ({ employee }) => {
    const [animalCount, setCount] = useState(0)
    const [location, markLocation] = useState({ name: "" })
    const [classes, defineClasses] = useState("card employee")
    const { employeeId } = useParams()
    const { getCurrentUser } = useSimpleAuth()
    const { resolveResource, resource } = useResourceResolver()

    useEffect(() => {
        if (employeeId) {
            defineClasses("card employee--single")
        }
        resolveResource(employee, employeeId, EmployeeRepository.get)
    }, [])

    useEffect(() => {
        if (resource?.employeeLocations?.length > 0) {
            markLocation(resource.employeeLocations[0])
        }
    }, [resource])

    return (
        <article className={classes}>
            <section className="card-body">
                <img alt="Kennel employee icon" src={person} className="icon--person" />
                <h5 className="card-title">
                    {
                        employeeId
                            ? resource.name
                            : <Link className="card-link"
                                to={{
                                    pathname: `/employees/${resource.id}`,
                                    state: { employee: resource }
                                }}>
                                {resource.name}
                            </Link>

                    }
                </h5>
                {
                    employeeId
                        ? <>
                            <section>
                                Caring for {resource?.animals?.length} animals
                            </section>
                            <section>
                                Working at {resource?.locations?.reduce((acc, curr, idx, arr) => {
                                    acc.push(<Link key={`employeelocation--${curr.location.id}`} to={`/locations/${curr.location.id}`}>
                                        {curr.location.name}{arr.length > 1 && idx < arr.length - 1 ? ", " : ""}
                                    </Link>)
                                    return acc
                                }, [])}
                            </section>
                        </>
                        : ""
                }

                {
                    getCurrentUser().employee
                        ? <button className="btn--fireEmployee"
                        onClick={() => EmployeeRepository.delete(employee.id)}>Fire</button>
                        : ""
                }

            </section>

        </article>
    )
}
