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
    const [visibleCount, setVisibleCount] = useState(10);

    const handleToggle = () => {
        setIsOn(!isOn);
    };

    const loadMoreAyahs = () => {
        setVisibleCount(visibleCount + 10);
    }

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
                <p className='information'>English Name: {surah?.englishNameTranslation}</p>
                <p>Number of Ayahs: {surah?.numberOfAyahs}</p>
                <div className="form-check form-switch">
                <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    onChange={handleToggle}
                    checked={isOn}
                />
                <label className="form-check-label">
                    {isOn ? "Translate" : "Hide Translation"}
                </label>
                </div>
                <br />
                <ol>
                    {surah?.ayahs.slice(0, visibleCount).map((ayah, index) => (
                        <li key={ayah.number}>
                            {ayah.text}
                            {isOn && <br />}
                            {isOn && <span className="text-muted">{englishAyah && englishAyah[index]?.text}</span>}
                        </li>
                    ))}
                </ol>
                <hr />
                {visibleCount < surah?.ayahs.length && (
                    <button type="button" className="btn btn-outline-primary" onClick={loadMoreAyahs}>
                        Load More
                    </button>
                )}
                <Link to="/">
                    <button type='button' className="btn btn-outline-danger">Back to List</button>
                </Link>
            </Container>
        )
    );
};

export default Surahs;