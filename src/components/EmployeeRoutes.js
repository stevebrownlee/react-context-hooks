import React from "react"
import { Route } from "react-router-dom"
import AuthRoute from "./auth/AuthRoute"

import { EmployeeProviders } from "./providers/EmployeeProviders"
import Employee from "./employees/Employee"
import EmployeeList from "./employees/EmployeeList"
import EmployeeForm from "./employees/EmployeeForm"

export default (props) => {
    return (
        <EmployeeProviders>
            <AuthRoute exact path="/employees" Destination={EmployeeList} />
            <AuthRoute exact path="/employees/create" Destination={EmployeeForm} />
            <Route path="/employees/:employeeId(\d+)" render={(props) => {
                return <Employee {...props} />
            }} />
        </EmployeeProviders>
    )
}
