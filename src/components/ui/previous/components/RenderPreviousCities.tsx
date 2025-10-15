import type {ICity} from "../interfaces/ICity.ts";
import {loadCitiesFromStorage} from "./load/loadCiies.ts";
import React, {type FC} from "react";

interface Props {
    setCity:  React.Dispatch<React.SetStateAction<{ lat?: number, lon?: number, city?: string }>>;
}

const RenderPreviousCities: FC<Props> = ({setCity}) => {
    const cities: ICity[] = loadCitiesFromStorage();

    return (
        <ul className={"PreviousCitiesList"}>
            {cities.map((cityObj) => (
                <li key={`${cityObj.name}-${cityObj.lat}-${cityObj.lon}`} onClick={() => {
                    if (cityObj.lat !== undefined && cityObj.lon !== undefined) {
                        setCity({lat: cityObj.lat, lon: cityObj.lon})
                    }
                    else {
                        setCity({city: cityObj.name})
                    }
                }}>
                    <span>{cityObj.name}</span>
                </li>
            ))}
        </ul>
    )
}

export default RenderPreviousCities;