import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Table, Pagination } from "react-bootstrap";

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
  const [currentPage, setCurrentPage] = useState(1);
  const surahsPerPage = 10;

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

  const lastSurahIndex = currentPage * surahsPerPage;
  const firstSurahIndex = lastSurahIndex - surahsPerPage;
  const currentSurahs = filteredSurahs.slice(firstSurahIndex, lastSurahIndex);

  const totalPages = Math.ceil(filteredSurahs.length / surahsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <main className="my-5 py-5">
      <Container className="px-0">
        <h1 className="display-4">Quran App</h1>
        
        <input
          type="text"
          style={searchFile}
          placeholder="Search Surah"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
        
        <Table striped bordered hover id="myTable">
          <thead>
            <tr>
              <th>Arabic Name</th>
              <th>English Name</th>
            </tr>
          </thead>
          <tbody>
            {currentSurahs.length > 0 ? (
              currentSurahs.map((surah) => (
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

        <Pagination className="justify-content-center">
          <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
          <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
          
          {[...Array(totalPages).keys()].map((page) => (
            <Pagination.Item
              key={page + 1}
              active={page + 1 === currentPage}
              onClick={() => handlePageChange(page + 1)}
            >
              {page + 1}
            </Pagination.Item>
          ))}

          <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
          <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
        </Pagination>
      </Container>
    </main>
  );
};

export default App;
