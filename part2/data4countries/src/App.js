import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";

function CountryDetails({country}) {
    return (
        <div>
            <h2>{country.name}</h2>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <h3>Languages</h3>
            <ul>
                {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
            </ul>
            <img src={country.flag} alt={'flag'} width={'10%'}/>
        </div>
    )
}

function ShowButton({country}) {
    const [isShowed, setIsShowed] = useState(false);
    return (
        <>
            <p>{country.name} <button onClick={() => setIsShowed(!isShowed)}>Show</button></p>

            {isShowed && <CountryDetails country={country}/> }
        </>
    )
}

function App() {
    const [searchWord, setSearchWord] = useState('');
    const [countries, setCountries] = useState([]);

    const url = 'https://restcountries.eu/rest/v2/all';

    const onChangeWord = (event) => {
        setSearchWord(event.target.value.toLowerCase())
    };

    useEffect(() => {
        axios
            .get(url)
            .then(response => setCountries(response.data))
    }, []);


    const length = () => {
        const matched = countries
            .filter((country) => (country.name.toLowerCase().includes(searchWord)));

        return matched.length;
    }

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
                            <ShowButton  key={filteredC.name} country={filteredC}/>
                        )))}
        </div>
    )
};

export default App;
