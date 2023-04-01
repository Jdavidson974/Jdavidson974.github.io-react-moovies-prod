
import axios from 'axios';
import React, { useEffect, useState } from 'react';
const FavoriteCard = ({ data, getLocalStorage, storage, setStorage, ids
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

    // FILMS 
    useEffect(fetchDetail, []);
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
            <button onClick={removeToFavori}>Dislike</button>
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

export default FavoriteCard;