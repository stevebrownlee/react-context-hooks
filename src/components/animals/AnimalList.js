import React, { useState, useEffect, useContext } from 'react';
import Animal from "./Animal"
import { KennelContext } from "../../data/KennelProvider"
import "./AnimalList.css"

export default () => {
    const [animals, setAnimals] = useContext(KennelContext);

    return (
        <div className="animals">
            { animals.map(a => <Animal key={a.id} animal={a} />) }
        </div>
    )
}
