import React, { useState, useEffect } from 'react';
import { fetchIt } from './Fetch';

// The context is imported and used by individual components that need data
export const AnimalContext = React.createContext([{}, () => {}])


/*
 This component establishes what data can be used.
 */
export const AnimalProvider = props => {
    const [animals, setAnimals] = useState([]);

    const dischargeAnimal = id => fetchIt(`http://localhost:5002/animals/${id}`, "DELETE")
        .then(r => fetchIt("http://localhost:5002/animals"))
        .then(setAnimals)

    useEffect(() => {
        fetchIt("http://localhost:5002/animals").then(setAnimals)
    }, [])

    return (
        <AnimalContext.Provider value={{animals, setAnimals, dischargeAnimal}}>
            {props.children}
        </AnimalContext.Provider>
    )
}

