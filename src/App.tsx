import {useState} from "react";
import './App.css'
import ViewData from "./components/ui/ViewData.tsx";
import Header from "./components/ui/header/Header.tsx";
import SavedCities from "./components/ui/saved/SavedCities.tsx";
import PreviouslyViewedCities from "./components/ui/previous/PreviouslyViewedCities.tsx";

function App() {
    const [cityCoords, setCityCoords] = useState<{ lat?: number; lon?: number, city?: string }>({city: "Tallinn"});

    return (
        <>
            <Header setCity={setCityCoords}/>
            <main>
                <ViewData city={cityCoords} />
                <div className="Bottom">
                    <SavedCities setCity={setCityCoords}/>
                    <PreviouslyViewedCities setCity={setCityCoords}/>
                </div>
            </main>
            <footer>Made by Leonid Romanenko</footer>
        </>
  )
}

export default App;
