import React, { useState, useContext, useEffect, useRef } from "react"
import Animal from "./Animal"
import { AnimalContext } from "../providers/AnimalProvider"
import "./AnimalList.css"
import "./cursor.css"


export default (props) => {
    const searchInput = useRef()
    const [searchEnabled, setSearchEnabled] = useState(false)
    let { filteredAnimals, search } = useContext(AnimalContext)

    useEffect(() => {
        // Close all dialogs when ESC is pressed
        window.addEventListener("keyup", (e) => {
            if (e.keyCode === 70 && e.shiftKey && e.altKey) {
                setSearchEnabled(true)
                searchInput.current.focus()
            } else if (e.keyCode === 27) {
                setSearchEnabled(false)
                document
                    .querySelectorAll(".dialog--animal[open]")
                    .forEach(d => d.removeAttribute("open"))
            }
        })
    }, [])


    return (
        <React.Fragment>
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

            <div className="animals">
                {filteredAnimals.map(a => <Animal key={a.id} animal={a} />)}
            </div>
        </React.Fragment>
    )
}
