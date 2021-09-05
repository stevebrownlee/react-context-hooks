import React, { useEffect, useState } from "react"
import AnimalRepository from "../../repositories/AnimalRepository";
import AnimalOwnerRepository from "../../repositories/AnimalOwnerRepository";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import "./AnimalCard.css"
import { useHistory, useParams } from "react-router";
import useResourceResolver from "../../hooks/resource/useResourceResolver";
import { OxfordList } from "../../hooks/string/OxfordList.tsx";

export const Animal = ({ animal, syncAnimals,
    showTreatmentHistory, owners,
    animalOwners, setAnimalOwners }) => {
    const [detailsOpen, setDetailsOpen] = useState(false)
    const [isEmployee, setAuth] = useState(false)
    const [myOwners, setPeople] = useState([])
    const [classes, defineClasses] = useState("card animal")
    const { getCurrentUser } = useSimpleAuth()
    const history = useHistory()
    const { animalId } = useParams()
    const { resolveResource, resource:currentAnimal } = useResourceResolver()

    useEffect(() => {
        setAuth(getCurrentUser().employee)
        resolveResource(animal, animalId, AnimalRepository.get)
    }, [])

    useEffect(() => {
        AnimalOwnerRepository.getOwnersByAnimal(currentAnimal.id).then(d => setPeople(d))
    }, [currentAnimal, animalOwners])

    useEffect(() => {
       if (animalId) {
           defineClasses("card animal--single")
       }
    }, [animalId])

    return (
        <>
            <li className={classes}>
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
                                    if (isEmployee) {
                                        showTreatmentHistory(currentAnimal)
                                    }
                                    else {
                                        history.push(`/animals/${currentAnimal.id}`)
                                    }
                                }}> {currentAnimal.name} </button>
                        </h5>
                        <span className="card-text small">{currentAnimal.breed}</span>
                    </div>

                    <details open={detailsOpen}>
                        <summary className="smaller">
                            <meter min="0" max="100" value={Math.random() * 100} low="25" high="75" optimum="100"></meter>
                        </summary>

                        <section>
                            <h6>Caretaker(s)</h6>
                            <span className="small">{
                                "animalCaretakers" in currentAnimal
                                    ? OxfordList(currentAnimal.animalCaretakers, "user", "name")
                                    : ""
                            }</span>


                            {
                                isEmployee
                                    ? <>
                                        <h6>Owners</h6>
                                        <span className="small">
                                            {
                                                myOwners.reduce((p, c, idx) => {
                                                    return `${p} ${idx > 0 ? "and" : "Owned by"} ${c.user.name}`
                                                }, "")
                                            }
                                        </span>
                                    </>
                                    : ""
                            }

                            {
                                isEmployee && myOwners.length < 2
                                    ? <select defaultValue=""
                                        name="owner"
                                        className="form-control small"
                                        onChange={e => {
                                            AnimalOwnerRepository.assignOwner(currentAnimal.id, parseInt(e.target.value))
                                                .then(AnimalOwnerRepository.getAll)
                                                .then(setAnimalOwners)
                                        }} >
                                        <option value="">
                                            Select {myOwners.length === 1 ? "another" : "an"} owner
                                        </option>
                                        {
                                            owners.map(o => <option key={o.id} value={o.id}>{o.name}</option>)
                                        }
                                    </select>
                                    : null
                            }


                            {
                                detailsOpen && "treatments" in currentAnimal
                                    ? <div className="small">
                                        <h6>Treatment History</h6>
                                        {
                                            currentAnimal.treatments.map(t => (
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

                        {
                            isEmployee
                                ? <button className="btn btn-warning mt-3 form-control small" onClick={() =>
                                        AnimalOwnerRepository
                                            .removeOwnersAndCaretakers(currentAnimal.id)
                                            .then(() => AnimalRepository.delete(currentAnimal.id))
                                            .then(AnimalOwnerRepository.getAll)
                                            .then(setAnimalOwners)
                                            .then(syncAnimals)
                                    }>Discharge</button>
                                : ""
                        }

                    </details>
                </div>
            </li>
        </>
    )
}
