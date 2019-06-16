import Settings from "./Settings"

export default {
    async get(id) {
        const e = await fetch(`${Settings.remoteURL}/owners/${id}`)
        return await e.json()
    },
    async delete(id) {
        const e = await fetch(`${Settings.remoteURL}/owners/${id}`, {
            method: "DELETE"
        })
        return await e.json()
    },
    async getAll() {
        const e = await fetch(`${Settings.remoteURL}/owners`)
        return await e.json()
    }
}