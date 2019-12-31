import Settings from "./Settings"
import { fetchIt } from "../components/providers/Fetch"

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
    async getAll() {
        return await fetchIt(`${Settings.remoteURL}/users`)
    }
}
