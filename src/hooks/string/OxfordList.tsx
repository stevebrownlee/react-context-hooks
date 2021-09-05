export const OxfordList = (resources: Array<Object>, ...props: Array<string>) => {
    const display = (resource: Object) => {
        return props.reduce(
            (data: Object, property: string) => {
                // @ts-ignore
                return data[property]
            }, resource
        )
    }

    return resources.reduce(
        (list: string, resource: Object, idx: number, resourceArray: Array<Object>) => {
            const output = display(resource)
            return `${list} ${(resourceArray.length > 1 && idx === resourceArray.length - 1) ? `and ${output}` : output}`
        },
        ""
    )
}
