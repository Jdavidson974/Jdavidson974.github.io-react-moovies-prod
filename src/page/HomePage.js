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
    const getLocalStorage = () => {
        const store = JSON.parse(localStorage.getItem('films'));
        if (store) {
            console.log(store);
            return JSON.parse(localStorage.getItem('films'))
        } else {
            return [];
        }
    }
    let [storage, setStorage] = useState(getLocalStorage);

    // GET ON LOCALSTORAGE ID 
    const getLocalStorageIds = () => {
        const store = JSON.parse(localStorage.getItem('ids'));
        console.log("ids", store);
        if (store && store.length) {
            return store;
        } else {
            localStorage.clear();
            return [];
        }
    }
    // IDS 
    let [ids, setIds] = useState(getLocalStorageIds)
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
                {moovies.map((moovie, index) => <Card ids={ids} storage={storage} setIds={setIds} getLocalStorageIds={getLocalStorageIds} setStorage={setStorage} getLocalStorage={getLocalStorage} key={index} data={moovie} />)}
            </div>
        </div>
    );
};

export default HomePage;