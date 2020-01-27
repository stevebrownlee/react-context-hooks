import React, { useRef } from "react"
import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "./NavBar.css"
import AnimalRepository from "../../repositories/AnimalRepository";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import Settings from "../../repositories/Settings";



export default (props) => {
    const searchInput = useRef()
    const { isAuthenticated, logout } = useSimpleAuth()

    const search = (e) => {
        if (e.charCode === 13) {
            const terms = document.querySelector("#searchTerms").value
            const foundItems = {}

            fetch(`${Settings.remoteURL}/employees?name_like=${encodeURI(terms)}`)
                .then(r => r.json())
                .then(employees => {
                    foundItems.employees = employees
                    return fetch(`${Settings.remoteURL}/locations?name_like=${encodeURI(terms)}`)
                })
                .then(r => r.json())
                .then(locations => {
                    foundItems.locations = locations
                    return AnimalRepository.searchByName(encodeURI(terms))
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
        <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top onTop">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div id="navbarNavDropdown" className="navbar-collapse collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">NSS Kennels <span className="sr-only">(current)</span></Link>
                        </li>
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
                    <ul className="navbar-nav">
                        <li className="nav-item dropdown">
                            {
                                isAuthenticated()
                                    ? <Link onClick={() => {
                                        logout()
                                    }} className="nav-link" to="/login">Logout</Link>
                                    : <Link className="nav-link" to="/login">Login</Link>
                            }
                        </li>
                        <li className="nav-item">
                            {
                                !isAuthenticated()
                                    ? <Link className="nav-link" to="/register">Register</Link>
                                    : ""
                            }
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}
