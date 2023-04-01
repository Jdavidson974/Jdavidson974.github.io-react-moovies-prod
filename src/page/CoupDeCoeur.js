import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import Card from '../components/Card';
import FavoriteCard from '../components/FavoriteCard';

const CoupDeCoeur = () => {

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
            <div className="card-container">
                {storage.map((data, index) => <FavoriteCard ids={ids} storage={storage} setIds={setIds} getLocalStorageIds={getLocalStorageIds} setStorage={setStorage} getLocalStorage={getLocalStorage} key={index} data={data} />)}
            </div>
        </div>
    );
};

export default CoupDeCoeur;