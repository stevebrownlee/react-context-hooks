import React, {useContext} from "react"
import { Link } from "react-router-dom"
import location from "./location.png"
import "./Location.css"
import { AnimalContext } from "../providers/AnimalProvider";


export default props => {
    const { animals } = useContext(AnimalContext)
    const animalCount = animals.filter(a => a.locationId === props.location.id).length

    return (
        <article className="card location" style={{ width: `18rem` }}>
            <section className="card-body">
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
            </section>
            <section>
                {`${animalCount} animals`}
            </section>
        </article>
    )
}
