import type {ICity} from "../../interfaces/ICity.ts";

export function loadCitiesFromStorage(): ICity[] {
    const savedCities = localStorage.getItem("previous");

    if (!savedCities) {
        return [];
    }

    try {
        const cities: ICity[] = JSON.parse(savedCities);
        return Array.isArray(cities) ? cities : [];
    } catch (error) {
        console.error("Failed to parse cities from localStorage:", error);
        return [];
    }
}