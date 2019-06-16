import React, { useContext } from "react"
import Animal from "./Animal"
import { AnimalContext } from "../../data/AnimalProvider"
import "./AnimalList.css"


export default () => {
    const { animals, dischargeAnimal } = useContext(AnimalContext);

    return (
        <div className="animals">
            {animals.map(a => <Animal key={a.id} animal={a} dischargeAnimal={dischargeAnimal} />)}
        </div>
    )
}
