export const OxfordList = (resources: Array<Object>, namespace: string) => {

    const propArray: Array<string> = namespace.split(".")

    const display = (resource: Object) => {
        return propArray.reduce(
            (data: Object, property: string) => {
                // @ts-ignore
                return data[property]
            }, resource
        )
    }

    return resources.reduce(
        (list: string, resource: Object, idx: number, resourceArray: Array<Object>) => {
            const output = display(resource)
            return `${list}${
                (resourceArray.length > 1 && idx === resourceArray.length - 1)
                    ? `, and ${output}`
                    : idx === 0
                        ? `${output}`
                        : `, ${output}`
                }`
        },
        ""
    )
}
