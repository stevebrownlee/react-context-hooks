import React, { useContext, useRef } from "react"
import { EmployeeContext } from "../providers/EmployeeProvider"
import { LocationContext } from "../providers/LocationProvider"
import "./EmployeeForm.css"


export default (props) => {
    const [name] = useRef("")
    const [location] = useRef(0)

    const { locations } = useContext(LocationContext)
    const { hireEmployee } = useContext(EmployeeContext)

    const constructNewEmployee = () => {
        const locationId = parseInt(location.current.value)

        if (locationId === 0) {
            window.alert("Please select a location")
        } else {
            hireEmployee({
                name: name.current.value,
                locationId: locationId
            })
        }
    }

    return (
        <React.Fragment>
            <form className="employeeForm">
                <h2 className="employeeForm__title">New Employee</h2>
                <div className="form-group">
                    <label htmlFor="employeeName">Employee name</label>
                    <input
                        type="text"
                        required
                        autoFocus
                        ref={name}
                        className="form-control"
                        placeholder="Employee name"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="location">Assign to location</label>
                    <select
                        defaultValue=""
                        name="location"
                        ref={location}
                        className="form-control"
                    >
                        <option value="">Select a location</option>
                        {locations.map(e => (
                            <option key={e.id} value={e.id}>
                                {e.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit"
                    onClick={
                        evt => {
                            evt.preventDefault()
                            props.setModalOpen(false)
                            constructNewEmployee()
                        }
                    }
                    className="btn btn-primary"> Save Employee </button>
            </form>
        </React.Fragment>
    )
}
