import React, { useState, useEffect, use } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Container, Spinner, Table } from "react-bootstrap";
import axios from 'axios';

const Surahs = () => { 
    const {id} = useParams();
    const [surah, setSurah] = useState(null);
    const [loading, setLoading] = useState(true);
    const [englishAyah, setEnglistAyah] = useState(null);

    useEffect(() => {
        axios
          .get(`https://api.alquran.cloud/v1/surah/${id}`)
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
        axios
        .get(`https://api.alquran.cloud/v1/surah/${id}/en.asad`)
        .then((response) => {
            setEnglistAyah(response.data.data.ayahs);
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
    }, [surah]);

    return (
        loading ? <Spinner animation="border" role="status" style={{ margin: "auto", display: "block" }}>
            <span className="sr-only"></span>
        </Spinner> :
        <><Container>
            <h2>Ayahs  {surah?.englishName}</h2>
            <Table striped bordered hover id="myTable">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Ayah</th>
                        <th>Translate</th>
                    </tr>
                </thead>
                <tbody>
                    {surah?.ayahs.map((ayah, index) => (
                        <tr key={ayah.number}>
                            <td>{index + 1}</td>
                            <td>{ayah.text}</td>
                            <td>{englishAyah && englishAyah[index]?.text}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <hr />
            <Link to="/">Back to List</Link>
        </Container></>
    );
}

export default Surahs;