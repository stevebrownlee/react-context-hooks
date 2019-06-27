import React, { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
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

    // Close all dialogs when ESC is pressed
    window.addEventListener("keyup", (e) => {
        if (e.keyCode === 27) {
            document
                .querySelectorAll(".dialog--animal")
                .forEach(d => d.removeAttribute("open"))
        }
    })

    return (
        <React.Fragment>
            <dialog id={`dialog--${animal.id}`} className="dialog--animal">
                <h2 style={{marginBottom: "1.3em"}}>Medical History for {animal.name}</h2>
                {
                    animal.treatments.map(t => (
                        <div key={t.id}>
                            <h4>{t.timestamp}</h4>
                            <p>{t.description}</p>
                        </div>
                    ))
                }
                <button style={{
                    position: "absolute",
                    top: "1em",
                    right: "2em"
                }}
                    id="closeBtn"
                    onClick={
                        () => document.querySelector(`#dialog--${animal.id}`).removeAttribute("open")
                    }>close</button>
            </dialog>

            <div className={className} style={{ width: `18rem` }}>
                <div className="card-body">
                    <div className="animal__header">
                        <h5 className="card-title">
                            {/* <Link className="card-link"
                                to={{
                                    pathname: `/animals/${animal.id}`,
                                    state: { animal: animal }
                                }}>
                                {animal.name}
                            </Link> */}
                            <a className="card-link"
                                style={{cursor: "pointer"}}
                                onClick={() => {
                                document.querySelector(`#dialog--${animal.id}`).setAttribute("open", true)
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
            </div>
        </React.Fragment>
    )
}
