import "./SavedCities.css";
import RenderCities from "./components/RenderCities.tsx";
import { type FC } from "react";

const SavedCities: FC = () => {
    return (
        <div className="SavedCities">
            <header>
                <p>Saved Cities</p>
            </header>
            <RenderCities/>
        </div>
    );
}

export default SavedCities;