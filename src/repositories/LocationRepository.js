import Settings from "./Settings"
import { fetchIt } from "../components/providers/Fetch"

export default {
    async get(id) {
        return await fetchIt(`${Settings.remoteURL}/locations/${id}`)
    },
    async delete(id) {
        return await fetchIt(`${Settings.remoteURL}/locations/${id}`, "DELETE")
    },
    async getAll() {
        return await fetchIt(`${Settings.remoteURL}/locations`)
    }
}
