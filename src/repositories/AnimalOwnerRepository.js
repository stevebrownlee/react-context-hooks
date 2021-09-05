import AnimalRepository from "./AnimalRepository"
import { fetchIt } from "./Fetch"
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
    async removeOwnersAndCaretakers(animalId) {
        return AnimalRepository.get(animalId)
            .then(animal => {
                const ownerDeletes = animal.animalOwners.map(
                    ao => fetchIt(`${Settings.remoteURL}/animalOwners/${ao.id}`,"DELETE")
                )
                const employeeDeletes = animal.animalCaretakers.map(
                    c => fetchIt(`${Settings.remoteURL}/animalCaretakers/${c.id}`, "DELETE")
                )
                return Promise.all(ownerDeletes)
                    .then(() => Promise.all(employeeDeletes))
            })
    },
    async getOwnersByAnimal (animalId) {
        const e = await fetch(`${Settings.remoteURL}/animalOwners?animalId=${animalId}&_expand=user`)
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