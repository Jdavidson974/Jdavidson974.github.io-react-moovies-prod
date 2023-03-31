import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import Card from '../components/Card';

const CoupDeCoeur = () => {

    const getLocalStorage = () => {
        const store = JSON.parse(localStorage.getItem('films'));
        if (store) {

            console.log(JSON.parse(localStorage.getItem('films')));
            return JSON.parse(localStorage.getItem('films'))
        } else {
            return [];
        }
    }
    let [storage, setStorage] = useState(getLocalStorage);

    return (
        <div>
            <NavBar />
            <div className="card-container">
                {storage.map((data, index) => <Card favoriPage={true} setStorage={setStorage} getLocalStorage={getLocalStorage} key={index} data={data} />)}
            </div>
        </div>
    );
};

export default CoupDeCoeur;