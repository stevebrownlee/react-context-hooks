import React, { useState, useEffect } from "react"
import AnimalRepository from "../../repositories/AnimalRepository"

// The context is imported and used by individual components that need data
export const AnimalContext = React.createContext()

/*
 This component establishes what data can be used.
 */
export const AnimalProvider = props => {
    const [animals, setAnimals] = useState([])
    const [filteredAnimals, setFilteredAnimals] = useState([])

    const search = subString => {
        const filter = animals.filter(a => a.name.toLocaleLowerCase().includes(subString))
        setFilteredAnimals(filter)
    }

    /*
        Delete specified animal, then reload from API
    */
    const dischargeAnimal = id => AnimalRepository.delete(id)
        .then(AnimalRepository.getAll)
        .then((animals) => {
            setAnimals(animals)
            setFilteredAnimals(animals)
        })

    /*
        Add specified animal, then reload from API
    */
    const addAnimal = animal => AnimalRepository.addAnimal(animal)
        .then(AnimalRepository.getAll)
        .then((animals) => {
            setAnimals(animals)
            setFilteredAnimals(animals)
        })

    /*
        Load all animals when the component is mounted. Ensure that
        an empty array is the second argument to avoid infinite loop.
    */
    useEffect(() => {
        AnimalRepository.getAll()
        .then((animals) => {
            setAnimals(animals)
            setFilteredAnimals(animals)
        })
    }, [])

    return (
        <AnimalContext.Provider value={{
            animals,
            filteredAnimals,
            dischargeAnimal,
            addAnimal,
            search
        }}>
            {props.children}
        </AnimalContext.Provider>
    )
}

