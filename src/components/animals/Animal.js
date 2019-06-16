import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { AnimalContext } from "../providers/AnimalProvider"
import { AnimalOwnerContext } from "../providers/AnimalOwnerProvider";
import "./AnimalCard.css"


export default props => {
    const { dischargeAnimal } = useContext(AnimalContext)
    const { animalOwners } = useContext(AnimalOwnerContext)
    const animal = props.animal
    const owners = animalOwners.filter(ao => ao.animalId === animal.id) || []

    return (
        <div className="card animal" style={{ width: `18rem` }}>
            <div className="card-body">
                <div className="animal__header">
                    <h5 className="card-title">
                        <Link className="card-link"
                            to={{
                                pathname: `/animals/${animal.id}`,
                                state: { animal: animal }
                            }}>
                            {animal.name}
                        </Link>
                    </h5>
                    <span className="card-text small">{animal.breed}</span>
                </div>
                <p className="smaller">
                    Owned by { owners.map(o => o.owner.name).join(" and ") }
                </p>

                <button onClick={() => dischargeAnimal(animal.id)}>Discharge</button>
            </div>
        </div>
    )
}
