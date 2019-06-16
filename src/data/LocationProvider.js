import React, { useState, useEffect } from 'react';
import { fetchIt } from './Fetch';

// The context is imported and used by individual components that need data
export const LocationContext = React.createContext([{}, () => {}])


/*
 This component establishes what data can be used.
 */
export const LocationProvider = props => {
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        fetchIt("http://localhost:5002/locations").then(setLocations)
    }, [])

    return (
        <LocationContext.Provider value={{locations, setLocations}}>
            {props.children}
        </LocationContext.Provider>
    )
}

