import "./header.css";
import React, { useState, useMemo, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {saveCityToStorage} from "../previous/components/save/saveCity.ts";

interface Coord { lat: number; lon: number; }
interface City { id: number; name: string; state: string; country: string; coord: Coord; }
interface Props { setCity:  React.Dispatch<React.SetStateAction<{ lat?: number, lon?: number, city?: string }>>; }


const Header = ({ setCity }: Props) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [showResults, setShowResults] = useState(false);

    const [cityData, setCityData] = useState<City[]>([]);
    const [isLoadingData, setIsLoadingData] = useState(false);
    const queryClient = useQueryClient();

    const loadCityData = useCallback(async () => {
        if (cityData.length > 0 || isLoadingData) return;

        setIsLoadingData(true);

        const dataModule = await import("./city.list.json");
        setCityData(dataModule.default);

        setIsLoadingData(false);
        console.log("City data loaded successfully!");
    }, [cityData, isLoadingData]);

    const filteredCities = useMemo(() => {
        if (!searchTerm || cityData.length === 0) {
            return [];
        }
        return cityData.filter(city =>
            city.name.toLowerCase().startsWith(searchTerm.toLowerCase())
        );
    }, [searchTerm, cityData]);

    const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    }, []);

    const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        saveCityToStorage({name: searchTerm})
        setCity({city: searchTerm});
        setShowResults(false);
        queryClient.invalidateQueries({ queryKey: ["weather"] });
    }, [searchTerm, setCity, queryClient]);

    const handleCitySelect = useCallback((cityCoord: Coord, cityName: string) => {
        setSearchTerm(cityName);
        saveCityToStorage({name: cityName, lat: cityCoord.lat, lon: cityCoord.lon});
        setCity({lat: cityCoord.lat, lon: cityCoord.lon});
        setShowResults(false);
        queryClient.invalidateQueries({ queryKey: ["weather"] });
    }, [setCity, queryClient]);

    const handleBlur = useCallback(() => {
        setTimeout(() => setShowResults(false), 200);
    }, []);

    return (
        <header className="Header">
            <div className="Header--wrapper">
                <div className="Logo">
                    <img src="/vite.svg" alt="logo" className={"logo--img"}/>
                    <p>Weather</p>
                </div>
                <form className={"SearchBar"} onSubmit={handleSubmit}>
                    <div className="SearchBar--Input">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            placeholder={"Enter your city"}
                            onFocus={() => {
                                loadCityData();
                                setShowResults(true);
                            }}
                            onBlur={handleBlur}
                            autoComplete="off"
                        />
                        <button type={"submit"}>Submit</button>
                    </div>
                    {showResults && searchTerm && (
                        <div className="Results">
                            {isLoadingData ? (
                                <div className="no-results"><p>Loading cities...</p></div>
                            ) : filteredCities.length > 0 ? (
                                <ul className="results-list">
                                    {filteredCities.map((city) => (
                                        <li key={city.id} className="result-item" onMouseDown={() => handleCitySelect(city.coord, city.name)}>
                                            <p className="city-name">{city.name}</p>
                                            <p className="country-name">{city.country}</p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="no-results">
                                    <p>No cities found.</p>
                                </div>
                            )}
                        </div>
                    )}
                </form>
                <button className="HelpBtn">Help</button>
            </div>
        </header>
    );
}

export default Header;