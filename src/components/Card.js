import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Card = ({ data, getLocalStorage, setStorage, favoriPage }) => {
    const apiKey = "9f44a50a5ee63c57193c6bee26e427bd";
    const imgUrl = "https://image.tmdb.org/t/p/w500/";
    const date = new Date(data.release_date)
    const moovieId = data.id;
    let [genre, setGenre] = useState([]);
    const fetchDetail = () => {
        axios.get("https://api.themoviedb.org/3/movie/" + moovieId + "?api_key=" + apiKey).then(
            detailFilm => {
                if (detailFilm) {
                    setGenre(detailFilm.data.genres);
                } else {
                    setGenre([]);
                }

            }
        )
    }
    // GET ON LOCALSTORAGE ID 
    const getLocalStorageIds = () => {
        const store = JSON.parse(localStorage.getItem('ids'));
        if (store) {
            return store;
        } else {
            return [];
        }
    }
    // GET ON LOCALSTORAGE FILMS
    const getLocalStorageFilms = () => {
        const store = JSON.parse(localStorage.getItem('films'));
        if (store) {
            return store;
        } else {
            return [];
        }
    }
    // IDS 
    let [ids, setIds] = useState(getLocalStorageIds)
    // FILMS 
    let [films, setFilms] = useState(getLocalStorageFilms)
    useEffect(fetchDetail, []);

    const addToFavori = () => {
        // localStorage.setItem('films', [JSON.stringify(data)]);
        const storage = localStorage.getItem("films");
        const storeIds = JSON.parse(localStorage.getItem("ids"));
        if (storage) {
            const store = JSON.parse(storage);
            const exist = store.find(item => item.id == data.id);
            if (!exist) {
                store.push(data);
                localStorage.setItem('films', JSON.stringify(store));
                storeIds.push(data.id)
                localStorage.setItem("ids", JSON.stringify(storeIds))
                setFilms(getLocalStorageFilms());
                setIds(getLocalStorageIds());
            } else {
                //desactiver le like
            }
        } else {
            localStorage.setItem('films', JSON.stringify([data]));
            localStorage.setItem('ids', JSON.stringify([data.id]));
            setFilms(getLocalStorageFilms());
            setIds(getLocalStorageIds());
        }
        console.log(films);
        console.log(ids);
    }
    const removeToFavori = () => {
        // CHANGER LA VALEUR DANS LE LOCAL STORAGE POUR LID ET LOBJET 
        // LANCER LE GET STORAGE 
        // const newIds = ids.filter(id => id != data.id);
        // const newFilms = films.filter(film => film.id != data.id);
        // localStorage.setItem('ids', JSON.stringify(newIds));
        // localStorage.setItem('films', JSON.stringify(newFilms));
        // setFilms(getLocalStorageFilms());
        // setIds(getLocalStorageIds());
        // if (favoriPage) {
        //     setStorage(getLocalStorage());
        // }

        // const newIdsArray = ids.map((item, index) => {
        //     if (item == data.id) {
        //         // console.log(item, index);
        //         // console.log(films, ids);
        //         // setIds(ids.splice(index, 1));
        //         // setFilms(films.splice(index, 1));
        //         // localStorage.setItem('films', JSON.stringify(films));
        //         // localStorage.setItem('ids', JSON.stringify(ids));
        //         // setFilms(getLocalStorageFilms());
        //         // setIds(getLocalStorageIds());
        //         // console.log(films, ids);
        //         if (favoriPage) {
        //             setStorage(getLocalStorage())
        //         }
        //         return
        //     } else {
        //         return
        //     }

        // });
        // console.log(ids);

    }
    return (
        <div className='moovie-card'>

            {/* IMG  */}
            <div className='img-container'>
                <img src={data.poster_path ? imgUrl + data.poster_path : 'affiche.webp'} />
            </div>
            {ids.find(item => item == data.id) ? <button onClick={removeToFavori}>Dislike</button> : <button onClick={addToFavori}>Like</button>}
            <div className="info-content">
                {/* date  */}
                <div>
                    Sortit le : <b>{data.release_date ? date.toLocaleDateString("fr") : "Date inconu"}</b>
                </div>
                <div>
                    {/* rate  */}
                    Voté <b>{data.vote_average.toFixed(2)}/10</b>
                </div>
                <div>
                    <ul>
                        {genre.map((item, index) => <li key={index}>{item.name}</li>)}
                    </ul>
                    {/* genres  */}
                </div>
                <div className='synopsis'>
                    {/* synopsis  */}
                    {data.overview}
                </div>
            </div>

        </div>
    );
};

export default Card;