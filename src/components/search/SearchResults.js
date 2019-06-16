import React, { Component } from "react"
import Animal from "../animals/Animal";


export default class SearchResults extends Component {

    displayAnimals = () => {
        if (this.props.location.state.animals.length) {
            return (
            <React.Fragment>
                <h3>Matching Animals</h3>
                <ul>
                {
                    this.props.location.state.animals.map(item => <Animal animal={item} key={item.id}/>)
                }
                </ul>
            </React.Fragment>
            )
        }
    }

    render() {
        return (
            <React.Fragment>
                {this.displayAnimals()}
            </React.Fragment>
        )
    }
}
