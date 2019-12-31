import React, { useState, useContext, useEffect } from "react"
import Animal from "./Animal"
import AnimalDialog from "./AnimalDialog"
import { AnimalContext } from "../providers/AnimalProvider"
import useModal from "../../hooks/ui/useModal"

import "./AnimalList.css"
import "./cursor.css"


export const AnimalListComponent = (props) => {
    const [currentAnimal, setCurrentAnimal] = useState({ treatments: [] })
    let { filteredAnimals } = useContext(AnimalContext)
    let { toggleDialog, modalIsOpen } = useModal("#dialog--animal")

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
                    filteredAnimals.map(a =>
                        <Animal key={a.id} animal={a}
                            showTreatmentHistory={showTreatmentHistory}
                        />)
                }
            </ul>
        </>
    )
}
