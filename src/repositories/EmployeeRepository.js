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
    async addEmployee(employee) {
        const data = await fetch(`${Settings.remoteURL}/employees`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(employee)
        })

        return await data.json()
    },

    async getAll() {
        const e = await fetch(`${Settings.remoteURL}/employees`)
        return await e.json()
    }
}
