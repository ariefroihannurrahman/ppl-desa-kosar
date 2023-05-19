import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { Card, Button, Modal, Container, Col, Row } from "react-bootstrap";
import { IoArrowBackOutline } from "react-icons/io5";

function DetailKeluhan({ match }) {
  const [keluhan, setkeluhan] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const { keluhanid } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const data = (
          await axios.post("/api/keluhans/getkeluhanbyid", {
            keluhanid,
          })
        ).data;
        setkeluhan(data);
      } catch (err) {}
    })();
  }, []);

  const handleModal = () => {
    setShowModal(!showModal);
  };

  let statusClass = "";
  let backgroundColor = "";
  let textColor = "";

  if (keluhan && keluhan.status) {
    switch (keluhan.status) {
      case "Pending":
        statusClass = "status-pending";
        break;
      case "Diterima":
        statusClass = "status-diterima";
        backgroundColor = "#14bd96";
        textColor = "white";
        break;
      case "Ditolak":
        statusClass = "status-ditolak";
        backgroundColor = "#f12b2c";
        textColor = "white";
        break;
      default:
        break;
    }
  }

  return (
    <div className="container">
      <div className="header">
        <div className="backbutton">
          <Link to="/home">
            <IoArrowBackOutline size={30} color="white" />
          </Link>
        </div>
        <div className="juduldetailpengaduan">
          <h1>Detail Pengaduan</h1>
        </div>
      </div>

      <div className="tampilanhome row justify-content-around bs m-5">
        <div className="col">
          {keluhan ? (
            <>
              <Container>
                <Row className="text-center">
                  <Col style={{ borderRight: "1px solid black" }} xs={4}>
                    <strong>Pengirim</strong> <br></br> {keluhan.namawarga}
                  </Col>
                  <Col style={{ borderRight: "1px solid black" }} xs={4}>
                    <strong>Kategori</strong> <br></br> {keluhan.kategori}
                  </Col>
                  <Col xs={4}>
                    <strong>Status</strong> <br></br>
                    <b
                      className={statusClass}
                      style={{
                        padding: "5px",
                        backgroundColor,
                        color: textColor,
                        borderRadius: "5px",
                      }}
                    >
                      {keluhan.status}
                    </b>
                  </Col>
                </Row>
              </Container>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
      <div className="tampilanhome row justify-content-around bs m-5">
        <div className="col">
          {keluhan ? (
            <>
              <Card.Title
                style={{
                  color: "#366536",
                  fontWeight: "bold",
                }}
              ></Card.Title>
              <h1 className="text-center">Detail</h1>
              <p className="text-center">{keluhan.isipengaduan}</p>
              {keluhan.status === "Ditolak" && (
                <>
                  <Button
                    onClick={handleModal}
                    className="alasanpenolakan w-100"
                  >
                    Lihat Alasan Penolakan
                  </Button>
                  <Modal show={showModal} onHide={handleModal}>
                    <Modal.Header closeButton>
                      <Modal.Title>Alasan Penolakan</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{keluhan.alasanPenolakan}</Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleModal}>
                        Tutup
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </>
              )}
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetailKeluhan;
