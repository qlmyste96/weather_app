import { useQuery } from "@tanstack/react-query";
import { type IWeather, OpenWeatherApi } from "./request/openWeatherRequest.ts";
import { useEffect, useState } from "react";

export const useGetWeather = (city: { lat?: number, lon?: number, city?: string }): IWeather | undefined => {
    const [coords, setCoords] = useState<{ lat?: number; lon?: number }>({});

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            setCoords({ lat: position.coords.latitude, lon: position.coords.longitude });
        });
    }, []);

    const {data} = useQuery({
        queryKey: ["weather", city, coords],

        queryFn: () => OpenWeatherApi(city, coords.lat, coords.lon),

        enabled: !!(city || (coords.lat && coords.lon)),
    });

    useEffect(() => {
        if (data) {
            document.title = `Weather in ${data.name}`;
        }
    }, [data]);

    return data;
};