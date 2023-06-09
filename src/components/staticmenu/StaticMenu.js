import React from "react";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import "./StaticMenu.css";
import dashboardIcon from "./dashboard.png";
import compassIcon from "./compass.png";
import { Row, Col } from "react-bootstrap";

function StaticMenu() {
  return (
    <>
      <div className="top-card">
        <Nav className="me-auto">
          <Row className="nav-links flex-md-column d-sm-flex flex-sm-row ">
            <Col className="">
              <div className="link-parent">
                <Nav.Link as={Link} to="/dashboard" id="nav-link-dashboard">
                  <img src={dashboardIcon} id="nav-link-icon"></img>
                  <p id="nav-link-text">Dashboard</p>
                </Nav.Link>
              </div>
            </Col>
            <Col className="">
              <div className="link-parent">
                <Nav.Link as={Link} to="/gamelist" id="nav-link-explore">
                  <img src={compassIcon} id="nav-link-icon"></img>
                  <p id="nav-link-text">Explore</p>
                </Nav.Link>
              </div>
            </Col>
          </Row>
        </Nav>
      </div>
      <div id="top-bar-container">
        <div className="top-card-mobile">
          <Nav className="me-auto">
            <Row className="nav-links" id="nav-row">
              <Col className="" id="nav-col-dashboard">
                <Nav.Link as={Link} to="/dashboard" id="nav-link-dashboard">
                  <img src={dashboardIcon} id="nav-link-icon"></img>
                  <p id="nav-link-text">Dashboard</p>
                </Nav.Link>
              </Col>
              <Col className="" id="nav-col-explore">
                <Nav.Link as={Link} to="/gamelist" id="nav-link-explore">
                  <img src={compassIcon} id="nav-link-icon"></img>
                  <p id="nav-link-text">Explore</p>
                </Nav.Link>
              </Col>
            </Row>
          </Nav>
        </div>
      </div>
    </>
  );
}

export default StaticMenu;
