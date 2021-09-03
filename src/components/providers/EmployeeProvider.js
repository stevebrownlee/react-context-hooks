import React, { useState, useEffect } from 'react';
import EmployeeRepository from "../../repositories/EmployeeRepository"

export const EmployeeContext = React.createContext()

export const EmployeeProvider = props => {
    const [employees, setEmployees] = useState([]);

    const fireEmployee = id => EmployeeRepository.delete(id)
        .then(EmployeeRepository.getAll)
        .then(setEmployees)

    useEffect(() => {
        EmployeeRepository.getAll()
        .then(packet => {
            if (packet.tokenStatus === "valid") {
                return packet.data
            }
            "history" in props && props.history.push("/login")
        })
        .then(setEmployees)
    }, [])

    return (
        <EmployeeContext.Provider value={{employees, fireEmployee}}>
            {props.children}
        </EmployeeContext.Provider>
    )
}
