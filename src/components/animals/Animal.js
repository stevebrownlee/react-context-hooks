import React, { useEffect, useState } from "react"
import AnimalRepository from "../../repositories/AnimalRepository";
import OwnerRepository from "../../repositories/OwnerRepository";
import AnimalOwnerRepository from "../../repositories/AnimalOwnerRepository";
import "./AnimalCard.css"

export default ({animal, showTreatmentHistory, animalOwners, setAnimalOwners}) => {
    const [detailsOpen, setDetailsOpen] = useState(false)
    const [owners, setOwners] = useState([])
    const [myOwners, setPeople] = useState([])
    const [cardClasses, setCardClasses] = useState("card animal")

    useEffect(() => {
        OwnerRepository.getAll().then(data => setOwners(data))
        AnimalOwnerRepository.getOwnersByAnimal(animal.id).then(d => setPeople(d))
    }, [])

    return (
        <>
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
                                    showTreatmentHistory(animal)
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
                                        return `${p} ${idx > 0 ? "and" : "Owned by"} ${c.user.name}`
                                    }, "")
                                }
                            </span>

                            {
                                myOwners.length < 2
                                    ? <select defaultValue=""
                                        name="owner"
                                        className="form-control small"
                                        onChange={e => {
                                            AnimalOwnerRepository.assignOwner(animal.id, parseInt(e.target.value))
                                                .then(AnimalOwnerRepository.getAll)
                                                .then(setAnimalOwners)
                                        }} >
                                        <option value="">
                                            Select {animalOwners.length === 1 ? "another" : "an"} owner
                                        </option>
                                        {
                                            animalOwners.map(o => <option key={o.id} value={o.id}>{o.user.name}</option>)
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

                        <button className="btn btn-warning mt-3 form-control small" onClick={() =>
                            AnimalOwnerRepository
                                .removeOwnerRelationship(animal.id)
                                .then(r => AnimalRepository.delete(animal.id))
                        }>Discharge</button>
                    </details>
                </div>
            </li>
        </>
    )
}
