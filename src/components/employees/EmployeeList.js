import React, { useContext, useState } from "react"
import Modal from "react-modal"
import Employee from "./Employee"
import { EmployeeContext } from "../providers/EmployeeProvider"
import EmployeeForm from "./EmployeeForm"
import "./EmployeeList.css"


export default props => {
    const { employees, fireEmployee } = useContext(EmployeeContext)

    return (
        <>
            <div className="centerChildren btn--newResource">
                <button type="button"
                    className="btn btn-success "
                    onClick={() => true}>
                    Hire Employee
                </button>
            </div>

            <div className="employees">
                {employees.map(a => <Employee key={a.id} employee={a} fireEmployee={fireEmployee} />)}
            </div>
        </>
    )
}
