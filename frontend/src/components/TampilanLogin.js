import React, { useState } from "react";
import axios from "axios";

import Card from "react-bootstrap/Card";
import logo from "../assets/subang.png";
import Swal from "sweetalert2";

function TampilanLogin() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  async function Login() {
    const pengguna = {
      email,
      password,
    };
    console.log(pengguna);
    try {
      const result = (await axios.post("/api/penggunas/login", pengguna)).data;
      Swal.fire("Okay", "Login Berhasil", "success").then((result) => {
        window.location.href = "/admin";
      });
      localStorage.setItem("pengguna", JSON.stringify(result));
    } catch (error) {
      Swal.fire("oops", "something went wrong", "error");
    }
  }

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col">
          <Card className="cardmodal">
            <Card.Body>
              <Card.Title className="text-center">
                <img className="img-logo" src={logo} alt="" />
                <h2>Selamat datang di</h2>
                <h1>Sistem Informasi Pengaduan Masyarakat Desa Kosar</h1>
              </Card.Title>
              <Card.Text>
                <h2 className="judullogin">Masuk</h2>
                <input
                  type="text"
                  className="form-control"
                  placeholder="email"
                  value={email}
                  onChange={(e) => {
                    setemail(e.target.value);
                  }}
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="password"
                  value={password}
                  onChange={(e) => {
                    setpassword(e.target.value);
                  }}
                />
                <button className="btnlogin btn btn-block" onClick={Login}>
                  Masuk
                </button>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default TampilanLogin;
