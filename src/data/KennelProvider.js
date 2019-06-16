import React, { useState, useEffect } from 'react';
import { fetchIt } from './Fetch';

export const KennelContext = React.createContext([{}, () => {}])

export const KennelProvider = props => {
    const [animals, setAnimals] = useState([]);

    useEffect(() => {
        fetchIt("http://localhost:5002/animals").then(setAnimals)
    }, [])

    return (
        <KennelContext.Provider value={[animals, setAnimals]}>
            {props.children}
        </KennelContext.Provider>
    )
}

