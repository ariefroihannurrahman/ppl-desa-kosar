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
import TampilanKeluhan from "./components/TampilanKeluhan";

function App() {
  return (
    <div className="App">
      <NavbarKosar />
      <BrowserRouter>
        <Routes>
          <Route path="" element={<TampilanHome />} />
          <Route path="/home" element={<TampilanHome />} />
          <Route path="/tambahkeluhan" element={<TambahKeluhan />} />
          <Route path="/register" element={<TampilanRegister />} />
          <Route path="/login" element={<TampilanLogin />} />
          <Route path="/profile" element={<TampilanProfile />} />
          <Route path="/admin" element={<TampilanAdmin />} />
          <Route path="/admin/editkeluhan/:id" element={<EditKeluhan />} />

          <Route
            path="/detailkeluhan/:keluhanid"
            element={<TampilanKeluhan />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

// function App() {
//   return (
//     <div className="App">
//       <NavbarHotel />
//       <BrowserRouter>
//         <Routes>
//           <Route path="" element={<TampilanHome />} />
//           <Route path="/home" element={<TampilanHome />} />
//           <Route
//             path="/book/:roomid/:fromdate/:todate"
//             element={<TampilanBooking />}
//           />
//           <Route path="/register" element={<TampilanRegister />} />
//           <Route path="/login" element={<TampilanLogin />} />
//           <Route path="/profile" element={<TampilanProfile />} />
//           <Route path="/admin" element={<TampilanAdmin />} />
//           <Route path="/admin/editkamar/:id" element={<EditKamar />} />
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

export default App;
