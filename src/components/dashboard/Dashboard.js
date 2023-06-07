import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import { Card, Col, Row, Container, Alert, Button } from "react-bootstrap";
import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

const apiKey = "3896265182c3481ab09163b92a9cd5bd";
const gameID = "fifa-22-xbox-one";

const ratingToVariant = {
  1: "danger",
  2: "danger",
  3: "warning",
  4: "warning",
  5: "success",
};
const Dashboard = () => {
  const [mostPopular, setMostPopular] = useState(null);
  const [easports, setEAsports] = useState(null);
  const [highRated, setHighRated] = useState(null);
  const [genre, setGenre] = useState(null);
  const [platform, setPlatform] = useState(null);
  // const [game, setGame] = useState(null);
  const navigate = useNavigate();
  let backgroundColors = [
    "rgba(54, 162, 235, 0.8)",
    "rgba(255, 206, 86, 0.8)",
    "rgba(255, 99, 132, 0.8)",
    "rgba(75, 192, 192, 0.8)",
    "rgba(153, 102, 255, 0.8)",
    "rgba(255, 159, 64, 0.8)",
    "rgba(199, 199, 199, 0.8)",
    "rgba(83, 102, 255, 0.8)",
    "rgba(40, 159, 64, 0.8)",
    "rgba(210, 199, 199, 0.8)",
    "rgba(78, 52, 199, 0.8)",
  ];

  const data1 = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: backgroundColors,
      },
    ],
  };
  const options = {
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: "Chart.js Horizontal Bar Chart",
      },
    },
  };

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await fetch(
          `https://api.rawg.io/api/games?dates=2019-01-01,2019-12-31&ordering=-added&key=${apiKey}`
        );
        const data = await response.json();
        setMostPopular(data.results);
      } catch (error) {
        console.error("Error fetching game details:", error);
      }
    };
    const EASportGames = async () => {
      try {
        const response = await fetch(
          `https://api.rawg.io/api/games?ordering=-rating&developers=109&key=${apiKey}`
        );
        const data = await response.json();

        setEAsports(data.results);
      } catch (error) {
        console.error("Error fetching game details:", error);
      }
    };
    const highestRatedGames = async () => {
      try {
        const response = await fetch(
          `https://api.rawg.io/api/games?dates=2001-01-01,2001-12-31&ordering=-rating&key=${apiKey}`
        );
        const data = await response.json();
        setHighRated(data.results);
      } catch (error) {
        console.error("Error fetching game details:", error);
      }
    };
    const genresGet = async () => {
      let genre = [];
      try {
        const response = await fetch(
          `https://api.rawg.io/api/genres?key=${apiKey}`
        );
        const data = await response.json();
        const genres = data.results;

        for (const genreItem of genres) {
          genre.push({ name: genreItem.name, count: genreItem.games_count });
        }

        setGenre(genre);
        console.log(genre);
      } catch (error) {
        console.error("Error fetching game details:", error);
      }
    };

    const platformsGet = async () => {
      let platformArr = [];
      try {
        const response = await fetch(
          `https://api.rawg.io/api/platforms?key=${apiKey}`
        );
        const data = await response.json();
        const platforms = data.results;
        console.log(platforms);
        for (const platform of platforms) {
          platformArr.push({
            name: platform.name,
            count: platform.games_count,
          });
        }

        setPlatform(platformArr);
      } catch (error) {
        console.error("Error fetching game details:", error);
      }
    };

    genresGet();
    platformsGet();
    highestRatedGames();
    fetchGameDetails();
    EASportGames();
  }, []);
  const showDetails = (element, id) => {
    navigate("/gamedetails", { state: { gameData: element } });
  };
  if (mostPopular === null) {
    return <p>Loading...</p>;
  }
  // You may use different data for other charts

  return (
    <div>
      <Sidebar />
      <Container>
        <Row>
          <h4 style={{ color: "white" }}>Welcome to Game Scout App</h4>
        </Row>
        <Row>
          <Col lg={4}>
            <Card className="scrollable-div" style={{ height: "500px" }}>
              <Card.Header>Most popular games in 2019</Card.Header>
              <Card.Body>
                {mostPopular.map((item, index) => (
                  <Alert
                    onClick={() => showDetails(item)}
                    key={index}
                    className="alert-hover"
                    style={{
                      backgroundImage: `url(${item.background_image})`,
                      color: "white",
                    }}
                  >
                    <p>
                      {item.name}{" "}
                      <Button
                        className="btn btn-sm"
                        key={index}
                        variant={ratingToVariant[Math.ceil(item.rating)]}
                      >
                        ★ {item.rating}
                      </Button>
                    </p>
                    <hr />
                    <p>Released : {item.released}</p>
                    <p>
                      Platforms :{" "}
                      {item.platforms
                        .map((platformItem, index) => (
                          <span key={index}>{platformItem.platform.name}</span>
                        ))
                        .reduce((prev, curr, index) => [prev, ", ", curr])}
                    </p>
                    <p className="view-details" style={{ display: "none" }}>
                      View Details
                    </p>
                  </Alert>
                ))}
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4}>
            <Card className="scrollable-div" style={{ height: "500px" }}>
              <Card.Header>Highest rated game by Electronic Arts</Card.Header>
              <Card.Body>
                {easports.map((item, index) => (
                  <Alert
                    onClick={() => showDetails(item)}
                    key={index}
                    className="alert-hover"
                    style={{
                      backgroundImage: `url(${item.background_image})`,
                      color: "white",
                    }}
                  >
                    <p>
                      {item.name}{" "}
                      <Button
                        className="btn btn-sm"
                        key={index}
                        variant={ratingToVariant[Math.ceil(item.rating)]}
                      >
                        ★ {item.rating}
                      </Button>
                    </p>
                    <hr />
                    <p>Released : {item.released}</p>
                    <p>
                      Platforms :{" "}
                      {item.platforms
                        .map((platformItem, index) => (
                          <span key={index}>{platformItem.platform.name}</span>
                        ))
                        .reduce((prev, curr, index) => [prev, ", ", curr])}
                    </p>
                    <p className="view-details" style={{ display: "none" }}>
                      View Details
                    </p>
                  </Alert>
                ))}
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4}>
            <Card className="scrollable-div" style={{ height: "500px" }}>
              <Card.Header>Highest rated games from 2001</Card.Header>
              <Card.Body>
                {highRated.map((item, index) => (
                  <Alert
                    onClick={() => showDetails(item)}
                    key={index}
                    className="alert-hover"
                    style={{
                      backgroundImage: `url(${item.background_image})`,
                      color: "white",
                    }}
                  >
                    <p>
                      {item.name}{" "}
                      <Button
                        className="btn btn-sm"
                        key={index}
                        variant={ratingToVariant[Math.ceil(item.rating)]}
                      >
                        ★ {item.rating}
                      </Button>
                    </p>
                    <hr />
                    <p>Released : {item.released}</p>
                    <p>
                      Platforms :{" "}
                      {item.platforms
                        .map((platformItem, index) => (
                          <span key={index}>{platformItem.platform.name}</span>
                        ))
                        .reduce((prev, curr, index) => [prev, ", ", curr])}
                    </p>
                    <p className="view-details" style={{ display: "none" }}>
                      View Details
                    </p>
                  </Alert>
                ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
