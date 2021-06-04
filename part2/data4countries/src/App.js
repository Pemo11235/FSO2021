import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";

function CountryDetails({country}) {
    return (
        <div>            .finally(() => setReady(true))

            <h2>{country.name}</h2>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <h3>Languages</h3>
            <ul>
                {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
            </ul>
            <img src={country.flag} alt={'flag'} width={'10%'}/>
            <Weather capital={country.capital}/>
        </div>
    )
}

function ShowButton({country}) {
    const [isShowed, setIsShowed] = useState(false);
    return (
        <>
            <p>{country.name}
                <button onClick={() => setIsShowed(!isShowed)}>Show</button>
            </p>

            {isShowed && <CountryDetails country={country}/>}
        </>
    )
}

function Weather({capital}) {
    const [weather, setWeather] = useState(null);

    const api_key = process.env.REACT_APP_API_KEY;
    const urlWeather = 'http://api.weatherstack.com/current' +
        '?access_key=' + api_key +
        '&query=' + capital;

    useEffect(() => {
        axios
            .get(urlWeather)
            .then(response => setWeather(response.data.current))
    }, [urlWeather]);


    return (
        <div>
            {weather && (
                <>
                    <h2>Weather in {capital}</h2>
                    <p><b>Temperature: {weather.temperature} Celsius</b></p>
                    <img src={weather.weather_icons} alt={weather}/>
                    <p><b>Wind:</b>{weather.wind_speed} mph direction {weather.wind_dir}</p>
                </>
            )}
        </div>
    )
}

function App() {
    const [searchWord, setSearchWord] = useState('');
    const [countries, setCountries] = useState([]);

    const url = 'https://restcountries.eu/rest/v2/all';

    const onChangeWord = (event) => {
        setSearchWord(event.target.value.toLowerCase())
    };

    const length = () => {
        const matched = countries
            .filter((country) => (country.name.toLowerCase().includes(searchWord)));

        return matched.length;
    }

    useEffect(() => {
        axios
            .get(url)
            .then(response => setCountries(response.data))
    }, []);

    return (
        <div>
            <p>Find countries </p>
            <input value={searchWord} onChange={onChangeWord}/>
            {length() > 10
                ? <p>Too many matches, specify another filter!</p>
                : (length() === 1
                    ? (countries.filter(country => country.name.toLowerCase().includes(searchWord))
                        .map(filteredC => <CountryDetails key={filteredC.name} country={filteredC}/>))
                    : (countries.filter(country => country.name.toLowerCase().includes(searchWord))
                        .map(filteredC =>
                            <ShowButton key={filteredC.name} country={filteredC}/>
                        )))}
        </div>
    )
}

export default App;
