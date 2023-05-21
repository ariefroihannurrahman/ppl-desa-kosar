import React, { useEffect, useState } from "react";
import axios from "axios";
import { Col, Nav, Row, Tab } from "react-bootstrap";
import { Tag } from "antd";

function TampilanProfile() {
  const pengguna = JSON.parse(localStorage.getItem("pengguna"));

  useEffect(() => {
    if (!pengguna) {
      window.location.href = "/login";
    } else {
    }
  }, []);

  return (
    <div className="m-3 bs">
      <Tab.Container id="left-tabs-example" defaultActiveKey="history">
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="profile">My Profile</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="history">History</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="profile">
                {" "}
                <h1>Name : {pengguna.name}</h1>
                <h1>Email : {pengguna.email}</h1>
                <h1>isAdmin : {pengguna.isAdmin ? "Yes" : "No"}</h1>
              </Tab.Pane>
              <Tab.Pane eventKey="history">
                <MyKeluhans />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>

      {/* <Tabs defaultActiveKey="2">
        <TabPane tab="Profile" key="1">
          <h1>My Profile</h1>
          <br />
          <h1>Name : {user.name}</h1>
          <h1>Email : {user.email}</h1>
          <h1>isAdmin : {user.isAdmin ? "Yes" : "No"}</h1>
        </TabPane>
        <TabPane tab="History" key="2">
          <h1>History Bookings</h1>
          <MyBookings />
        </TabPane>
      </Tabs> */}
    </div>
  );
}

export default TampilanProfile;

export function MyKeluhans() {
  const pengguna = JSON.parse(localStorage.getItem("pelanggan"));
  const [pengaduans, setpengaduans] = useState();

  useEffect(() => {
    (async () => {
      try {
        const data = await (
          await axios.post("/api/pengaduans/getpengaduansbypenggunaid", {
            penggunaid: pengguna._id,
          })
        ).data;
        console.log(data);
        setpengaduans(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div>
      <div className="row">
        <div className="col-md-12">
          {pengaduans &&
            pengaduans.map((pengaduan) => {
              return (
                <div className="bs">
                  <h1 className="hist-jdl">{pengaduan.keluhan}</h1>
                  <br />
                  <p>
                    <b>pengaduanId : </b> {pengaduan._id}
                  </p>
                  <p>
                    <b>Status</b> :{" "}
                    {pengaduan.status === "Pending" ? (
                      <Tag color="purple">Pending</Tag>
                    ) : (
                      <Tag color="green">Sudah Di Terima</Tag>
                    )}
                  </p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
