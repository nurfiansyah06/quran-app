import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Table, Pagination } from "react-bootstrap";
import SurahDetail from "./components/Surahs";
import axios from "axios";

const App = () => {
  const [surahs, setSurahs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const surahsPerPage = 10;

  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const response = await axios.get("https://api.alquran.cloud/v1/surah");
        setSurahs(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchSurahs();
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
    <Router>
      <main className="my-5 py-5">
  <Container fluid className="px-3">
    <Routes>
      <Route
        path="/"
        element={
          <>
            <h1 className="display-4 text-center">Quran App</h1>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search Surah"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            <div className="table-responsive">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Arabic Name</th>
                    <th>English Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentSurahs.length > 0 ? (
                    currentSurahs.map((surah, index) => (
                      <tr key={surah.number}>
                        <td>{firstSurahIndex + index + 1}</td>
                        <td>{surah.name}</td>
                        <td>{surah.englishName}</td>
                        <td>
                          <Link to={`/surah/${surah.number}`} className="btn btn-sm btn-primary">
                            View Surah
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center">
                        No surahs available
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>

            <Pagination className="justify-content-center flex-wrap">
              <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
              <Pagination.Prev
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              />

              {[...Array(totalPages).keys()].map((page) => (
                <Pagination.Item
                  key={page + 1}
                  active={page + 1 === currentPage}
                  onClick={() => handlePageChange(page + 1)}
                >
                  {page + 1}
                </Pagination.Item>
              ))}

              <Pagination.Next
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              />
              <Pagination.Last
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
              />
            </Pagination>
          </>
        }
      />
      <Route path="/surah/:id" element={<SurahDetail />} />
    </Routes>
  </Container>
</main>

    </Router>
  );
};

export default App;
