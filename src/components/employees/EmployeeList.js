import React, { useContext } from "react"
import Employee from "./Employee"
import { EmployeeContext } from "../data/EmployeeProvider"
import "./EmployeeList.css"


export default () => {
    const { employees, fireEmployee } = useContext(EmployeeContext)

    return (
        <div className="employees">
            {employees.map(a => <Employee key={a.id} employee={a} fireEmployee={fireEmployee} />)}
        </div>
    )
}
