import React from "react";
import { Link } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";

function DetailKeluhan({ keluhan }) {
  return (
    <div className="row datakeluhan">
      <div className="col-sm">
        <Card style={{ width: "18rem", marginLeft: "20px", marginTop: "20px" }}>
          <Card.Body>
            <Card.Title
              style={{
                color: "#366536",
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: "20px",
              }}
            >
              {keluhan.namawarga}
            </Card.Title>
            <Card.Text>{keluhan.judulpengaduan}</Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>{keluhan.isipengaduan}</ListGroup.Item>
            <ListGroup.Item>{keluhan.kategori}</ListGroup.Item>
          </ListGroup>
          <Card.Body>
            <Link to={`/detailkeluhan/${keluhan._id}`}>
              <button className="btn btn-primary">Detail Pengaduan</button>
            </Link>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default DetailKeluhan;
