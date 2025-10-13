export interface City {
    id?: number;
    name?: string;
    state?: string;
    country?: string;
    coord?: {
        lat?: number;
        lon?: number;
    }
}
export const getSavedCities = (): City[] => {
    try {
        const savedCitiesJSON = localStorage.getItem('cities');
        if (savedCitiesJSON) {
            return JSON.parse(savedCitiesJSON) as City[];
        }
    } catch (error) {
        console.error("Failed to parse saved cities:", error);
        return [];
    }
    return [];
}
