export function saveCityToStorage(newCity: string) {
    const savedCities = localStorage.getItem("cities");
    const cities = savedCities ? JSON.parse(savedCities) : [];

    if (!cities.includes(newCity)) {
        const newList = [...cities, newCity];
        localStorage.setItem("cities", JSON.stringify(newList));

        window.dispatchEvent(new Event("storageUpdated"));
    }
}