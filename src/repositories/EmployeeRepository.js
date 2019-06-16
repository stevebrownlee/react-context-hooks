import Settings from "./Settings"

export default {
    async get(id) {
        const e = await fetch(`${Settings.remoteURL}/employees/${id}`)
        return await e.json()
    },
    async delete(id) {
        const e = await fetch(`${Settings.remoteURL}/employees/${id}`, {
            method: "DELETE"
        })
        return await e.json()
    },
    async getAll() {
        const e = await fetch(`${Settings.remoteURL}/employees`)
        return await e.json()
    }
}
