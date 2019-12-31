import React, { useState, useEffect } from "react"
import AnimalRepository from "../../repositories/AnimalRepository"

export const AnimalContext = React.createContext()

export const AnimalProvider = props => {
    const [animals, setAnimals] = useState([])
    const [filteredAnimals, setFilteredAnimals] = useState([])

    const search = subString => {
        const filter = animals.filter(a => a.name.toLocaleLowerCase().includes(subString))
        setFilteredAnimals(filter)
    }

    const dischargeAnimal = id => AnimalRepository.delete(id)
        .then(AnimalRepository.getAll)
        .then((animals) => {
            setAnimals(animals)
            setFilteredAnimals(animals)
        })

    const addAnimal = animal => AnimalRepository.addAnimal(animal)
        .then(AnimalRepository.getAll)
        .then((animals) => {
            setAnimals(animals)
            setFilteredAnimals(animals)
        })

    useEffect(() => {
        AnimalRepository.getAll()
        .then(packet => {
            if (packet.tokenStatus === "valid") {
                return packet.data
            }
            "history" in props && props.history.push("/login")
        })
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
