import axios from "axios";
import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import ModalKeluhan from "./ModalKeluhan";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";

function TampilanHome() {
  const [keluhans, setkeluhans] = useState([]);

  const [duplicatekeluhans, setduplicatekeluhans] = useState([]);
  const [searchkey, setsearchkey] = useState();
  const [kategori, setkategori] = useState("all");

  useEffect(() => {
    (async () => {
      try {
        const data = (await axios.get("/api/keluhans/getallkeluhans")).data;

        setkeluhans(data);
        setduplicatekeluhans(data);
      } catch (err) {
        console.log("error");
      }
    })();
  }, []);

  function filterBySearch() {
    const tempkeluhans = duplicatekeluhans.filter((keluhan) =>
      keluhan.namawarga.toLowerCase().includes(searchkey.toLowerCase())
    );

    setkeluhans(tempkeluhans);
  }

  function filterByType(e) {
    setkategori(e);

    if (e !== "all") {
      const tempkeluhans = duplicatekeluhans.filter(
        (keluhan) => keluhan.kategori.toLowerCase() === e.toLowerCase()
      );
      setkeluhans(tempkeluhans);
    } else {
      setkeluhans(duplicatekeluhans);
    }
  }

  return (
    <div className="inic container">
      <div className="row">
        <div className="col-sm">
          {" "}
          <input
            type="text"
            className="form-control"
            placeholder="Cari"
            value={searchkey}
            onChange={(e) => {
              setsearchkey(e.target.value);
            }}
            onKeyUp={filterBySearch}
          />
        </div>
        <div className="col-sm">
          {" "}
          <select
            className="form-control custom-select"
            value={kategori}
            onChange={(e) => {
              filterByType(e.target.value);
            }}
          >
            <option value="all">Pilih Kategori</option>
            <option value="keluhana">Keluhana</option>
            <option value="keluhanb">Keluhanb</option>
            <option value="keluhanc">Keluhanc</option>
            <option value="keluhanc">Keluhand</option>
            <option value="keluhanc">Keluhane</option>
          </select>
        </div>
      </div>
      <h1 className="judul">Selamat Datang</h1>
      <h2 className="judul2">
        Di Sistem Informasi Pengaduan <br></br>Masyarakat Desa Kosar
      </h2>

      <div className="tampilanhome">
        <h2 className="text-center">
          <b>Daftar Pengaduan</b>
        </h2>
        <Tabs
          defaultActiveKey="keluhanterbaru"
          id="justify-tab-example"
          className="mb-3"
          justify
        >
          <Tab eventKey="keluhanterbaru" title="Terbaru">
            <Terbaru />
          </Tab>
          <Tab eventKey="keluhandiproses" title="Diproses">
            <DiProses />
          </Tab>
          <Tab eventKey="keluhanselesai" title="Selesai">
            <Selesai />
          </Tab>
          <Tab eventKey="keluhanditolak" title="Ditolak">
            <DiTolak />
          </Tab>
        </Tabs>
        <div className="fixed-bottom w-50 m-auto">
          <Link to="/tambahkeluhan" className="btn pengaduan btn-block">
            Buat Pengaduan
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TampilanHome;

export function Terbaru() {
  const [keluhans, setkeluhans] = useState([]);
  const sortedKeluhans = keluhans.sort((a, b) => b.vote - a.vote);

  useEffect(() => {
    (async () => {
      try {
        const data = (await axios.get("/api/keluhans/getallkeluhans")).data;
        setkeluhans(data);
      } catch (err) {
        console.log("error");
      }
    })();
  }, []);

  return (
    <div className="row justify-content-center">
      {sortedKeluhans.length > 0
        ? sortedKeluhans.map((keluhan, index) => {
            return (
              <div className="modals col-md-9">
                <ModalKeluhan keluhan={keluhan} index={index} />
              </div>
            );
          })
        : console.log}
    </div>
  );
}

export function Selesai() {
  return (
    <div className="row justify-content-center">
      <div className="row">
        <div className="col">
          <Card className="cardmodal">
            <Card.Body>
              <Card.Title>Selesai</Card.Title>
              <Card.Text>
                <h1>Tampilan Selesai</h1>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export function DiProses() {
  const [keluhans, setkeluhans] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = (await axios.get("/api/keluhans/getallkeluhans")).data;
        setkeluhans(data);
      } catch (err) {
        console.log("error");
      }
    })();
  }, []);

  const keluhansDiProses = keluhans
    .filter((keluhan) => keluhan.status === "Diterima")
    .map((keluhan) => ({
      ...keluhan,
      status: "Diproses",
    }));

  const sortedKeluhans = keluhansDiProses.sort((a, b) => b.vote - a.vote);

  return (
    <div className="row justify-content-center">
      {keluhansDiProses.length > 0 ? (
        keluhansDiProses.map((keluhan, index) => (
          <div className="col-md-9">
            <ModalKeluhan keluhan={keluhan} index={index} />
          </div>
        ))
      ) : (
        <p>Tidak ada keluhan yang sedang diproses.</p>
      )}
    </div>
  );
}

export function DiTolak() {
  const [keluhans, setkeluhans] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = (await axios.get("/api/keluhans/getallkeluhans")).data;
        setkeluhans(data);
      } catch (err) {
        console.log("error");
      }
    })();
  }, []);

  const keluhansDitolak = keluhans.filter(
    (keluhan) => keluhan.status === "Ditolak"
  );

  const sortedKeluhans = keluhansDitolak.sort((a, b) => b.vote - a.vote);

  return (
    <div className="row justify-content-center">
      {keluhansDitolak.length > 0 ? (
        keluhansDitolak.map((keluhan, index) => {
          return (
            <div className="col-md-9">
              <ModalKeluhan keluhan={keluhan} index={index} />
            </div>
          );
        })
      ) : (
        <p>Tidak ada keluhan yang ditolak.</p>
      )}
    </div>
  );
}
