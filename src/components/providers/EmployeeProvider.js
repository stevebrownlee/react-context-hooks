import React, { useState, useEffect } from 'react';
import EmployeeRepository from "../../repositories/EmployeeRepository"


// The context is imported and used by individual components that need data
export const EmployeeContext = React.createContext()

/*
 This component establishes what data can be used.
 */
export const EmployeeProvider = props => {
    const [employees, setEmployees] = useState([]);

    const fireEmployee = id => EmployeeRepository.delete(id)
        .then(EmployeeRepository.getAll)
        .then(setEmployees)

    /*
        Load all employees when the component is mounted. Ensure that
        an empty array is the second argument to avoid infinite loop.
    */
    useEffect(() => {
        EmployeeRepository.getAll().then(setEmployees)
    }, [])

    return (
        <EmployeeContext.Provider value={{employees, fireEmployee}}>
            {props.children}
        </EmployeeContext.Provider>
    )
}
