import "./AnimalCard.css"
import React, { useEffect, useContext, useState } from "react"
import { AnimalContext } from "../providers/AnimalProvider"
import { AnimalOwnerContext } from "../providers/AnimalOwnerProvider"
import { OwnerContext } from "../providers/OwnerProvider"
import useResourceResolver from "../../hooks/resource/useResourceResolver";


export default props => {
    let className = "card animal"

    const { animals, dischargeAnimal } = useContext(AnimalContext)
    const { animalOwners, changeOwner, removeOwnerRelationship } = useContext(AnimalOwnerContext)
    const { owners } = useContext(OwnerContext)
    const { resolveResource, resource } = useResourceResolver()
    const [myOwners, setMyOwners] = useState([])

    useEffect(() => {
        resolveResource({
            props: props,
            property: "animal",
            param: "animalId",
            collection: animals
        })

        setMyOwners(animalOwners.filter(ao => ao.animalId === resource.id) || [])
    }, [resource, animalOwners, animals])


    // If being rendered indepedently
    if (props.hasOwnProperty("match") && props.match.params.animalId) {
        className = "card animal--single"
    }

    return (
        <React.Fragment>
            <li className={className} style={{ width: `18rem` }}>
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
                                    props.showTreatmentHistory(resource)
                                }}> {resource.name} </button>
                        </h5>
                        <span className="card-text small">{resource.breed}</span>
                    </div>

                    <details>
                        <summary className="smaller">
                            <meter min="0" max="100" value={Math.random() * 100} low="25" high="75" optimum="100"></meter>
                        </summary>

                        <section>
                            <h6>Caretaker</h6>
                            <span className="small">{
                                "employee" in resource
                                    ? resource.employee.name
                                    : ""
                            }</span>
                            <h6>Owners</h6>
                            <span className="small">
                                {
                                    myOwners.reduce((p, c, idx) => {
                                        return `${p} ${idx > 0 ? "and" : "Owned by "} ${c.owner.name}`
                                    }, "")
                                }
                            </span>
                        </section>

                        {
                            myOwners.length < 2
                                ? <select defaultValue=""
                                    name="owner"
                                    className="form-control small"
                                    onChange={e => {
                                        changeOwner(resource.id, parseInt(e.target.value))
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

                        <button className="btn btn-warning mt-3 form-control small" onClick={() => {
                            removeOwnerRelationship(resource.id)
                                .then(r => dischargeAnimal(resource.id))
                        }}>Discharge</button>
                    </details>
                </div>
            </li>
        </React.Fragment>
    )
}
