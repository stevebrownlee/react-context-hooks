import React from "react"
import { Route } from "react-router-dom"

import { EmployeeProviders } from "./providers/EmployeeProviders"
import Employee from "./employees/Employee"
import EmployeeList from "./employees/EmployeeList"
import EmployeeForm from "./employees/EmployeeForm"

export default () => {
    return (
        <EmployeeProviders>
            <Route path="/employees" render={p => <EmployeeList {...p} />} />
            <Route path="/employees/create" render={p => <EmployeeForm {...p} />} />
            <Route path="/employees/:employeeId(\d+)" render={p => <Employee {...p} />} />
        </EmployeeProviders>
    )
}
