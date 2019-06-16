import React from "react"
import { Link } from "react-router-dom"


export default props => {
    return (
        <div className="card" style={{ width: `18rem` }}>
            <div className="card-body">
                <h5 className="card-title">
                    <Link className="card-link"
                        to={{
                            pathname: `/animals/${props.animal.id}`,
                            state: { animal: props.animal }
                        }}>
                        {props.animal.name}
                    </Link>
                </h5>
                <p className="card-text">{props.animal.breed}</p>
                <button onClick={() => props.dischargeAnimal(props.animal.id)} >Delete</button>
            </div>
        </div>
    )
}
