import { useEffect, useState } from "react";

const BASE_URL = "http://localhost:3030/api/";

export default function useFetch(endpoint) {

    const [state, setState] = useState({
        loading: true,
        data: [],
        error: false
    });

    const getData = async (endpoint) => {
        try {
            const res = await fetch(BASE_URL + endpoint);
            const json = await res.json();
            setTimeout(() => {
                setState({
                    ...state,
                    loading: false,
                    data: json
                }, 2000); // simular una consulta async que pueda demorar
            })

        } catch (error) {
            setTimeout(() => {
                setState({
                    ...state,
                    loading: false,
                    error: true
                });
            }, 4000);
        }
    };
    useEffect(() => {
        getData(endpoint)
    }, [endpoint]);
    return state;
}