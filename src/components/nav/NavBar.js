import React, { Component } from "react"
import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "./NavBar.css"


export default class NavBar extends Component {
    state = { searchTerms: "" }



    search = (e) => {
        if (e.charCode === 13) {
            const terms = document.querySelector("#searchTerms").value
            const foundItems = {}

            fetch(`http://localhost:5002/employees?name_like=${encodeURI(terms)}`)
                .then(r => r.json())
                .then(employees => {
                    foundItems.employees = employees
                    return fetch(`http://localhost:5002/locations?name_like=${encodeURI(terms)}`)
                })
                .then(r => r.json())
                .then(locations => {
                    foundItems.locations = locations
                    return fetch(`http://localhost:5002/animals?name_like=${encodeURI(terms)}`)
                })
                .then(r => r.json())
                .then(animals => {
                    foundItems.animals = animals
                    this.setState({ searchTerms: "" })
                    this.props.history.push({
                        pathname: "/search",
                        state: foundItems
                    })
                })
        }
    }

    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    render() {
        return (
            <nav className="navbar navbar-light fixed-top light-blue flex-md-nowrap p-0 shadow">
            <ul className="nav nav-pills">
                <li className="nav-item">
                    <Link className="nav-link" to="/">Locations</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/animals">Animals</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/employees">Employees</Link>
                </li>
                <li className="nav-item">
                    <input id="searchTerms"
                        onKeyPress={this.search}
                        value={this.state.searchTerms}
                        onChange={this.handleFieldChange}
                        className="form-control w-100"
                        type="search"
                        placeholder="Search"
                        aria-label="Search" />
                </li>
            </ul>
            </nav>
        )
    }
}
