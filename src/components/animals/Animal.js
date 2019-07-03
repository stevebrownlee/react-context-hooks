import React, { useContext } from "react"
import { AnimalContext } from "../providers/AnimalProvider"
import { AnimalOwnerContext } from "../providers/AnimalOwnerProvider"
import { OwnerContext } from "../providers/OwnerProvider"
import "./AnimalCard.css"


export default props => {
    let animal = {}
    let className = "card animal"

    const { animals, dischargeAnimal } = useContext(AnimalContext)
    const { animalOwners, changeOwner, removeOwnerRelationship } = useContext(AnimalOwnerContext)
    const { owners } = useContext(OwnerContext)

    // If being rendered by the AnimalList component
    if (props.hasOwnProperty("animal")) {
        animal = props.animal
    }

    // If being rendered indepedently
    if (props.hasOwnProperty("match") && props.match.params.animalId) {
        className = "card animal--single"
        animal = animals.find(a => a.id === parseInt(props.match.params.animalId)) || {}
    }
    const myOwners = animalOwners.filter(ao => ao.animalId === animal.id) || []

    return (
        <React.Fragment>
            <li className={className} style={{ width: `18rem` }}>
                <div className="card-body">
                    <div className="animal__header">
                        <h5 className="card-title">
                            <a className="link--card"
                                style={{
                                    cursor: "pointer",
                                    "textDecoration": "underline",
                                    "color": "rgb(94, 78, 196)"
                                }}
                                onClick={() => {
                                    props.showTreatmentHistory(animal)
                                }}> {animal.name} </a>
                        </h5>
                        <span className="card-text small">{animal.breed}</span>
                    </div>

                    <details>
                        <summary className="smaller">
                            <meter min="0" max="100" value={Math.random() * 100} low="25" high="75" optimum="100"></meter>
                        </summary>

                        <p>
                            Owned by {myOwners.map(o => o.owner.name).join(" and ")}
                        </p>

                        {
                            myOwners.length < 2
                                ? <select defaultValue=""
                                    name="owner"
                                    className="form-control"
                                    onChange={e => {
                                        changeOwner(animal.id, parseInt(e.target.value))
                                    }} >
                                    <option value="">Select an owner</option>
                                    {
                                        owners.map(o => (
                                            <option key={o.id} value={o.id}> {o.name} </option>
                                        ))
                                    }
                                </select>
                                : null
                        }

                        <button onClick={() => {
                            removeOwnerRelationship(animal.id)
                                .then(r => dischargeAnimal(animal.id))
                        }}>Discharge</button>
                    </details>
                </div>
            </li>
        </React.Fragment>
    )
}
