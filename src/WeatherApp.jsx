import React, { useState,useEffect } from "react";
import "./weatherApp.css";
let WeatherApi=()=>{
    let api={
        base:"https://api.openweathermap.org/data/2.5/weather",
        key:'ddc3fe2356a1f7a2c7655d6937e58217',
    };
    let [weathers,setWeather]=useState({});
    let [search,setSearch]=useState("");
    let [loading, setLoading] = useState(false);
    let [hasSearched, setHasSearched] = useState(false);
    let searchWeather= ()=>{
        setLoading(true);
         setTimeout(()=>{
            fetch(`${api.base}?q=${search}&appid=${api.key}&units=metric`)
            .then(res=>res.json())
            .then(data=>{
            setWeather(data)
            setHasSearched(true);
        })
        .catch(err=>console.log(err))
        // console.log(weather);
        setLoading(false);
        },2000);
        setSearch("");
    }
    console.log(weathers);
    // console.log(weathers.weather[0].main);
    function dynamicImage() {
        if (weathers.weather && weathers.weather[0].main) {
            let climate = weathers.weather[0].main;
            switch (climate) {
                case "Clouds":
                    document.body.style.backgroundImage = `url('cloudy.webp')`;
                    document.body.style.transition=`all 0.5s`;
                    break;
                case "Haze":
                    document.body.style.backgroundImage = `url('haze.gif')`;
                    document.body.style.transition=`all 0.5s`;
                    break;
                case "Rain":
                    document.body.style.backgroundImage = `url('https://media.tenor.com/wSSZxkwnV3MAAAAC/rain-weather.gif')`;
                    document.body.style.transition=`all 0.5s`;
                    break;
                case "Sunny":
                    document.body.style.backgroundImage = `url('sunset.jpg')`;
                    document.body.style.transition=`all 0.5s`;
                    break;
            }
        }
    }

    useEffect(() => {
        dynamicImage();
    }, [weathers]);
    

    
    return(
        <>
        <div className="app">
            <h1>Welcome to weather App</h1>
            <div className="main">
                <div className="innerDiv">
                    <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)} />
                    <button onClick={searchWeather}>Search Weather</button>
                    {loading ? (
                            <h1>
                                <img src="loading.gif" alt="Loading" />
                            </h1>
                        ) : hasSearched && weathers.main ? (
                            <div id="details">
                                <div className="detail-box">
                                    <h1>{weathers.main.temp}°C</h1>
                                    <p>Temperature</p>
                                </div>
                                <div className="detail-box">
                                    <h1>{weathers.main.feels_like}°C</h1>
                                    <p>Feels Like</p>
                                </div>
                                <div className="detail-box">
                                    <h1>{weathers.main.humidity}%</h1>
                                    <p>Humidity</p>
                                </div>
                                <div className="detail-box">
                                    <h1>{weathers.wind.speed} MPH</h1>
                                    <p>Wind Speed</p>
                                </div>
                                <div className="detail-box">
                                    <h1>{new Date().toLocaleDateString()} </h1>
                                </div>
                                <div className="detail-box">
                                    <h2>{new Date().toLocaleTimeString()} </h2>
                                </div>
                            </div>
                        ) : hasSearched ? (
                            <h1>Data Not Found</h1>
                        ) : null}
                </div>
            </div>
        </div>
        </>
        
    )
}
export default WeatherApi;