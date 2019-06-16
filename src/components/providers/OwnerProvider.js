import React, { useState, useEffect } from 'react';
import OwnerRepository from "../../repositories/OwnerRepository"


// The context is imported and used by individual components that need data
export const OwnerContext = React.createContext()

/*
 This component establishes what data can be used.
 */
export const OwnerProvider = props => {
    const [owners, setOwners] = useState([]);

    /*
        Load all owners when the component is mounted. Ensure that
        an empty array is the second argument to avoid infinite loop.
    */
    useEffect(() => {
        OwnerRepository.getAll().then(setOwners)
    }, [])

    return (
        <OwnerContext.Provider value={{owners}}>
            {props.children}
        </OwnerContext.Provider>
    )
}
