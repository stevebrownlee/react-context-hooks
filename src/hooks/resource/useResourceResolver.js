import { useState } from "react"

const useResourceResolver = () => {

    const [resource, setResource] = useState({})

    const resolveResource = ({ props, property, param, collection }) => {
        let resource = {}

        // Resource passed as prop
        if (props.hasOwnProperty(property)) {
            resource = props[property]
        }

        // If being rendered indepedently
        if (props.hasOwnProperty("match") && props.match.params[param]) {
            resource = collection.find(e => e.id === parseInt(props.match.params[param])) || {}
        }
        setResource(resource)
    }

    return { resolveResource, resource }
}

export default useResourceResolver
