import Settings from "./Settings"

export default {
    async get(id) {
        const e = await fetch(`${Settings.remoteURL}/locations/${id}`)
        return await e.json()
    },
    async delete(id) {
        const e = await fetch(`${Settings.remoteURL}/locations/${id}`, {
            method: "DELETE"
        })
        return await e.json()
    },

    async getAll() {
        const e = await fetch(`${Settings.remoteURL}/locations`)
        return await e.json()
    }
}
