import React, { useState, useEffect, useContext } from "react"
import AnimalRepository from "../../repositories/AnimalRepository"
import AnimalOwnerRepository from "../../repositories/AnimalOwnerRepository"
import { AnimalOwnerContext } from "./AnimalOwnerProvider"

// The context is imported and used by individual components that need data
export const AnimalContext = React.createContext()

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
        Add specified animal, then reload from API
    */
    const addAnimal = animal => AnimalRepository.addAnimal(animal)
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
        <AnimalContext.Provider value={{ animals, dischargeAnimal, addAnimal }}>
            {props.children}
        </AnimalContext.Provider>
    )
}

