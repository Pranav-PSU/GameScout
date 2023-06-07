import React, { useEffect, useState } from "react";
import { Container, Row, Col, Badge, Card, Carousel } from "react-bootstrap";
import "./GameDetails.css";
import { useLocation } from "react-router-dom";

const apiKey = "3896265182c3481ab09163b92a9cd5bd";
let gameID = "fifa-22-xbox-one";
const GameDetails = () => {
  const [game, setGame] = useState(null);
  const [gameScreenshots, setGameScreenshots] = useState(null);
  const location = useLocation();

  useEffect(() => {
    gameID = location.state.gameData.slug;
    const getGameScreenshots = async () => {
      try {
        const response = await fetch(
          `https://api.rawg.io/api/games/${gameID}/screenshots?key=${apiKey}`
        );
        const data = await response.json();
        console.log("gameScreenshts", data);
        setGameScreenshots(data);
      } catch (error) {
        console.error("Error fetching game screenshots:", error);
      }
    };
    const fetchGameDetails = async () => {
      try {
        const response = await fetch(
          `https://api.rawg.io/api/games/${gameID}?key=${apiKey}`
        );
        const data = await response.json();
        console.log(data);
        setGame(data);
      } catch (error) {
        console.error("Error fetching game details:", error);
      }
    };

    fetchGameDetails();
    getGameScreenshots();
  }, []);
  if (game === null || gameScreenshots === null) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Container id="container">
        <Row className="mt-4" id="main-title-row">
          <Col id="main-title-col">
            <a id="title-link" target="_blank" href={game.website}>
              <div id="title-container">
                <h1>{game.name}</h1>
              </div>
            </a>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <Card
              id="game-overview-card"
              className="image-card"
              style={{
                backgroundImage: `url(${game.background_image})`,
              }}
            ></Card>
          </Col>
          <Col>
            <Card id="carousel-container-card" className="image-card">
              <Carousel
                id="carousel-custom"
                indicators={true}
                controls={true}
                interval={5000}
                pause={false}
              >
                {gameScreenshots.results.map((image, index) => (
                  <Carousel.Item
                    id="carousel-item"
                    key={index}
                    style={{
                      backgroundImage: `url(${image.image})`,
                    }}
                  />
                ))}
              </Carousel>
              <h4>
                <Badge
                  id="released-badge"
                  className="top-left-badge"
                  bg="dark"
                  text="light"
                >
                  Released : {game.released}
                </Badge>
              </h4>
              <h4>
                <Badge
                  id="rating-badge"
                  className="top-right-badge"
                  bg="dark"
                  text="light"
                >
                  Rating : {game.rating}
                </Badge>
              </h4>
              <Card.Body>
                <Row>
                  <Col>
                    <Card.Title id="carousel-text">Game Screenshots</Card.Title>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <Card id="card">
              <Card.Header id="card-header">Overview</Card.Header>
              <Card.Body id="card-body">
                <Card.Text id="card-text">{game.description_raw}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col>
            <Card id="card">
              <Card.Header id="card-header">Game Details </Card.Header>
              <Card.Body id="card-body">
                <Row className="p-2">
                  <Col>
                    <Card.Text
                      style={{
                        textAlign: "left",
                      }}
                    >
                      <strong>Platforms:</strong>{" "}
                      {game.platforms
                        .map((platformItem, index) => (
                          <span key={index} class="game-details">
                            {platformItem.platform.name}
                          </span>
                        ))
                        .reduce((prev, curr, index) => [prev, ", ", curr])}
                      <br />
                      <strong>Genre:</strong>{" "}
                      {game.genres.map((genre) => genre.name).join(", ")} <br />
                      <strong>Release date:</strong> {game.released} <br />
                      <strong>Developers:</strong>{" "}
                      {game.developers
                        .map((developer) => developer.name)
                        .join(", ")}{" "}
                      <br />
                      <strong>Publishers:</strong>{" "}
                      {game.publishers
                        .map((publisher) => publisher.name)
                        .join(", ")}{" "}
                      <br />
                    </Card.Text>
                  </Col>
                  <Col>
                    <Card.Text
                      style={{
                        textAlign: "left",
                      }}
                    >
                      <strong>Age rating:</strong>
                      <span class="game-details">Not rated</span> <br />
                      <strong>Tags:</strong>{" "}
                      {game.tags
                        .slice(0, 10)
                        .map((tag) => tag.name)
                        .join(", ")}
                    </Card.Text>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <Card id="card">
              <Card.Header id="card-header">
                System Requirements ( PC ){" "}
              </Card.Header>
              <Card.Body id="card-body">
                <Card.Text>
                  {game.platforms.map((platformItem, index) => {
                    if (platformItem.platform.name === "PC") {
                      return (
                        <div key={index}>
                          <p>
                            <strong>Minimum Requirements:</strong>{" "}
                            {platformItem.requirements.minimum}
                          </p>
                          <p>
                            <strong>Recommended Requirements:</strong>{" "}
                            {platformItem.requirements.recommended}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  })}
                  .
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <Card id="card">
              <Card.Header id="card-header">Shop Now</Card.Header>
              <Card.Body id="card-body-shop">
                <Card.Text>
                  <Row>
                    {game.stores.map((storeItem, index) => (
                      <Col>
                        <a
                          id="shop-link"
                          target="_blank"
                          href={"https://" + storeItem.store.domain}
                        >
                          {storeItem.store.name}
                        </a>
                      </Col>
                    ))}
                  </Row>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default GameDetails;
