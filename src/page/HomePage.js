import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import NavBar from '../components/NavBar';
const HomePage = () => {
    const apiKey = "9f44a50a5ee63c57193c6bee26e427bd";
    let [moovies, setMoovies] = useState([]);
    let [inputText, setInputText] = useState('');
    const fetchData = (page = 1, search = "e") => {
        axios.get('https://api.themoviedb.org/3/search/movie?api_key=' + apiKey + '&query=' + search + '&language=fr-FR&page=' + page).then(
            data => {
                if (data) {
                    setMoovies(data.data.results
                    );
                } else {
                    setMoovies([]);
                }
            }
        );
    }
    useEffect(fetchData, [])
    const search = () => {
        fetchData(1, inputText);
    }
    return (
        <div>
            <NavBar />
            <div className='header'>
                REACT MOOVIES
            </div>
            <div className='search'>
                <input type="text" onChange={e => setInputText(e.target.value)} />
                <button onClick={search}>Rechercher</button>
            </div>
            <div className="card-container">
                {moovies.map((moovie, index) => <Card key={index} data={moovie} />)}
            </div>
        </div>
    );
};

export default HomePage;