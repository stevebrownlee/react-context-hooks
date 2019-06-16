import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { AnimalContext } from "../providers/AnimalProvider"


export default props => {
    const { dischargeAnimal } = useContext(AnimalContext)
    const animal = props.animal

    return (
        <div className="card" style={{ width: `18rem` }}>
            <div className="card-body">
                <h5 className="card-title">
                    <Link className="card-link"
                        to={{
                            pathname: `/animals/${animal.id}`,
                            state: { animal: animal }
                        }}>
                        {animal.name}
                    </Link>
                </h5>
                <p className="card-text">{animal.breed}</p>
                <button onClick={() => dischargeAnimal(animal.id)} >Delete</button>
            </div>
        </div>
    )
}
