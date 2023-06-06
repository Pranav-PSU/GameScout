import React from "react";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import "./StaticMenu.css";
import { Row, Col } from "react-bootstrap";


function StaticMenu() {
  return (
    <>
    <div className="top-card">
      <Nav className="me-auto">
        <Row className="nav-links flex-md-column d-sm-flex flex-sm-row ">
          <Col className="">
            <Nav.Link as={Link} to="/dashboard">
              Home
            </Nav.Link>
          </Col>
          <Col className="">
            <Nav.Link as={Link} to="/gamelist">
              Games
            </Nav.Link>
          </Col>
        </Row>
      </Nav>
    </div>
    <div className="top-card-mobile">
      <Nav className="me-auto">
        <Row className="nav-links d-sm-flex flex-sm-row flex-md-column">
          <Col className="">
            <Nav.Link as={Link} to="/dashboard">
              Home
            </Nav.Link>
          </Col>
          <Col className="">
            <Nav.Link as={Link} to="/gamelist">
              Games
            </Nav.Link>
          </Col>
          
        </Row>
      </Nav>
    </div>
    </>
  );
}

export default StaticMenu;
