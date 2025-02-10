import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Container, Table } from "react-bootstrap";

const Surahs = () => { 
    const {id} = useParams();
    const [surah, setSurah] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://api.alquran.cloud/v1/surah/"+id)
        .then((response) => response.json())
        .then((json) => {
            setSurah(json.data);
            setLoading(false);
        })
        .catch((error) => console.error("Error fetching data:", error));
    }, [id]);

    if (loading) {
        <Container className="text-center">
            <h2>Loading...</h2>
        </Container>
    };

    return (
        <Container>
            <h2>Ayahs  {surah?.englishName}</h2>
            <Table striped bordered hover id="myTable">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Ayah</th>
                    </tr>
                </thead>
                <tbody>
                    {surah?.ayahs.map((ayah, index) => (
                        <tr key={ayah.number}>
                            <td>{index + 1}</td>
                            <td>{ayah.text}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <hr />
            <Link to="/">Back to List</Link>
        </Container>
    );
}

export default Surahs;