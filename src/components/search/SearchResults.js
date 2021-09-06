import React from "react"
import { useLocation } from "react-router-dom";
import { Animal } from "../animals/Animal"
import Employee from "../employees/Employee"
import Location from "../locations/Location"
import "./SearchResults.css"


export default () => {
    const location = useLocation()

    const displayAnimals = () => {
        if (location.state?.animals.length) {
            return (
                <React.Fragment>
                    <h2>Matching Animals</h2>
                    <section className="animals">
                        {
                            location.state.animals.map(item => <Animal animal={item} key={item.id} />)
                        }
                    </section>
                </React.Fragment>
            )
        }
    }

    const displayEmployees = () => {
        if (location.state?.employees.length) {
            return (
                <React.Fragment>
                    <h2>Matching Employees</h2>
                    <section className="employees">
                        {
                            location.state.employees.map(item => <Employee employee={item} key={item.id} />)
                        }
                    </section>
                </React.Fragment>
            )
        }
    }

    const displayLocations = () => {
        if (location.state?.locations.length) {
            return (
                <React.Fragment>
                    <h2>Matching Locations</h2>
                    <section className="locations">
                        {
                            location.state.locations.map(item => <Location location={item} key={item.id} />)
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
