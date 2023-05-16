import React from "react";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import NavbarKosar from "./components/NavbarKosar";
import EditKeluhan from "./components/EditKeluhan";
import TampilanHome from "./components/TampilanHome";
import TampilanRegister from "./components/TampilanRegister";
import TampilanLogin from "./components/TampilanLogin";
import TampilanProfile from "./components/TampilanProfile";
import TampilanAdmin from "./components/TampilanAdmin";
import TambahKeluhan from "./components/TambahKeluhan";
import DetailKeluhan from "./components/DetailKeluhan";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="" element={<TampilanHome />} />
          <Route path="/home" element={<TampilanHome />} />
          <Route path="/tambahkeluhan" element={<TambahKeluhan />} />
          <Route path="/register" element={<TampilanRegister />} />
          <Route path="/login" element={<TampilanLogin />} />
          <Route path="/profile" element={<TampilanProfile />} />
          <Route
            path="/admin"
            element={
              <>
                <NavbarKosar />
                <TampilanAdmin />
              </>
            }
          />
          <Route path="/admin/editkeluhan/:id" element={<EditKeluhan />} />
          <Route path="/detailkeluhan/:keluhanid" element={<DetailKeluhan />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
