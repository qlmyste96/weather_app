import axios from "axios";
import {API} from "../../../consts/API.ts";

export interface IWeather {
    base: string;
    clouds: {all: number};
    cod: number;
    dt: number;
    coord: {
        lat: number;
        lon: number;
    }
    id: number;
    main: {
        feels_like: number;
        grnd_level: number;
        humidity: number;
        pressure: number;
        sea_level: number;
        temp: number;
        temp_max: number;
        temp_min: number;
    };
    name: string;
    sys: {
        country: string;
        id: number;
        sunrise: number;
        sunset: number;
        type: number;
    };
    timezone: number;
    visibility: number;
    weather: [{
        description: string;
        icon: string;
        id: number;
        main: string;
    }];
    wind: {
        deg: number;
        speed: number;
    }
}

export const OpenWeatherApi = async (params: { city?: string; lat?: number; lon?: number }, lat?: number, lon?: number): Promise<IWeather> => {
    const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

    const queryParams = {
        units: "metric",
        appid: API,
        ...(params.city
            ? { q: params.city === "" ? "Tallinn" : params.city }
            : { lat: params.lat ? params.lat : lat, lon: params.lon ? params.lon : lon }),
    };

    try {
        return (await axios.get<IWeather>(baseUrl, { params: queryParams })).data;
    } catch (error) {
        console.error("Failed to fetch weather data:", error);
        throw new Error("Could not fetch weather data.");
    }
};