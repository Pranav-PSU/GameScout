import React, { useEffect, useState } from "react";
import { Container, Row, Col, Badge, Card } from "react-bootstrap";
import Sidebar from "../sidebar/Sidebar.js";
import "./GameDetails.css";

const apiKey = "3896265182c3481ab09163b92a9cd5bd";
const gameID = "fifa-22-xbox-one";
const GameDetails = () => {
  const [game, setGame] = useState(null);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await fetch(
          `https://api.rawg.io/api/games/${gameID}?key=${apiKey}`
        );
        const data = await response.json();
        setGame(data);
      } catch (error) {
        console.error("Error fetching game details:", error);
      }
    };

    fetchGameDetails();
  }, []);
  if (game === null) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Sidebar />
      <Container>
        <Row className="mt-4">
          <Col>
            <Card
              className="image-card"
              style={{
                backgroundImage: `url(${game.background_image})`,
                height: "400px",
                position: "relative",
                border: 0,
              }}
            >
              <Badge className="top-left-badge" bg="light" text="dark">
                Released : {game.released}
              </Badge>
              <Badge className="top-right-badge" bg="light" text="dark">
                Rating : {game.rating}
              </Badge>
              <Card.Body>
                <Row>
                  <Col>
                    <Card.Title style={{ fontSize: "2rem", color: "white" }}>
                      <a
                        style={{ color: "white" }}
                        target="_blank"
                        href={game.website}
                      >
                        {game.name}
                      </a>
                    </Card.Title>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <Card>
              <Card.Header>About</Card.Header>
              <Card.Body>
                <Card.Text>
                  <Row>{game.description_raw}</Row>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <Card
              style={{
                backgroundImage: "linear-gradient(to right, lightgrey, grey)",

                border: 0,
              }}
            >
              <Card.Body>
                <Card.Header>Game Details </Card.Header>
                <Row>
                  <Col>
                    <Card.Text
                      style={{
                        textAlign: "left",
                      }}
                    >
                      <strong>Platforms:</strong>{" "}
                      {game.platforms
                        .map((platformItem) => platformItem.platform.name)
                        .join(", ")}{" "}
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
                      <strong>Age rating:</strong> Not rated <br />
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
            <Card>
              <Card.Header>System Requirements ( PC ) </Card.Header>
              <Card.Body>
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
            <Card>
              <Card.Header>Shop Now</Card.Header>
              <Card.Body>
                <Card.Text>
                  <Row>
                    {game.stores.map((storeItem, index) => (
                      <Col>
                        <a
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
