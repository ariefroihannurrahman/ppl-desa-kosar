import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

function EditKeluhan() {
  const [namawarga, setnamawarga] = useState();
  const [kategori, setkategori] = useState("");
  const [judulpengaduan, setjudulpengaduan] = useState();
  const [isipengaduan, setisipengaduan] = useState();

  const { id } = useParams();

  useEffect(() => {
    getkeluhansbyid();
  }, []);

  const getkeluhansbyid = async () => {
    const res = await axios.get(`/api/rooms/getkeluhansbyid/${id}`);
    setnamawarga(res.data.namawarga);
    setkategori(res.data.kategori);
    setjudulpengaduan(res.data.judulpengaduan);
    setisipengaduan(res.data.isipengaduan);

    console.log(getkeluhansbyid);
  };

  const editkeluhan = async (e) => {
    await axios.patch(`/api/rooms/editkeluhan/${id}`, {
      namawarga,
      kategori,
      judulpengaduan,
      isipengaduan,
    });
    Swal.fire("Okay", "Berhasil Edit Keluhan", "success").then((result) => {
      window.location.href = "/admin";
    });
  };
  return (
    <div className="m-3 bs">
      <h2 className="text-center">
        <b>Edit Keluhan</b>
      </h2>

      <div className="row justify-content-center">
        <div className="col-md-5">
          <label className="labelform">Nama</label>
          <input
            type="text"
            className="form-control"
            placeholder="Masukkan Nama Warga"
            value={namawarga}
            onChange={(e) => {
              setnamawarga(e.target.value);
            }}
          />
          <label className="labelform">Judul Pengaduan</label>
          <input
            type="text"
            className="form-control"
            placeholder="Masukkan Judul Pengaduan"
            value={judulpengaduan}
            onChange={(e) => {
              setjudulpengaduan(e.target.value);
            }}
          />
          <label className="labelform">Isi Pengaduan</label>
          <input
            type="text"
            className="form-control"
            placeholder="Masukkan isi Pengaduan"
            value={isipengaduan}
            onChange={(e) => {
              setisipengaduan(e.target.value);
            }}
          />
        </div>
        <div className="col-md-5">
          <label className="labelform">Kategori</label>
          <select
            id="inputState"
            className="form-control custom-select"
            value={kategori}
            onChange={(e) => {
              setkategori(e.target.value);
            }}
          >
            <option>Keluhana</option>
            <option>Keluhanb</option>
            <option>Keluhanc</option>
            <option>Keluhand</option>
            <option>Keluhane</option>
          </select>

          <div className="text-right">
            <button className="btn btn-success mt-2" onClick={editkeluhan}>
              Edit Keluhan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditKeluhan;
