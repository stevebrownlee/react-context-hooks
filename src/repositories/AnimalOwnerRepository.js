import Settings from "./Settings"

export default {
    async get(params) {
        const e = await fetch(`${Settings.remoteURL}/animalOwners/${params}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("kennel_token")}`
            }
        })
        return await e.json()
    },
    async delete(id) {
        const e = await fetch(`${Settings.remoteURL}/animalOwners/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("kennel_token")}`
            }
        })
        return await e.json()
    },
    async getOwnersByAnimal (animalId) {
        const e = await fetch(`${Settings.remoteURL}/animalOwners?animalId=${animalId}&_expand=user`,
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("kennel_token")}`
                }
            })
        return await e.json()
    },
    async assignOwner(animalId, userId) {
        const e = await fetch(`${Settings.remoteURL}/animalOwners`, {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("kennel_token")}`
            },
            "body": JSON.stringify({ animalId, userId })
        })
        return await e.json()
    },
    async getAll() {
        const e = await fetch(`${Settings.remoteURL}/animalOwners?_expand=user&user.employee=false&_expand=animal`)
        return await e.json()
    }
}