import Settings from "./Settings"
import { fetchIt } from "../components/providers/Fetch"

export default {
    async get(id) {
        // const e = await fetch(`${Settings.remoteURL}/animalia/${id}`)
        return await fetchIt(`${Settings.remoteURL}/animals/${id}`)
    },
    async searchByName(query) {
        return await fetchIt(`${Settings.remoteURL}/animals?_expand=employee&_sort=employee.id&_embed=treatments&_expand=location&name_like=${query}`)
    },
    async delete(id) {
        return await fetchIt(`${Settings.remoteURL}/animals/${id}`, "DELETE")
    },
    async getAll() {
        return await fetchIt(`${Settings.remoteURL}/animals?_embed=animalOwners&_embed=treatments`)
    },
    async addAnimal(newAnimal) {
        return await fetchIt(
            `${Settings.remoteURL}/animals`,
            "POST",
            JSON.stringify(newAnimal)
        )
    },
    async updateAnimal(editedAnimal) {
        return await fetchIt(
            `${Settings.remoteURL}/animals/${editedAnimal.id}`,
            "PUT",
            JSON.stringify(editedAnimal)
        )
    }
}
