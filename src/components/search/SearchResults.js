import React from "react"
import {Animal} from "../animals/Animal"
import Employee from "../employees/Employee"
import Location from "../locations/Location"
import "./SearchResults.css"


export default (props) => {

    const displayAnimals = () => {
        if (props.location.state.animals.length) {
            return (
                <React.Fragment>
                    <h2>Matching Animals</h2>
                    <section className="animals">
                        {
                            props.location.state.animals.map(item => <Animal animal={item} key={item.id} />)
                        }
                    </section>
                </React.Fragment>
            )
        }
    }

    const displayEmployees = () => {
        if (props.location.state.employees.length) {
            return (
                <React.Fragment>
                    <h2>Matching Employees</h2>
                    <section className="employees">
                        {
                            props.location.state.employees.map(item => <Employee employee={item} key={item.id} />)
                        }
                    </section>
                </React.Fragment>
            )
        }
    }

    const displayLocations = () => {
        if (props.location.state.locations.length) {
            return (
                <React.Fragment>
                    <h2>Matching Locations</h2>
                    <section className="locations">
                        {
                            props.location.state.locations.map(item => <Location location={item} key={item.id} />)
                        }
                    </section>
                </React.Fragment>
            )
        }
    }

    return (
        <React.Fragment>
            <article className="searchResults">
                {displayAnimals()}
                {displayEmployees()}
                {displayLocations()}
            </article>
        </React.Fragment>
    )
}
