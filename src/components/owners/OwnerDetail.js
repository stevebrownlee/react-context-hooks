import React, { Component } from "react"
import "./Animal.css"
import dog from "./DogIcon.svg"


export default class OwnerDetail extends Component {
    render() {
        /*
            Using the route parameter, find the animal that the
            user clicked on by looking at the `this.props.animals`
            collection that was passed down from ApplicationViews
        */
        const animal = this.props.animals.find(a =>
            a.id === parseInt(this.props.match.params.animalId))
             || {id:404, name:"404", breed: "Dog not found"}

        return (
            <section className="animal">
                <div key={animal.id} className="card">
                    <div className="card-body">
                        <h4 className="card-title">
                            <img src={dog} className="icon--dog" />
                            {animal.name}
                        </h4>
                        <h6 className="card-title">{animal.breed}</h6>
                        <button
                            onClick={() =>
                                this.props.dischargeAnimal(animal.id)
                                    .then(() => this.props.history.push("/animals"))
                            }
                            className="card-link">Delete</button>
                    </div>
                </div>
            </section>
        )
    }
}