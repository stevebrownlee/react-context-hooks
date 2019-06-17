import Settings from "./Settings"

export default {
    async get(params) {
        const e = await fetch(`${Settings.remoteURL}/animalOwners/${params}`)
        return await e.json()
    },
    async delete(id) {
        const e = await fetch(`${Settings.remoteURL}/animalOwners/${id}`, {
            method: "DELETE"
        })
        return await e.json()
    },
    async getOwnersByAnimal (animalId) {
        const e = await fetch(`${Settings.remoteURL}/animalOwners/?animalId=${animalId}`)
        return await e.json()
    },
    async assignOwner(animalId, ownerId) {
        const e = await fetch(`${Settings.remoteURL}/animalOwners`, {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify({ animalId, ownerId })
        })
        return await e.json()
    },
    async getAll() {
        const e = await fetch(`${Settings.remoteURL}/animalOwners/?_expand=owner&_expand=animal`)
        return await e.json()
    }
}