import React, { useState, useEffect, useCallback, type FC } from 'react';
import UnsaveButton from "./unsave/UnsaveButton.tsx";
import {getCities} from "./get/getCities.ts";

interface Props {
    setCity:  React.Dispatch<React.SetStateAction<{ lat?: number, lon?: number, city?: string }>>;
}

const CityList: FC<Props> = ( {setCity}) => {
    const [cities, setCities] = useState<string[]>(getCities);

    useEffect(() => {
        const handleStorageUpdate = () => {
            setCities(getCities());
        };

        window.addEventListener('storageUpdated', handleStorageUpdate);

        return () => {
            window.removeEventListener('storageUpdated', handleStorageUpdate);
        };
    }, []);

    const handleUnsaveCity = useCallback((nameToRemove: string) => {
        const newList = cities.filter((city) => city !== nameToRemove);
        setCities(newList);
        localStorage.setItem("cities", JSON.stringify(newList));

        window.dispatchEvent(new Event("storageUpdated"));
    }, [cities]);

    return (
        <ul className={"SavedCitiesList"}>
            {cities.map((city) => (
                <li key={city} onClick={() => setCity({city})}>
                    <span>{city}</span>
                    <UnsaveButton name={city} onUnsave={() => handleUnsaveCity(city)} />
                </li>
            ))}
        </ul>
    );
};

export default CityList;