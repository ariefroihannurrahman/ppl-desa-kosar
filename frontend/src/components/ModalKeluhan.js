import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";

import { BsArrowRightSquare } from "react-icons/bs";
import { BiUpArrow } from "react-icons/bi";

function penomoran(number) {
  const defaultnumber = [
    "",
    "Satu",
    "Dua",
    "Tiga",
    "Empat",
    "Lima",
    "Enam",
    "Tujuh",
    "Delapan",
    "Sembilan",
  ];
  const belasan = "Belas";
  const puluhan = "Puluh";
  const ratusan = "Ratus";

  if (number <= 0 || number > 999) {
    return "";
  }

  if (number === 1) {
    return "Pertama";
  }

  if (number <= 9) {
    return "Ke " + defaultnumber[number];
  }

  if (number === 10) {
    return "Ke Sepuluh";
  }

  if (number === 11) {
    return "Ke Sebelas";
  }

  if (number <= 19) {
    const ones = number % 10;
    return defaultnumber[ones] + " " + belasan;
  }

  if (number <= 99) {
    const tens = Math.floor(number / 10);
    const ones = number % 10;
    return puluhan
      ? defaultnumber[tens] + " " + puluhan + " " + defaultnumber[ones]
      : defaultnumber[tens] + " " + defaultnumber[ones];
  }

  if (number <= 999) {
    const hundreds = Math.floor(number / 100);
    const tens = Math.floor((number % 100) / 10);
    const ones = number % 10;
    const tensText = puluhan
      ? defaultnumber[tens] + " " + puluhan + " " + defaultnumber[ones]
      : defaultnumber[tens] + " " + defaultnumber[ones];
    return ratusan
      ? defaultnumber[hundreds] + " " + ratusan + " " + tensText
      : defaultnumber[hundreds] + " " + tensText;
  }
}

function ModalKeluhan({ keluhan, index }) {
  const urutan = penomoran(index + 1);
  let statusClass = "";
  switch (keluhan.status) {
    case "Pending":
      statusClass = "status-pending";
      break;
    case "Diterima":
      statusClass = "status-diterima";
      break;
    case "Ditolak":
      statusClass = "status-ditolak";
      break;
    default:
      break;
  }

  return (
    <div className="row">
      <div className="col">
        <Card className="cardmodal">
          <Card.Body>
            <Card.Title>
              <BiUpArrow size={30} style={{ marginRight: "10px" }} />
              Pengaduan {urutan}
              <Link to={`/detailkeluhan/${keluhan._id}`}>
                <button className="btndetail">
                  <BsArrowRightSquare size={30} />
                </button>
              </Link>
            </Card.Title>
            <Card.Text style={{ marginLeft: "40px" }}>
              {keluhan.namawarga} |{" "}
              <b className={statusClass}>{keluhan.status}</b>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default ModalKeluhan;
