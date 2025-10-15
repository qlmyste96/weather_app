import RenderPreviousCities from "./components/RenderPreviousCities.tsx";
import React, {type FC} from "react";

interface Props {
    setCity:  React.Dispatch<React.SetStateAction<{ lat?: number, lon?: number, city?: string }>>;
}

const PreviouslyViewedCities: FC<Props> = ({setCity}) => {
    return (
        <div className="PreviouslyViewedCities">
            <header>
                <p>Previously Viewed</p>
            </header>
            <RenderPreviousCities setCity={setCity}/>
        </div>
    )
}

export default PreviouslyViewedCities;