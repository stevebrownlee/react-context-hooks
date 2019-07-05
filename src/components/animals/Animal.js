import "./AnimalCard.css"
import React, { useEffect, useContext, useState } from "react"
import { AnimalContext } from "../providers/AnimalProvider"
import { AnimalOwnerContext } from "../providers/AnimalOwnerProvider"
import { OwnerContext } from "../providers/OwnerProvider"
import useResourceResolver from "../../hooks/resource/useResourceResolver";


export default props => {
    const { animals, dischargeAnimal } = useContext(AnimalContext)
    const { animalOwners, changeOwner, removeOwnerRelationship } = useContext(AnimalOwnerContext)
    const { owners } = useContext(OwnerContext)
    const [detailsOpen, setDetailsOpen] = useState(false)
    const [cardClasses, setCardClasses] = useState("card animal")


    /*
    Option 1: Resolve resource manually

    let animal = {}
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
    console.log(myOwners)
  */


    /*
        Options 2: Resolve resource using the useResourceResolver hook
    */
    const { resolveResource, resource } = useResourceResolver()
    const [myOwners, setMyOwners] = useState([])

    useEffect(() => {
        resolveResource({
            props: props,
            property: "animal",
            param: "animalId",
            collection: animals
        })

        // If being rendered indepedently
        if (props.hasOwnProperty("match") && props.match.params.animalId) {
            setCardClasses("card animal--single")
            setDetailsOpen(true)
        }

        setMyOwners(animalOwners.filter(ao => ao.animalId === resource.id) || [])
    }, [animalOwners, animals, props])

    const animal = resource || {}


    return (
        <React.Fragment>
            <li className={cardClasses}>
                <div className="card-body">
                    <div className="animal__header">
                        <h5 className="card-title">
                            <button className="link--card btn btn-link"
                                style={{
                                    cursor: "pointer",
                                    "textDecoration": "underline",
                                    "color": "rgb(94, 78, 196)"
                                }}
                                onClick={() => {
                                    props.showTreatmentHistory(animal)
                                }}> {animal.name} </button>
                        </h5>
                        <span className="card-text small">{animal.breed}</span>
                    </div>

                    <details open={detailsOpen}>
                        <summary className="smaller">
                            <meter min="0" max="100" value={Math.random() * 100} low="25" high="75" optimum="100"></meter>
                        </summary>

                        <section>
                            <h6>Caretaker</h6>
                            <span className="small">{
                                "employee" in animal
                                    ? animal.employee.name
                                    : ""
                            }</span>
                            <h6>Owners</h6>
                            <span className="small">
                                {
                                    myOwners.reduce((p, c, idx) => {
                                        return `${p} ${idx > 0 ? "and" : "Owned by"} ${c.owner.name}`
                                    }, "")
                                }
                            </span>

                            {
                                myOwners.length < 2
                                    ? <select defaultValue=""
                                        name="owner"
                                        className="form-control small"
                                        onChange={e => {
                                            changeOwner(animal.id, parseInt(e.target.value))
                                        }} >
                                        <option value="">
                                            Select {myOwners.length === 1 ? "another" : "an"} owner
                                    </option>
                                        {
                                            owners.map(o => (
                                                <option key={o.id} value={o.id}> {o.name} </option>
                                            ))
                                        }
                                    </select>
                                    : null
                            }


                            {
                                detailsOpen && "treatments" in animal
                                    ? <div className="small">
                                        <h6>Treatment History</h6>
                                        {
                                            animal.treatments.map(t => (
                                                <div key={t.id}>
                                                    <p style={{ fontWeight: "bolder", color: "grey" }}>{t.timestamp}</p>
                                                    <p>{t.description}</p>
                                                </div>
                                            ))
                                        }
                                    </div>
                                    : ""
                            }

                        </section>

                        <button className="btn btn-warning mt-3 form-control small" onClick={() => {
                            removeOwnerRelationship(animal.id)
                                .then(r => dischargeAnimal(animal.id))
                        }}>Discharge</button>
                    </details>
                </div>
            </li>
        </React.Fragment>
    )
}
