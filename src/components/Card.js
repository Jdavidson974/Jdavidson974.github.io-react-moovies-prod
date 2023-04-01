import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Card = ({ data, getLocalStorage, storage, setStorage, ids
    , setIds
    , getLocalStorageIds }) => {
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
    useEffect(fetchDetail, []);
    const addToFavori = () => {
        // localStorage.setItem('films', [JSON.stringify(data)]);
        if (storage) {
            const exist = storage.find(item => item.id == data.id);
            if (!exist) {
                storage.push(data);
                localStorage.setItem('films', JSON.stringify(storage));
                ids.push(data.id);
                localStorage.setItem("ids", JSON.stringify(ids))
                setStorage(getLocalStorage());
                setIds(getLocalStorageIds());
            } else {
                //desactiver le like
            }
        } else {
            localStorage.setItem('films', JSON.stringify([data]));
            localStorage.setItem('ids', JSON.stringify([data.id]));
            setStorage(getLocalStorage());
            setIds(getLocalStorageIds());
        }

    }
    const removeToFavori = () => {
        // CHANGER LA VALEUR DANS LE LOCAL STORAGE POUR LID ET LOBJET 
        // LANCER LE GET STORAGE 
        console.log(data.id);
        const newIds = ids.filter(id => id != data.id);
        const newFilms = storage.filter(film => film.id != data.id);
        if (newFilms && newIds) {
            localStorage.setItem('ids', JSON.stringify(newIds));
            localStorage.setItem('films', JSON.stringify(newFilms));
            setIds(getLocalStorageIds());
            //Faire en sorte de reset la data
            setStorage([]);
            setStorage(getLocalStorage());

        } else {
            setStorage([]);
            setIds([]);
        }
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