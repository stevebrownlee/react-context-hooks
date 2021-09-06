import Settings from "./Settings"
import { fetchIt } from "./Fetch"
import OwnerRepository from "./OwnerRepository"

export default {
    async get(id) {
        const employees = await OwnerRepository.getAllEmployees()
        return await fetchIt(`${Settings.remoteURL}/locations/${id}?_embed=animals&_embed=employeeLocations`)
            .then(location => {
                location.employeeLocations = location.employeeLocations.map(
                    el => {
                        el.employee = employees.find(e => e.id === el.userId)
                        return el
                    }
                )
                return location
            })
    },
    async search(terms) {
        const employees = await OwnerRepository.getAllEmployees()
        return await fetchIt(`${Settings.remoteURL}/locations/?name_like=${encodeURI(terms)}&_embed=animals&_embed=employeeLocations`)
            .then(locations => {
                locations = locations.map(location => {
                    location.employeeLocations = location.employeeLocations.map(
                        el => {
                            el.employee = employees.find(e => e.id === el.userId)
                            return el
                        }
                    )
                    return location
                })
                return locations
            })
    },
    async delete(id) {
        return await fetchIt(`${Settings.remoteURL}/locations/${id}`, "DELETE")
    },
    async getAll() {
        return await fetchIt(`${Settings.remoteURL}/locations?_embed=animals&_embed=employeeLocations`)
    }
}
