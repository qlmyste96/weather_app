export const getCities = () => {
    const localCities = localStorage.getItem("cities");
    try {
        return localCities ? JSON.parse(localCities) : [];
    } catch (error) {
        console.error("Error parsing cities from localStorage:", error);
        return [];
    }
};