import React, { useState, useContext, useEffect } from "react"
import Animal from "./Animal"
import AnimalDialog from "./AnimalDialog"
import AnimalRepository from "../../repositories/AnimalRepository";
import AnimalOwnerRepository from "../../repositories/AnimalOwnerRepository";
import useModal from "../../hooks/ui/useModal"

import "./AnimalList.css"
import "./cursor.css"


export const AnimalListComponent = (props) => {
    const [animals, petAnimals] = useState([])
    const [animalOwners, setAnimalOwners] = useState([])
    const [currentAnimal, setCurrentAnimal] = useState({ treatments: [] })
    let { toggleDialog, modalIsOpen } = useModal("#dialog--animal")

    useEffect(() => {
       AnimalRepository.getAll().then(data => petAnimals(data))
       AnimalOwnerRepository.getAll().then(setAnimalOwners)
    }, [])

    const showTreatmentHistory = animal => {
        setCurrentAnimal(animal)
        toggleDialog()
    }

    useEffect(() => {
        const handler = e => {
            if (e.keyCode === 27 && modalIsOpen) {
                toggleDialog()
            }
        }

        window.addEventListener("keyup", handler)

        return () => window.removeEventListener("keyup", handler)
    }, [toggleDialog, modalIsOpen])


    return (
        <>
            <AnimalDialog toggleDialog={toggleDialog} animal={currentAnimal} />

            <div className="centerChildren btn--newResource">
                <button type="button"
                    className="btn btn-success "
                    onClick={() => { props.history.push("/animals/new") }}>
                    Admit Animal
                </button>
            </div>

            <ul className="animals">
                {
                    animals.map(anml =>
                        <Animal key={`animal--${anml.id}`} animal={anml}
                            animalOwners={animalOwners}
                            setAnimalOwners={setAnimalOwners}
                            showTreatmentHistory={showTreatmentHistory}
                        />)
                }
            </ul>
        </>
    )
}
