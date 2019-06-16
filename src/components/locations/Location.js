import React from "react"
import { Link } from "react-router-dom"
import location from "./location.png"
import "./Location.css"


export default props => {
    return (
        <div className="card location" style={{ width: `18rem` }}>
            <div className="card-body">
                <img src={location} className="icon--location" />
                <h5 className="card-title">
                    <Link className="card-link"
                        to={{
                            pathname: `/locations/${props.location.id}`,
                            state: { location: props.location }
                        }}>
                        {props.location.name}
                    </Link>
                </h5>
            </div>
        </div>
    )
}
