import axios from "axios";
import React, { useState } from "react";

import Swal from "sweetalert2";

function TambahKeluhan() {
  const [namawarga, setnamawarga] = useState();
  const [kategori, setkategori] = useState("");
  const [judulpengaduan, setjudulpengaduan] = useState();
  const [isipengaduan, setisipengaduan] = useState();


  async function addKeluhan() {
    const newkeluhan = {
      namawarga,
      kategori,
      judulpengaduan,
      isipengaduan,
    };

    console.log(newkeluhan);

    try {
      const result = await (
        await axios.post("/api/keluhans/addkeluhan", newkeluhan)
      ).data;

      console.log(result);
      Swal.fire("Okay", "Berhasil Tambah Keluhan", "success").then((result) => {
        window.location.href = "/home";
      });
    } catch (error) {
      console.log(error);
      Swal.fire("oops", "something went wrong", "error");
    }
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-5">
        <label className="labelform">Nama</label>
        <input
          type="text"
          className="form-control"
          placeholder="Masukkan Nama"
          value={namawarga}
          onChange={(e) => {
            setnamawarga(e.target.value);
          }}
        />
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
          placeholder="Masukkan Isi Pengaduan"
          value={isipengaduan}
          onChange={(e) => {
            setisipengaduan(e.target.value);
          }}
        />

        <button className="btn btn-primary mt-2" onClick={addKeluhan}>
          Tambah Keluhan
        </button>
      </div>
    </div>
  );
}

export default TambahKeluhan;
