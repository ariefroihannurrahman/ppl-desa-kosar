import axios from "axios";
import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import ModalKeluhan from "./ModalKeluhan";

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
    <div className="container ">
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
            {/* <Pengaduans /> */}
          </Tab>
          <Tab eventKey="keluhandiproses" title="Diproses">
            {/* <Keluhans /> */}
          </Tab>
          <Tab eventKey="keluhanselesai" title="Selesai">
            {/* <Addkeluhan /> */}
          </Tab>
          <Tab eventKey="keluhanditolak" title="Ditolak">
            {/* <Penggunas /> */}
          </Tab>
        </Tabs>
        <div className="row justify-content-center">
          {keluhans.length > 0
            ? keluhans.map((keluhan, index) => {
                return (
                  <div className="col-md-9 mt-3">
                    <ModalKeluhan keluhan={keluhan} index={index} />
                  </div>
                );
              })
            : console.log("err")}
        </div>
      </div>
    </div>
  );
}

export default TampilanHome;
