import React, { useState, useContext, useEffect, useRef } from "react"
import Animal from "./Animal"
import AnimalDialog from "./AnimalDialog"
import { AnimalContext } from "../providers/AnimalProvider"
import useModal from "../../hooks/ui/useModal"

import "./AnimalList.css"
import "./cursor.css"


export default (props) => {
    const searchInput = useRef()
    const { toggleDialog, modalIsOpen } = useModal("#dialog--animal")
    const [searchEnabled, setSearchEnabled] = useState(false)
    const [currentAnimal, setCurrentAnimal] = useState({treatments:[]})
    let { filteredAnimals, search } = useContext(AnimalContext)

    const showTreatmentHistory = (animal) => {
        setCurrentAnimal(animal)
        toggleDialog()
    }

    useEffect(() => {
        const handler = e => {
            // Open search field
            if (e.keyCode === 70 && e.shiftKey && e.altKey) {
                setSearchEnabled(true)
                searchInput.current.focus()

            // Close all dialogs when ESC is pressed, and close search field
            } else if (e.keyCode === 27) {
                setSearchEnabled(false)
                if (modalIsOpen) {
                    toggleDialog()
                }
            }
        }

        window.addEventListener("keyup", handler)

        return () => window.removeEventListener("keyup", handler)
    }, [toggleDialog])


    return (
        <React.Fragment>
            <AnimalDialog toggleDialog={toggleDialog} animal={currentAnimal} />

            <div className="centerChildren btn--newResource">
                <button type="button"
                    className="btn btn-success "
                    onClick={() => { props.history.push("/animals/new") }}>
                    Admit Animal
                </button>
            </div>

            <div className="cursor" open={searchEnabled}>
                <input type="text"
                    className="rq-form-element"
                    placeholder="Search text"
                    onKeyUp={(e) => {
                        if (e.keyCode === 27) {
                            searchInput.current.value = ""
                        }
                        search(searchInput.current.value)
                    }}
                    ref={searchInput} />
                <i></i>
            </div>

            <ul className="animals">
                {filteredAnimals.map(a =>
                    <Animal
                        showTreatmentHistory={showTreatmentHistory}
                        key={a.id}
                        animal={a} />)}
            </ul>
        </React.Fragment>
    )
}
