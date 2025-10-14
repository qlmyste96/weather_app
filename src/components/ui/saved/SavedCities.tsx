import "./SavedCities.css";
import RenderCities from "./components/RenderCities.tsx";
import React, { type FC } from "react";

interface Props {
    setCity:  React.Dispatch<React.SetStateAction<{ lat?: number, lon?: number, city?: string }>>;
}

const SavedCities: FC<Props> = ({setCity}) => {
    return (
        <div className="SavedCities">
            <header>
                <p>Saved Cities</p>
            </header>
            <RenderCities setCity={setCity}/>
        </div>
    );
}

export default SavedCities;