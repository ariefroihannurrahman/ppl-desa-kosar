import React, { useState } from "react";
import axios from "axios";

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

      localStorage.setItem("pengeluh", JSON.stringify(result));
      window.location.href = "/home";
    } catch (error) {}
  }

  return (
    <div>
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5">
          <div className="bs">
            <h2>Login</h2>

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

            <button className="btn btn-primary mt-3" onClick={Login}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TampilanLogin;
