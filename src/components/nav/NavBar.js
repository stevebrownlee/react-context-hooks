import React, { useState, useRef } from "react"
import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "./NavBar.css"
import AnimalRepository from "../../repositories/AnimalRepository";


export default (props) => {
    const searchInput = useRef()

    const search = (e) => {
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
                    return AnimalRepository.searchByName(encodeURI(terms))
                    // return fetch(`http://localhost:5002/animalia?name_like=${encodeURI(terms)}`)
                })
                .then(animals => {
                    foundItems.animals = animals
                    searchInput.current.value = ""
                    props.history.push({
                        pathname: "/search",
                        state: foundItems
                    })
                })
        }
    }

    return (
        <nav className="navbar navbar-light fixed-top light-blue flex-md-nowrap p-2 shadow onTop">
            <ul className="nav nav-pills">
                <li className="nav-item">
                    <Link className="nav-link" to="/locations">Locations</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/animals">Animals</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/employees">Employees</Link>
                </li>
                <li className="nav-item">
                    <input id="searchTerms"
                        onKeyPress={search}
                        ref={searchInput}
                        className="form-control w-100"
                        type="search"
                        placeholder="Search"
                        aria-label="Search" />
                </li>
            </ul>
        </nav>
    )
}