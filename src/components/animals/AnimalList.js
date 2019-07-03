import React, { useState, useContext, useEffect, useRef } from "react"
import Animal from "./Animal"
import { AnimalContext } from "../providers/AnimalProvider"
import "./AnimalList.css"
import "./cursor.css"
import AnimalDialog from "./AnimalDialog";
import useModal from "../../hooks/ui/useModal";


export default (props) => {
    const searchInput = useRef()
    const { toggleDialog } = useModal(false)
    const [searchEnabled, setSearchEnabled] = useState(false)
    const [currentAnimal, setCurrentAnimal] = useState({treatments:[]})
    let { filteredAnimals, search } = useContext(AnimalContext)

    const showTreatmentHistory = (animal) => {
        setCurrentAnimal(animal)
        toggleDialog(true)
    }

    useEffect(() => {
        // Close all dialogs when ESC is pressed
        window.addEventListener("keyup", (e) => {
            if (e.keyCode === 70 && e.shiftKey && e.altKey) {
                setSearchEnabled(true)
                searchInput.current.focus()
            } else if (e.keyCode === 27) {
                setSearchEnabled(false)
                toggleDialog(false)
            }
        })
    }, [])


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
