import { useGetWeather } from "../API/useGetWeather.ts";
import "./ViewData.css";
import { StarSVG } from "../assets/starSVG.tsx";
import { useEffect, useState, useCallback } from "react";
import { getCities } from "./saved/components/get/getCities.ts";

interface Props {
    city: { lat?: number, lon?: number, city?: string };
}

function ViewData({ city }: Props) {
    const {data, isError} = useGetWeather(city);
    const [checked, setChecked] = useState<boolean>(false);

    useEffect(() => {
        if (data?.name) {
            const savedCities = getCities();
            setChecked(savedCities.includes(data.name));
        }
    }, [data]);

    const handleToggleSave = useCallback(() => {
        if (!data?.name) return;

        const newCheckedState = !checked;
        setChecked(newCheckedState);

        const cities = getCities();
        const citySet = new Set(cities);

        if (newCheckedState) {
            citySet.add(data.name);
        } else {
            citySet.delete(data.name);
        }

        localStorage.setItem("cities", JSON.stringify([...citySet]));
        window.dispatchEvent(new Event("storageUpdated"));

    }, [checked, data]);

    if(isError) {
        return <div className="viewData"><h2>Error fetching data. Please try again.</h2></div>;
    }

    return (
        <div className="viewData">
            <h2>
                {data?.name}, {data?.sys.country}
                <button onClick={handleToggleSave}>
                    <StarSVG fill={checked ? "yellow" : "none"} />
                </button>
            </h2>
            <div className="viewData--box">
                <div className="left">
                    <div className="CurrentTemperature">
                        <img src={`http://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png`} alt={data?.weather[0].description} />
                        <p>{data?.main.temp.toFixed()}°C</p>
                    </div>
                    <div className="FeelsLikeAndWeather">
                        <p>Feels like {data?.main.feels_like.toFixed()}°C</p>
                        <p>{data?.weather[0].main}</p>
                    </div>
                </div>
                <div className="right">
                    <p>Max temp: {data?.main.temp_max.toFixed()}°C</p>
                    <p>Min temp: {data?.main.temp_min.toFixed()}°C</p>
                    <p>Pressure: {data?.main.pressure.toFixed()}hPa</p>
                    <p>Wind: {data?.wind?.speed ? (data.wind.speed * 3.6).toFixed() : ""}km/h</p>
                </div>
            </div>
        </div>
    );
}

export default ViewData;