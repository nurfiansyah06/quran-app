import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Table } from "react-bootstrap";

const App = () => {
  const [surahs, setSurahs] = useState([]);

  useEffect(() => {
    fetch("https://api.alquran.cloud/v1/surah")
      .then((response) => response.json())
      .then((json) => setSurahs(json.data));
  }, []);

  console.log(surahs.data);

  return (
    <main className="my-5 py-5">
      <Container className="px-0">
        <h1 className="display-4">Quran App</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>English Name</th>
            </tr>
          </thead>
          <tbody>
            {surahs.length > 0 ? (
              surahs.map((name) => (
                <tr key={name.id}>
                  <td>{name.name}</td>
                  <td>{name.englishName}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No files available
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>
    </main>
  );
};

export default App;