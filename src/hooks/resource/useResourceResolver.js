import { useState } from "react"

const useResourceResolver = () => {

    const [resource, setResource] = useState({})

    const resolveResource = ({ props, property, param, collection }) => {
        let _resource = {}

        // Resource passed as prop
        if (props.hasOwnProperty(property)) {
            _resource = props[property]
        }

        // If being rendered indepedently
        if (props.hasOwnProperty("match") && props.match.params[param]) {
            _resource = collection.find(e => e.id === parseInt(props.match.params[param])) || {}
        }
        setResource(_resource)
    }

    return { resolveResource, resource }
}

export default useResourceResolver
