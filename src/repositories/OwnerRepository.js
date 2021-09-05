import Settings from "./Settings"
import { fetchIt } from "./Fetch"

export default {
    async get(id) {
        return await fetchIt(`${Settings.remoteURL}/users/${id}`)
    },
    async createAccount(user) {
        return await fetchIt(`${Settings.remoteURL}/users`, "POST", JSON.stringify(user))
    },
    async findUser(un, pwd) {
        return await fetchIt(`${Settings.remoteURL}/users?email=${un}&password=${pwd}`)
    },
    async delete(id) {
        return await fetchIt(`${Settings.remoteURL}/users/${id}`, "DELETE")
    },
    async getAllCustomers() {
        return await fetchIt(`${Settings.remoteURL}/users?employee=false`)
    },
    async getAllEmployees() {
        return await fetchIt(`${Settings.remoteURL}/users?employee=true`)
    },
    async getAll() {
        return await fetchIt(`${Settings.remoteURL}/users`)
    }
}
