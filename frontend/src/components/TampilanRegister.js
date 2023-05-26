import React, { useState } from "react";
import axios from "axios";

import Swal from "sweetalert2";
function TampilanRegister() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");

  async function register() {
    if (password === cpassword) {
      const pengguna = {
        name,
        email,
        password,
        cpassword,
      };

      try {
        const result = await axios.post("/api/penggunas/register", pengguna)
          .data;
        setname();
        setemail();
        setpassword();
        setcpassword();
        console.log(result);
        Swal.fire("Congrats", "Registration Succesfully", "success").then(
          (result) => {
            window.location.href = "/login";
          }
        );
      } catch (error) {
        Swal.fire("oops", "something went wrong", "error");
        console.log(error);
      }

      console.log(pengguna);
    } else {
      alert("Password do not match");
    }
  }

  return (
    <div>
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5">
          <div className="bs">
            <h2>Register</h2>
            <input
              type="text"
              className="form-control"
              placeholder="name"
              value={name}
              onChange={(e) => {
                setname(e.target.value);
              }}
            />
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
            <input
              type="text"
              className="form-control"
              placeholder="confirm password"
              value={cpassword}
              onChange={(e) => {
                setcpassword(e.target.value);
              }}
            />

            <button className="btn btn-primary mt-3" onClick={register}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TampilanRegister;
