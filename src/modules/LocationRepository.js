import Settings from "./Settings";

export default {
  get(id) {
    return fetch(`${Settings.remoteURL}/locations/${id}`).then(e => e.json());
  },
  delete(id) {
    return fetch(`${Settings.remoteURL}/locations/${id}`, {
      method: "DELETE"
    }).then(e => e.json());
  },

  getAll() {
    return fetch(`${Settings.remoteURL}/locations`).then(e => e.json());
  }
};
