"use client";
import { useState, useEffect } from 'react';
import axios from "axios";

export default function Test () {

    const [resData, setResData] = useState('')
    
    const getData = async () => {
        const { data } = await axios.get( `http://local.io:3000`);

        if (data) {
            setResData(data); // assuming data is a string;
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <main className="text-center text-gray-200">
            { resData }
        </main>
    )
}
