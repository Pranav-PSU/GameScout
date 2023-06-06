import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Sidebar from "../sidebar/Sidebar";
import {
  Card,
  Col,
  Row,
  Container,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./GameList.css";
import placeholder from "./placeholder.png";
import InfiniteScroll from "react-infinite-scroll-component";

const GameList = (props) => {
  const [games, setGames] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const getGameListFunction = async () => {
    let REACT_APP_RAWG = "3896265182c3481ab09163b92a9cd5bd";
    try {
      const response = await fetch(
        `https://api.rawg.io/api/games?key=${REACT_APP_RAWG}&page=${currentPage}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setGames((prevGames) => [...prevGames, ...data.results]);
      if (data.next === null) {
        setHasMore(false);
      } else {
        setCurrentPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error("Error fetching data from RAWG API:", error);
    }
  };

  useEffect(() => {
    getGameListFunction();
  }, []);

  const navigate = useNavigate();

  const showDetails = (element, id) => {
    console.log(element);
    navigate("/gamedetails", { state: { gameData: element } });
  };

  // Filter games based on search term
  const filteredData = games.filter((game) =>
    game.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
      <Sidebar />

      <Container>
        <Form className="d-flex">
          <FormControl
            type="search"
            placeholder="Search"
            className="mr-2"
            aria-label="Search"
            value={searchText}
            onChange={handleSearch}
          />
          <Button variant="outline-success">Search</Button>
        </Form>
        <InfiniteScroll
          dataLength={filteredData.length}
          next={getGameListFunction}
          hasMore={hasMore}
          loader={<h3>Loading..</h3>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Thats all!</b>
            </p>
          }
        >
          <Row xs={1} md={2} lg={3} className="g-4">
            {filteredData.map((element, id) => (
              <Col key={id}>
                <Card onClick={() => showDetails(element, id)} id="card-custom">
                  <Card.Img
                    variant="top"
                    src={element.background_image}
                    id="img-custom"
                  />
                  <Card.Body id="card-body-custom">
                    <Card.Title id="caption">{element.name}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </InfiniteScroll>
      </Container>
    </>
  );
};

GameList.propTypes = {};

export default GameList;
