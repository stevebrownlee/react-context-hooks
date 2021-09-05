import Settings from "./Settings"
import { fetchIt } from "./Fetch"
import OwnerRepository from "./OwnerRepository"

const expandAnimalUser = (animal, users) => {
    animal.animalOwners = animal.animalOwners.map(ao => {
        ao.user = users.find(user => user.id === ao.userId)
        return ao
    })

    animal.animalCaretakers = animal.animalCaretakers.map(caretaker => {
        caretaker.user = users.find(user => user.id === caretaker.userId)
        return caretaker
    })

    return animal
}

export default {
    async get(id) {
        const users = await OwnerRepository.getAll()
        return await fetchIt(`${Settings.remoteURL}/animals/${id}?_embed=animalOwners&_embed=treatments&_embed=animalCaretakers`)
            .then(animal => {
                animal = expandAnimalUser(animal, users)
                return animal
            })
    },
    async searchByName(query) {
        return await fetchIt(`${Settings.remoteURL}/animals?_expand=employee&_sort=employee.id&_embed=treatments&_expand=location&name_like=${query}`)
    },
    async delete(id) {
        return await fetchIt(`${Settings.remoteURL}/animals/${id}`, "DELETE")
    },
    async getAll() {
        const users = await OwnerRepository.getAll()
        const animals = await fetchIt(`${Settings.remoteURL}/animals?_embed=animalOwners&_embed=treatments&_embed=animalCaretakers`)
            .then(data => {
                const embedded = data.map(animal => {
                    animal = expandAnimalUser(animal, users)
                    return animal
                })
                return embedded
            })
        return animals
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
