import React, { useState, useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { AnimalContext } from "../providers/AnimalProvider"
import { LocationContext } from "../providers/LocationProvider"
import { EmployeeContext } from "../providers/EmployeeProvider"
import person from "./person.png"
import "./Employee.css"
import useResourceResolver from "../../hooks/resource/useResourceResolver";


export default props => {

    const { animals } = useContext(AnimalContext)
    const { locations } = useContext(LocationContext)
    const { employees } = useContext(EmployeeContext)
    const { resolveResource, resource } = useResourceResolver()

    const [ location, setLocation ] = useState({})
    const [ animalCount, setAnimalCount ] = useState(0)

    useEffect(() => {
        resolveResource({
            props: props,
            property: "employee",
            param: "employeeId",
            collection: employees
        })

        setAnimalCount(animals.filter(a => a.employeeId === resource.id).length)
        setLocation(locations.find(l => l.id === resource.locationId) || {})
    }, [animals, locations])


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
                        onClick={() => props.fireEmployee(resource.id)} >Fire</button>
            </section>

        </article>
    )
}
