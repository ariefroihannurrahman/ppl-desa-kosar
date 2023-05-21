import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../assets/subang.png";
import Swal from "sweetalert2";

const NavbarPage = () => {
  const pengguna = JSON.parse(localStorage.getItem("pengguna"));

  function logout() {
    Swal.fire({
      title: "Logout",
      text: "Apakah Anda yakin ingin keluar?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("pengguna");
        Swal.fire("Okay", "Logout Berhasil", "success").then(() => {
          window.location.href = "/login";
        });
      }
    });
  }

  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand href="/home">
          <img className="img-logo" src={logo} alt="" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto right">
            {pengguna ? (
              <>
                <NavDropdown
                  title={<span style={{ color: "white" }}>Admin</span>}
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item href="" onClick={logout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Nav.Link href="/register">Register</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarPage;
