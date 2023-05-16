import axios from "axios";
import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

function Adminscreen() {
  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("pengeluh")).isAdmin) {
      window.location.href = "/home";
    }
  }, []);

  return (
    <div className="tampilanadmin m-3">
      <h2 className="text-center">
        <b>Admin Panel</b>
      </h2>
      <Tabs
        defaultActiveKey="adminpengaduan"
        id="justify-tab-example"
        className="mb-3"
        justify
      >
        <Tab eventKey="adminpengaduan" title="Semua Keluhan">
          <Pengaduans />
        </Tab>
        <Tab eventKey="adminkeluhan" title="Data Keluhan">
          <Keluhans />
        </Tab>
      </Tabs>
    </div>
  );
}

export default Adminscreen;

export function Pengaduans() {
  const [keluhans, setkeluhans] = useState([]);
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

  return (
    <div className="row">
      <div className="col-md-12">
        <h1>Semua Keluhan</h1>
        <table className="table table-bordered ">
          <thead className="">
            <tr>
              <th>No</th>
              <th>Nama Warga</th>
              <th>Judul Pengaduan</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {keluhans.length &&
              keluhans.map((keluhan, index) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{keluhan.namawarga}</td>
                    <td>{keluhan.judulpengaduan}</td>
                    <td>{keluhan.status}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function Keluhans() {
  const [keluhans, setkeluhans] = useState([]);
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

  const hapusKeluhan = (id) => {
    axios.delete(`/api/keluhans/hapuskeluhan/${id}`).then((res) => {
      console.log(res);
      Swal.fire("Okay", "Delete Keluhan Berhasil", "success").then((result) => {
        window.location.reload();
      });
    });
  };

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
      Swal.fire("oops", "something went wrong", "error");
    }
  }

  async function tolakKeluhan(keluhanid) {
    try {
      const result = await (
        await axios.post("/api/keluhans/tolakkeluhan", {
          keluhanid,
        })
      ).data;
      console.log(result);
      Swal.fire("Okay", "Keluhan Di Tolak", "success").then((result) => {
        window.location.reload();
      });
    } catch (error) {
      console.log(error);
      Swal.fire("oops", "something went wrong", "error");
    }
  }

  return (
    <div className="row">
      <div className="col-md-12">
        <h1>Keluhan</h1>

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
            {keluhans.length &&
              keluhans.map((keluhan, index) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{keluhan.namawarga}</td>
                    <td className="col-2">{keluhan.kategori}</td>
                    <td>{keluhan.judulpengaduan}</td>
                    <td>{keluhan.isipengaduan}</td>
                    <td>{new Date(keluhan.createdAt).toLocaleDateString()}</td>

                    {/* <td className="col-1">
                      <Link to={`editkeluhan/${keluhan._id}`}>
                        <button className="crud btn-success">Terima</button>
                      </Link>
                      <button
                        className="crud btn-danger"
                        onClick={() => hapusKeluhan(keluhan._id)}
                      >
                        Tolak
                      </button>
                    </td> */}

                    <td className="col-1">
                      {keluhan.status !== "pending" && (
                        <button
                          className="crud btn-success"
                          onClick={() => {
                            terimaKeluhan(keluhan._id);
                          }}
                        >
                          Terima
                        </button>
                      )}
                      {keluhan.status !== "pending" && (
                        <button
                          className="crud btn-danger"
                          onClick={() => {
                            tolakKeluhan(keluhan._id);
                          }}
                        >
                          Tolak
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
