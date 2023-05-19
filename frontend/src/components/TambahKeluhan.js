import axios from "axios";
import React, { useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

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
        window.location.href = "/tambahkeluhan";
      });
    } catch (error) {
      console.log(error);
      Swal.fire("oops", "something went wrong", "error");
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
        <div className="jdltambahkeluhan">
          <h1>Form Pengaduan</h1>
        </div>
      </div>
      <div className="subjudul col-md">
        <h1>Silahkan Sampaikan Pengaduan Anda Langsung Kepada Kami</h1>
      </div>
      <div className="tampilanhome row justify-content-around bs m-5">
        <div className="col">
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
            <option value="">Pilih Kategori</option>
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

          <button
            className="btn tambahkeluhan mt-2 btn-block"
            onClick={addKeluhan}
          >
            Tambah Keluhan
          </button>
        </div>
      </div>
    </div>
  );
}

export default TambahKeluhan;
