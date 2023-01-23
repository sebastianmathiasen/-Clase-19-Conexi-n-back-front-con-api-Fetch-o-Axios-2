import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
// import useFetch from '../hooks/useFetch';
const BASE_URL = 'http://localhost:3030/api/users'


export default function Data({ title, handleShow, setUserDetails }) {

    console.count("Data component rendered");

    // Sacamos esto porque es mejor practica hacerlo el useFetch
    // const [data, setData] = useState([]);

    // useEffect(() => {
    //     fetch("http://localhost:3030/api/users"
    //         // para no tener error cors, leer documentacion https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    //         //{ mode: "no-cors" }
    //     )
    //         .then(res => res.json())
    //         .then(json => setData(json));
    // });

    // const { data, loading, error } = useFetch("users");
    // console.log(data, loading, error);


    // function handleDelete(id) {
    // fetch(`http://localhost:3030/api/users/${id}`, {
    // method: 'DELETE'
    // });

    const [data, setData] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log(BASE_URL);
        fetch(BASE_URL)
            .then(res => res.json())
            .then(json => {
                setLoading(false);
                setData(json);
            })
            .catch(err => setError(true));
            console.log("data", data);
            console.log("error", error);
            console.log("loading", loading);
            // Abajo los dos corchetes son el array de dependencias, en teoria no deberian renderizar indefinidamente
    }, []);

    function handleDetails(usr) {
        setUserDetails(usr);
        handleShow();
    };

    if (loading) return <h3>Loading...</h3>;
    if (error) return <h3>Error...</h3>;

    return data ?  (
        <div>
            <section>
                <h2 className='component-title'>{title}</h2>
                <ul>
                    {/* Mapeo cada elelmento y lo capturo en la funcion por el id para borrarlo */}
                    {data.map((usr) => <li key={usr.id} onClick={() => handleDetails(usr)}>{usr.fullName}</li>)}
                </ul>
            </section>
        </div>
    ) : null;
}