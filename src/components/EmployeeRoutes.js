import React from "react"
import { Route } from "react-router-dom"

import Employee from "./employees/Employee"
import EmployeeList from "./employees/EmployeeList"
import EmployeeForm from "./employees/EmployeeForm"

export default () => {
    return (
        <>
            <Route exact path="/employees">
                <EmployeeList />
            </Route>
            <Route path="/employees/create">
                <EmployeeForm />
            </Route>
            <Route path="/employees/:employeeId(\d+)">
                <Employee />
            </Route>
        </>
    )
}
