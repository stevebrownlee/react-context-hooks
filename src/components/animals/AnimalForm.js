import React, { useState, useContext } from "react"
import { AnimalContext } from "../providers/AnimalProvider"
import { EmployeeContext } from "../providers/EmployeeProvider"
import "./AnimalForm.css"


export default (props) => {
    const [animalName, setName] = useState("")
    const [breed, setBreed] = useState("")
    const [employeeId, setEmployeeId] = useState(0)
    const [saveEnabled, setEnabled] = useState(false)

    const { addAnimal } = useContext(AnimalContext)
    const { employees } = useContext(EmployeeContext)

    const constructNewAnimal = evt => {
        evt.preventDefault()
        const eId = parseInt(employeeId)

        if (eId === 0) {
            window.alert("Please select a caretaker")
        } else {
            const emp = employees.find(e => e.id === eId)
            const animal = {
                name: animalName,
                breed: breed,
                employeeId: eId,
                locationId: parseInt(emp.locationId)
            }

            addAnimal(animal)
                .then(() => setEnabled(true))
                .then(() => props.history.push("/animals"))
        }
    }

    return (
        <React.Fragment>
            <form className="animalForm">
                <div className="form-group">
                    <label htmlFor="animalName">Animal name</label>
                    <input
                        type="text"
                        required
                        autoFocus
                        className="form-control"
                        onChange={e => setName(e.target.value)}
                        id="animalName"
                        placeholder="Animal name"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="breed">Breed</label>
                    <input
                        type="text"
                        required
                        className="form-control"
                        onChange={e => setBreed(e.target.value)}
                        id="breed"
                        placeholder="Breed"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="employee">Assign to caretaker</label>
                    <select
                        defaultValue=""
                        name="employee"
                        id="employeeId"
                        className="form-control"
                        onChange={e => setEmployeeId(e.target.value)}
                    >
                        <option value="">Select an employee</option>
                        {employees.map(e => (
                            <option key={e.id} id={e.id} value={e.id}>
                                {e.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit"
                    onClick={constructNewAnimal}
                    disabled={saveEnabled}
                    className="btn btn-primary"> Submit </button>
            </form>
        </React.Fragment>
    )
}
