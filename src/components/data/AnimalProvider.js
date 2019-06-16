import React, { useState, useEffect } from "react"
import AnimalRepository from "../../modules/AnimalRepository"

// The context is imported and used by individual components that need data
export const AnimalContext = React.createContext([{}, () => { }])

/*
 This component establishes what data can be used.
 */
export const AnimalProvider = props => {
    const [animals, setAnimals] = useState([])

    /*
        Delete specified animal, then reload from API
    */
    const dischargeAnimal = id => AnimalRepository.delete(id)
        .then(AnimalRepository.getAll)
        .then(setAnimals)

    /*
        Load all animals when the component is mounted. Ensure that
        an empty array is the second argument to avoid infinite loop.
    */
    useEffect(() => {
        AnimalRepository.getAll().then(setAnimals)
    }, [])

    return (
        <AnimalContext.Provider value={{ animals, dischargeAnimal }}>
            {props.children}
        </AnimalContext.Provider>
    )
}

