import React, { Component } from "react"
import Animal from "../animals/Animal";


export default (props) => {

    const displayAnimals = () => {
        console.log(props.location.state)
        if (props.location.state.animals.length) {
            return (
                <React.Fragment>
                    <h3>Matching Animals</h3>
                    <ul>
                        {
                            props.location.state.animals.map(item => <Animal animal={item} key={item.id} />)
                        }
                    </ul>
                </React.Fragment>
            )
        }
    }

    return (
        <React.Fragment>
            {displayAnimals()}
        </React.Fragment>
    )
}
