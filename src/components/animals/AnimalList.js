import React, { useContext } from "react"
import Animal from "./Animal"
import { AnimalContext } from "../providers/AnimalProvider"
import "./AnimalList.css"


export default (props) => {
    const { animals } = useContext(AnimalContext)

    return (
        <React.Fragment>
            <div className="centerChildren btn--newResource">
                <button type="button"
                    className="btn btn-success "
                    onClick={() => { props.history.push("/animals/new") }}>
                    Admit Animal
                </button>
            </div>

            <div className="animals">
                {animals.map(a => <Animal key={a.id} animal={a} />)}
            </div>
        </React.Fragment>
    )
}
