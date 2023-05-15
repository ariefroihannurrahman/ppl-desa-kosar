import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import Swal from "sweetalert2";
import { Card } from "react-bootstrap";

function TampilanPengaduan({ match }) {
  const [keluhan, setkeluhan] = useState(true);
  const { keluhanid } = useParams();

  useEffect(() => {
    (async () => {
      if (!localStorage.getItem("pengeluh")) {
        window.location.reload = "/login";
      }

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

  // async function bookKeluhan() {
  //   const keluhanDetails = {
  //     keluhan,
  //     penggunaid: JSON.parse(localStorage.getItem("pengeluh"))._id,
  //   };

  //   try {
  //     const result = await axios.post(
  //       "/api/pengaduans/bookkeluhan",
  //       keluhanDetails
  //     );
  //     Swal.fire("Selamat", "Keluhan Berhasil", "success").then((result) => {
  //       window.location.href = "/profile";
  //     });
  //     console.log(result);
  //   } catch (error) {
  //     console.log(error);
  //     Swal.fire("Gagal", "Kesalahan Terjadi", "error");
  //   }
  // }

  return (
    <div className="row justify-content-around bs m-5">
      <div className="col-4">
        <Card.Title
          style={{
            color: "#366536",
            fontWeight: "bold",
          }}
        >
          Nama : {keluhan.namawarga}
          <br></br>
          Kategori : {keluhan.kategori}
        </Card.Title>
        <h1>Detail</h1>
        <p>{keluhan.isipengaduan} </p>
      </div>
      <div className="col-4">
        <Card.Body
          style={{
            textAlign: "right",
          }}
        >
          <Card.Title
            style={{
              color: "#366536",
              fontWeight: "bold",
              fontSize: "40px",
            }}
          ></Card.Title>
        </Card.Body>
      </div>
    </div>
  );
}

export default TampilanPengaduan;
