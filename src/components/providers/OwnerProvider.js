import React, { useState, useEffect } from 'react';
import OwnerRepository from "../../repositories/OwnerRepository"

export const OwnerContext = React.createContext()

export const OwnerProvider = props => {
    const [owners, setOwners] = useState([]);
    const createAccount = user => OwnerRepository.createAccount(user)

    useEffect(() => {
        OwnerRepository.getAll()
        .then(packet => {
            if (packet.tokenStatus === "valid") {
                return packet.data
            }
            "history" in props && props.history.push("/login")
        })
        .then(setOwners)
    }, [])

    return (
        <OwnerContext.Provider value={{ owners, createAccount }}>
            {props.children}
        </OwnerContext.Provider>
    )
}
