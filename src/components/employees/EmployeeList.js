import React, { useContext, useState, useEffect } from "react"
import Employee from "./Employee"
import { EmployeeContext } from "../providers/EmployeeProvider"
import "./EmployeeList.css"


export default props => {
    const { employees, fireEmployee } = useContext(EmployeeContext)

    const [emps, setEmployees] = useState([])

    useEffect(
        () => {
            setEmployees(employees)
        },
        [employees]
    )

    return (
        <>
            <div className="centerChildren btn--newResource">
                <button type="button"
                    className="btn btn-success "
                    onClick={() => props.history.push("/employees/create")}>
                    Hire Employee
                </button>
            </div>

            <div className="employees">
                {
                    emps.map(a => <Employee key={a.id} employee={a} fireEmployee={fireEmployee} />)
                }
            </div>
        </>
    )
}
