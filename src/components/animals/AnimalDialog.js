import React from "react"

export const AnimalDialog = ({toggleDialog, animal}) => {
    return (
        <dialog id="dialog--animal" className="dialog--animal">
            <h2 style={{ marginBottom: "1.3em" }}>Medical History for {animal.name}</h2>
            {
                animal.treatments.map(t => (
                    <div key={t.id}>
                        <h4>{new Date(t.timestamp).toLocaleDateString("en-US")}</h4>
                        <p>{t.description}</p>
                    </div>
                ))
            }
            <button style={{
                position: "absolute",
                top: "1em",
                right: "2em"
            }}
                id="closeBtn"
                onClick={toggleDialog}>close</button>
        </dialog>
    )
}
