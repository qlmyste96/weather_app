import type {ICity} from "../../interfaces/ICity.ts";

const MAX_CITIES_IN_STORAGE = 15;


export function saveCityToStorage(newCity: ICity) {
    if (!newCity.name && (newCity.lat === undefined || newCity.lon === undefined)) {
        return;
    }

    const savedCitiesJSON = localStorage.getItem("previous");
    const currentCities: ICity[] = savedCitiesJSON ? JSON.parse(savedCitiesJSON) : [];

    const cityExists = currentCities.some(city =>
        (newCity.lat !== undefined && newCity.lon !== undefined)
            ? (city.lat === newCity.lat && city.lon === newCity.lon)
            : (city.name === newCity.name)
    );

    if (cityExists) {
        return;
    }

    const baseCities = currentCities.length >= MAX_CITIES_IN_STORAGE
        ? currentCities.slice(1)
        : currentCities;

    const newList = [...baseCities, newCity];

    localStorage.setItem("previous", JSON.stringify(newList));
    window.dispatchEvent(new Event("storageUpdated"));
}