import Settings from "./Settings"
import { fetchIt } from "../components/providers/Fetch"

export default {
    async get(id) {
        return await fetchIt(`${Settings.remoteURL}/users/${id}`)
    },
    async delete(id) {
        return await fetchIt(`${Settings.remoteURL}/users/${id}`, "DELETE")
    },
    async addEmployee(employee) {
        return await fetchIt(`${Settings.remoteURL}/users`, "POST", JSON.stringify(employee))
    },
    async getAll() {
        return await fetchIt(`${Settings.remoteURL}/users?employee=true`)
    }
}
