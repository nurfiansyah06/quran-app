import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Table } from "react-bootstrap";

const App = () => {
  const searchFile = {
    backgroundPosition: "10px 12px",
    backgroundRepeat: "no-repeat",
    width: "100%",
    fontSize: "16px",
    padding: "12px 20px 12px 40px",
    border: "1px solid #ddd",
    marginBottom: "12px",
  };

  const [surahs, setSurahs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://api.alquran.cloud/v1/surah")
      .then((response) => response.json())
      .then((json) => setSurahs(json.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const filteredSurahs = surahs.filter(
    (surah) =>
      surah.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      surah.englishName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="my-5 py-5">
      <Container className="px-0">
        <h1 className="display-4">Quran App</h1>
        
        <input
          type="text"
          style={searchFile}
          placeholder="Search Surah"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <Table striped bordered hover id="myTable">
          <thead>
            <tr>
              <th>Arabic Name</th>
              <th>English Name</th>
            </tr>
          </thead>
          <tbody>
            {filteredSurahs.length > 0 ? (
              filteredSurahs.map((surah) => (
                <tr key={surah.number}>
                  <td>{surah.name}</td>
                  <td>{surah.englishName}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="text-center">
                  No surahs available
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
