import axios from "axios";
import React, { useEffect, useState } from "react";
import { Tab, Col, Nav, Row } from "react-bootstrap";
import Swal from "sweetalert2";

function Adminscreen() {
  useEffect(() => {
    const pengguna = JSON.parse(localStorage.getItem("pengguna"));
    if (!pengguna || !pengguna.isAdmin) {
      window.location.href = "/home";
    }
  }, []);

  return (
    <div className="tampilanadmin m-3">
      <Tab.Container id="left-tabs-example" defaultActiveKey="laporan">
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <h2>
                <b>Admin Panel</b>
              </h2>
              <Nav.Item>
                <Nav.Link eventKey="dashboard">Dashboard</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="laporan">Laporan</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="dashboard"></Tab.Pane>
              <Tab.Pane eventKey="laporan">
                <Pengaduans />
                <Keluhans />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
}

export default Adminscreen;

export function Pengaduans() {
  const [keluhans, setkeluhans] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(5);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/keluhans/getallkeluhans");
      setkeluhans(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastKeluhan = currentPage * perPage;
  const indexOfFirstKeluhan = indexOfLastKeluhan - perPage;
  const currentKeluhans = keluhans.slice(
    indexOfFirstKeluhan,
    indexOfLastKeluhan
  );

  return (
    <div className="row">
      <div className="col-md-12">
        <h1>Semua Laporan</h1>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Warga</th>
              <th>Judul Pengaduan</th>
              <th>Alasan Ditolak</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentKeluhans.map((keluhan, index) => {
              let statusClass = "";
              switch (keluhan.status) {
                case "Pending":
                  statusClass = "status-pending";
                  break;
                case "Diterima":
                  statusClass = "status-diterima";
                  break;
                case "Ditolak":
                  statusClass = "status-ditolak";
                  break;
                default:
                  break;
              }
              return (
                <tr key={keluhan._id}>
                  <td>{index + indexOfFirstKeluhan + 1}</td>
                  <td>{keluhan.namawarga}</td>
                  <td>{keluhan.judulpengaduan}</td>
                  <td>{keluhan.alasanPenolakan}</td>
                  <td className={statusClass}>{keluhan.status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Pagination
          currentPage={currentPage}
          perPage={perPage}
          totalKeluhans={keluhans.length}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );

  function Pagination({ currentPage, perPage, totalKeluhans, onPageChange }) {
    const pageNumbers = Math.ceil(totalKeluhans / perPage);

    return (
      <nav>
        <ul className="pagination">
          {Array.from({ length: pageNumbers }, (_, i) => i + 1).map(
            (pageNumber) => (
              <li
                key={pageNumber}
                className={`page-item${
                  currentPage === pageNumber ? " active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => onPageChange(pageNumber)}
                >
                  {pageNumber}
                </button>
              </li>
            )
          )}
        </ul>
      </nav>
    );
  }
}

export function Keluhans() {
  const [keluhans, setkeluhans] = useState([]);
  const [alasanPenolakan, setAlasanPenolakan] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    (async () => {
      try {
        const data = await (await axios.get("/api/keluhans/getallkeluhans"))
          .data;
        setkeluhans(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  async function terimaKeluhan(keluhanid) {
    try {
      const result = await (
        await axios.post("/api/keluhans/terimakeluhan", {
          keluhanid,
        })
      ).data;
      console.log(result);
      Swal.fire("Okay", "Keluhan Diterima", "success").then((result) => {
        window.location.reload();
      });
    } catch (error) {
      console.log(error);
      Swal.fire("Oops", "Something went wrong", "error");
    }
  }

  async function tolakKeluhan(keluhanid) {
    try {
      const result = await Swal.fire({
        title: "Alasan Penolakan",
        input: "textarea",
        inputPlaceholder: "Masukkan alasan penolakan",
        showCancelButton: true,
        confirmButtonText: "Tolak",
        cancelButtonText: "Batal",
        showLoaderOnConfirm: true,
        preConfirm: (alasan) => {
          return axios
            .post("/api/keluhans/tolakkeluhan", {
              keluhanid,
              alasanPenolakan: alasan,
            })
            .then((response) => {
              if (response.data === "Keluhan ditolak") {
                Swal.fire(
                  "Okay",
                  "Keluhan Ditolak dengan alasan : \n " + alasan,
                  "success"
                ).then((result) => {
                  window.location.reload();
                });
              } else {
                Swal.fire("Oops", "Something went wrong", "error");
              }
            })
            .catch((error) => {
              Swal.fire("Oops", "Something went wrong", "error");
            });
        },
        allowOutsideClick: () => !Swal.isLoading(),
      });

      if (result.isDismissed) {
        return;
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Oops", "Something went wrong", "error");
    }
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = keluhans.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="row">
      <div className="col-md-12">
        <h1>Laporan Masuk</h1>

        <table className="table table-bordered ">
          <thead className="">
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Kategori</th>
              <th>Judul Pengaduan</th>
              <th>Isi Pengaduan</th>
              <th>Tanggal</th>
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((keluhan, index) => (
                <tr key={keluhan._id}>
                  <td>{index + indexOfFirstItem + 1}</td>
                  <td>{keluhan.namawarga}</td>
                  <td className="col-2">{keluhan.kategori}</td>
                  <td>{keluhan.judulpengaduan}</td>
                  <td>{keluhan.isipengaduan}</td>
                  <td>
                    {new Date(keluhan.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                    })}
                  </td>

                  <td className="col-1">
                    {keluhan.status !== "pending" && (
                      <button
                        className="terimakeluhan btn-success"
                        onClick={() => terimaKeluhan(keluhan._id)}
                      >
                        Terima
                      </button>
                    )}
                    {keluhan.status !== "pending" && (
                      <button
                        className="tolakkeluhan btn-danger"
                        onClick={() => tolakKeluhan(keluhan._id)}
                      >
                        Tolak
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">Tidak ada keluhan yang tersedia.</td>
              </tr>
            )}
          </tbody>
        </table>

        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={keluhans.length}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );

  function Pagination({ currentPage, itemsPerPage, totalItems, onPageChange }) {
    const pageNumbers = Math.ceil(totalItems / itemsPerPage);

    return (
      <nav>
        <ul className="pagination">
          {Array.from({ length: pageNumbers }, (_, i) => i + 1).map(
            (pageNumber) => (
              <li
                key={pageNumber}
                className={`page-item${
                  currentPage === pageNumber ? " active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => onPageChange(pageNumber)}
                >
                  {pageNumber}
                </button>
              </li>
            )
          )}
        </ul>
      </nav>
    );
  }
}
