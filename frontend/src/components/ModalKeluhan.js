import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";

import { BsArrowRightSquare } from "react-icons/bs";
import { BiUpArrow, BiDownArrow } from "react-icons/bi";

// function penomoran(number) {
//   const defaultnumber = [
//     "",
//     "Satu",
//     "Dua",
//     "Tiga",
//     "Empat",
//     "Lima",
//     "Enam",
//     "Tujuh",
//     "Delapan",
//     "Sembilan",
//   ];
//   const belasan = "Belas";
//   const puluhan = "Puluh";
//   const ratusan = "Ratus";

//   if (number <= 0 || number > 999) {
//     return "";
//   }

//   if (number === 1) {
//     return "Pertama";
//   }

//   if (number <= 9) {
//     return "Ke " + defaultnumber[number];
//   }

//   if (number === 10) {
//     return "Ke Sepuluh";
//   }

//   if (number === 11) {
//     return "Ke Sebelas";
//   }

//   if (number <= 19) {
//     const ones = number % 10;
//     return "Ke " + defaultnumber[ones] + " " + belasan;
//   }

//   if (number <= 99) {
//     const tens = Math.floor(number / 10);
//     const ones = number % 10;
//     return puluhan
//       ? "Ke " + defaultnumber[tens] + " " + puluhan + " " + defaultnumber[ones]
//       : "Ke " + defaultnumber[tens] + " " + defaultnumber[ones];
//   }

//   if (number <= 999) {
//     const hundreds = Math.floor(number / 100);
//     const tens = Math.floor((number % 100) / 10);
//     const ones = number % 10;
//     const tensText = puluhan
//       ? "Ke " + defaultnumber[tens] + " " + puluhan + " " + defaultnumber[ones]
//       : "Ke " + defaultnumber[tens] + " " + defaultnumber[ones];
//     return ratusan
//       ? "Ke " + defaultnumber[hundreds] + " " + ratusan + " " + tensText
//       : "Ke " + defaultnumber[hundreds] + " " + tensText;
//   }
// }

function ModalKeluhan({ keluhan, index }) {
  // const urutan = penomoran(index + 1);
  let statusClass = "";
  switch (keluhan.status) {
    case "Pending":
      return null;
    case "Diproses":
      statusClass = "status-diterima";
      break;
    case "Ditolak":
      statusClass = "status-ditolak";
      break;
    case "Selesai":
      statusClass = "status-selesai";
      break;
    default:
      break;
  }

  const [vote, setVote] = useState(keluhan.vote);

  function handleVoteUp() {
    axios
      .put(`/api/keluhans/${keluhan._id}/voteup`)
      .then((response) => {
        console.log(response.data.message);
        setVote(vote + 1);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  // useEffect(() => {
  //   axios
  //     .get(`/api/keluhans/${keluhan._id}`)
  //     .then((response) => {
  //       setVote(response.keluhan.vote);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, [keluhan._id]);

  // function handleVoteDown() {
  //   axios
  //     .put(`/api/keluhans/${keluhan._id}/votedown`)
  //     .then((response) => {
  //       console.log(response.data.message);
  //       setVote(vote - 1);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }

  return (
    <div className="row">
      <div className="col">
        <Card className="cardmodal">
          <Card.Body>
            <Card.Title>
              <button className="btnvoteup" onClick={handleVoteUp}>
                <BiUpArrow size={30} />
              </button>
              {keluhan.judulpengaduan}
              {/* Pengaduan {urutan} */}
              <Link to={`/detailkeluhan/${keluhan._id}`}>
                <button className="btndetail">
                  <BsArrowRightSquare size={30} />
                </button>
              </Link>
            </Card.Title>
            <p
              style={{
                marginRight: "10px",
                float: "left",
              }}
            >
              {vote}
            </p>
            <Card.Text
              style={{
                marginLeft: "40px",
              }}
            >
              {keluhan.namawarga} |{" "}
              <b className={statusClass}>{keluhan.status}</b>
            </Card.Text>
            {/* <div>
              <button className="btnvoteup" onClick={handleVoteUp}>
                <BiUpArrow />
              </button>
              <button className="btnvotedown" onClick={handleVoteDown}>
                <BiDownArrow />
              </button>

            </div> */}
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default ModalKeluhan;
