import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Container, Spinner } from "react-bootstrap";
import axios from 'axios';
import '../../src/App.css';

const Surahs = () => { 
    const [isOn, setIsOn] = useState(true);
    const { id } = useParams();
    const [surah, setSurah] = useState(null);
    const [loading, setLoading] = useState(true);
    const [englishAyah, setEnglishAyah] = useState(null);

    const handleToggle = () => {
        setIsOn(!isOn);
    };

    useEffect(() => {
        axios.get(`https://api.alquran.cloud/v1/surah/${id}`)
            .then((response) => {
                setSurah(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    }, [id]);

    useEffect(() => {
        axios.get(`https://api.alquran.cloud/v1/surah/${id}/en.asad`)
            .then((response) => {
                setEnglishAyah(response.data.data.ayahs);
            })
            .catch((error) => {
                console.error("Error fetching translation:", error);
            });
    }, [id]);

    return (
        loading ? (
            <Spinner animation="border" role="status" style={{ margin: "auto", display: "block" }}>
            </Spinner>
        ) : (
            <Container>
                <h2>Surah {surah?.englishName}</h2>
                <p className='information'>English Name: {surah?.englishName}</p>
                <p>Number of Ayahs: {surah?.numberOfAyahs}</p>
                <button type="button" class="btn btn-outline-primary" onClick={handleToggle} on={isOn}>Translate</button>
                <br /><br />
                <ol>
                    {surah?.ayahs.map((ayah, index) => (
                        <li key={ayah.number}>
                            {ayah.text}
                            {isOn && <br />}
                            {isOn && <span className="text-muted">{englishAyah && englishAyah[index]?.text}</span>}
                        </li>
                    ))}
                </ol>
                <hr />
                <Link to="/">
                    <button type='button' class="btn btn-outline-danger">Back to List</button>
                </Link>
            </Container>
        )
    );
};

export default Surahs;