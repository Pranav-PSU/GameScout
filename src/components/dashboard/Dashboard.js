import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Container, Alert, Button } from 'react-bootstrap';
import { Bar, Doughnut, Line, Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import { DartsSpinnerOverlay } from 'react-spinner-overlay';

const apiKey = '3896265182c3481ab09163b92a9cd5bd';
const gameID = 'fifa-22-xbox-one';

const ratingToVariant = {
  1: 'danger',
  2: 'danger',
  3: 'warning',
  4: 'warning',
  5: 'success',
};
const Dashboard = () => {
  const [mostPopular, setMostPopular] = useState(null);
  const [easports, setEAsports] = useState(null);
  const [highRated, setHighRated] = useState(null);
  const [genreName, setGenreName] = useState(null);
  const [genreCount, setGenreCount] = useState(null);
  const [platformName, setPlatformName] = useState(null);
  const [platformCount, setPlatformCount] = useState(null);
  // const [game, setGame] = useState(null);
  const navigate = useNavigate();
  const date = '2010-01-01';
  const chartRatingdate = '2022-01-01,2022-12-31';

  const [topRatedGameYear, setTopRatedGameYear] = useState(null);
  const [ratingCount, setRatingCount] = useState(null);
  const [topRatedGames, setTopRatedGames] = useState(null);
  const [loading, setLoading] = useState(true);

  let backgroundColors = [
    'rgba(54, 162, 235, 0.8)',
    'rgba(255, 206, 86, 0.8)',
    'rgba(255, 99, 132, 0.8)',
    'rgba(75, 192, 192, 0.8)',
    'rgba(153, 102, 255, 0.8)',
    'rgba(255, 159, 64, 0.8)',
    'rgba(199, 199, 199, 0.8)',
    'rgba(83, 102, 255, 0.8)',
    'rgba(40, 159, 64, 0.8)',
    'rgba(210, 199, 199, 0.8)',
    'rgba(78, 52, 199, 0.8)',
  ];

  const plugin = {
    id: 'customCanvasBackgroundColor',
    beforeDraw: (chart, args, options) => {
      const { ctx } = chart;
      ctx.save();
      ctx.globalCompositeOperation = 'destination-over';
      ctx.fillStyle = '#1e0707';
      ctx.fillRect(0, 0, chart.width, chart.height);
      ctx.restore();
    },
  };

  const dataRatingcCart = {
    labels: topRatedGames,
    datasets: [
      {
        data: ratingCount,
        backgroundColor: backgroundColors,
      },
    ],
  };
  const dataPieChart = {
    labels: genreName,
    datasets: [
      {
        data: genreCount,
        backgroundColor: backgroundColors,
      },
    ],
  };
  const dataLineChart = {
    labels: platformName,
    datasets: [
      {
        data: platformCount,
        backgroundColor: backgroundColors,
      },
    ],
  };
  const optionForChart = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 2,
      },
      arc: {
        borderWidth: 0,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        display: true,
        labels: {
          color: 'rgb(210,210,210)',
          font: {
            size: 15,
          },
          padding: 20,
        },
      },
      title: {
        display: true,
        text: '',
      },
      customCanvasBackgroundColor: {
        color: 'maroon',
      },
    },
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 20,
        right: 20,
        top: -20,
        bottom: 20,
      },
    },
  };

  const optionForBarChart = {
    scales: {
      y: {
        ticks: {
          color: 'rgb(210,210,210)',
          beginAtZero: true,
          font: { size: 15 },
        },
      },
      x: {
        ticks: { color: 'rgb(210,210,210)', beginAtZero: true },
      },
    },
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 1,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: '',
      },
      customCanvasBackgroundColor: {
        color: 'maroon',
      },
    },
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 20,
        right: 20,
        top: -20,
        bottom: 20,
      },
    },
  };

  const pluginsForChart = [plugin];

  useEffect(() => {
    const fetchGameDetails = async () => {
      // setLoading(true)
      try {
        const response = await fetch(
          `https://api.rawg.io/api/games?dates=2019-01-01,2019-12-31&ordering=-added&key=${apiKey}`,
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMostPopular(data.results);
      } catch (error) {
        console.error('Error fetching data from RAWG API:', error);
      } finally {
        // setLoading(false)
      }
    };
    const EASportGames = async () => {
      try {
        const response = await fetch(
          `https://api.rawg.io/api/games?ordering=-rating&developers=109&key=${apiKey}`,
        );
        const data = await response.json();

        setEAsports(data.results);
      } catch (error) {
        console.error('Error fetching game details:', error);
      }
    };
    const highestRatedGames = async () => {
      try {
        const response = await fetch(
          `https://api.rawg.io/api/games?dates=&ordering=-rating&key=${apiKey}`,
        );
        const data = await response.json();
        setHighRated(data.results);
      } catch (error) {
        console.error('Error fetching game details:', error);
      }
    };
    const getGenresDataForChart = async () => {
      let genre = [];
      try {
        const response = await fetch(
          `https://api.rawg.io/api/genres?key=${apiKey}`,
        );
        const data = await response.json();
        const genres = data.results;

        for (const genreItem of genres) {
          genre.push({ name: genreItem.name, count: genreItem.games_count });
        }

        genre.sort((a, b) => b.count - a.count);

        let top10 = genre.slice(0, 10);
        let others = genre.slice(10);

        let othersCount = others.reduce((sum, item) => sum + item.count, 0);

        top10.push({ name: 'Others', count: othersCount });

        let genreNames = top10.map((element) => element.name);
        let genreCounts = top10.map((element) => element.count);
        setGenreName(genreNames);
        setGenreCount(genreCounts);
      } catch (error) {
        console.error('Error fetching game details:', error);
      }
    };

    const getPlatformDataForchart = async () => {
      let platformArr = [];
      try {
        const response = await fetch(
          `https://api.rawg.io/api/platforms?key=${apiKey}`,
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

        platformArr.sort((a, b) => b.count - a.count);

        let top10 = platformArr.slice(0, 10);
        let others = platformArr.slice(10);

        let othersCount = others.reduce((sum, item) => sum + item.count, 0);

        top10.push({ name: 'Others', count: othersCount });

        let platformName = top10.map((element) => element.name);
        let platformCount = top10.map((element) => element.count);

        setPlatformName(platformName);
        setPlatformCount(platformCount);
      } catch (error) {
        console.error('Error fetching game details:', error);
      }
    };

    getGenresDataForChart();
    getPlatformDataForchart();
    highestRatedGames();
    fetchGameDetails();
    EASportGames();
    fetRatingDataForchart();
  }, []);

  const fetRatingDataForchart = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.rawg.io/api/games?key=${apiKey}&dates=${chartRatingdate}&ordering=-added&page_size=10`,
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const ratingCountData = data.results.map((element) => ({
        ratingCountDataNames: element.ratings_count,
        topRatedGameNames: element.name,
      }));
      let sortedData = ratingCountData.sort(
        (a, b) => b.ratingCountData - a.ratingCountData,
      );
      let sortedGameNames = sortedData.map((game) => game.topRatedGameNames);
      let sortedRatingCounts = sortedData.map(
        (game) => game.ratingCountDataNames,
      );
      setRatingCount(sortedRatingCounts);
      setTopRatedGames(sortedGameNames);
    } catch (error) {
      console.error('Error fetching data from RAWG API:', error);
    } finally {
      setLoading(false);
    }
  };
  const showDetails = (element, id) => {
    navigate('/gamedetails', { state: { gameData: element } });
  };
  if (mostPopular === null) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {/* <DartsSpinnerOverlay
            overlayColor="rgb(255 255 255 / 38%)"
            size={90}
            loading={loading}
            color="white"
            borderWidth="8"
            borderHeight="25"
          /> */}
      <Container id="main-container">
        <Row>
          <div id="title-container-dashboard">
            <h1 style={{ color: 'white' }}>Game Scout</h1>
          </div>
        </Row>
        <Row>
          <Col>
            <Card className="chartCard" id="chart-card">
              <Card.Header id="card-header">
                Top Rated Games This Year
              </Card.Header>
              <Card.Body>
                {(optionForChart.text = '')}
                <div class="chart-holder-div" id="bar-chart-holder-div">
                  <Bar
                    plugins={pluginsForChart}
                    options={optionForBarChart}
                    data={dataRatingcCart}
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <Card className="chartCard" id="chart-card">
              <Card.Header id="card-header">
                Number Of Games Per Platform
              </Card.Header>
              <Card.Body>
                {(optionForChart.text = '')}
                <div class="chart-holder-div">
                  <Doughnut
                    plugins={pluginsForChart}
                    data={dataLineChart}
                    options={optionForChart}
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={6}>
            <Card className="chartCard" id="chart-card">
              <Card.Header id="card-header">
                Number of Games Present Per Genre
              </Card.Header>
              <Card.Body>
                {(optionForChart.text = '')}
                <div class="chart-holder-div">
                  <Pie
                    plugins={pluginsForChart}
                    options={optionForChart}
                    data={dataPieChart}
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg={4}>
            <Card id="scrollable-div-custom" style={{ height: '500px' }}>
              <Card.Header id="card-header">
                Most popular games in 2019
              </Card.Header>
              <div id="alert-outer-div">
                <div id="alert-container-div" className="scrollable-div">
                  <Card.Body>
                    {mostPopular.map((item, index) => (
                      <Alert
                        id="alert"
                        onClick={() => showDetails(item)}
                        key={index}
                        className="alert-hover"
                        style={{
                          backgroundImage: `url(${item.background_image})`,
                          color: 'white',
                        }}
                      >
                        <p id="alert-para">
                          {item.name}{' '}
                          <Button
                            className="btn btn-sm"
                            key={index}
                            variant={ratingToVariant[Math.ceil(item.rating)]}
                          >
                            ★ {item.rating}
                          </Button>
                        </p>
                        <hr />
                        <p id="alert-para">Released : {item.released}</p>
                        <p id="alert-para">
                          Platforms :{' '}
                          {item.platforms
                            .map((platformItem, index) => (
                              <span key={index}>
                                {platformItem.platform.name}
                              </span>
                            ))
                            .reduce((prev, curr, index) => [prev, ', ', curr])}
                        </p>
                        <p className="view-details" style={{ display: 'none' }}>
                          View Details
                        </p>
                      </Alert>
                    ))}
                  </Card.Body>
                </div>
              </div>
            </Card>
          </Col>
          <Col lg={4}>
            <Card
              id="scrollable-div-custom"
              className="scrollable-div"
              style={{ height: '500px' }}
            >
              <Card.Header id="card-header">
                Highest rated game by Electronic Arts
              </Card.Header>
              <div id="alert-outer-div">
                <div id="alert-container-div" className="scrollable-div">
                  <Card.Body>
                    {easports.map((item, index) => (
                      <Alert
                        id="alert"
                        onClick={() => showDetails(item)}
                        key={index}
                        className="alert-hover"
                        style={{
                          backgroundImage: `url(${item.background_image})`,
                          color: 'white',
                        }}
                      >
                        <p id="alert-para">
                          {item.name}{' '}
                          <Button
                            className="btn btn-sm"
                            key={index}
                            variant={ratingToVariant[Math.ceil(item.rating)]}
                          >
                            ★ {item.rating}
                          </Button>
                        </p>
                        <hr />
                        <p id="alert-para">Released : {item.released}</p>
                        <p id="alert-para">
                          Platforms :{' '}
                          {item.platforms
                            .map((platformItem, index) => (
                              <span key={index}>
                                {platformItem.platform.name}
                              </span>
                            ))
                            .reduce((prev, curr, index) => [prev, ', ', curr])}
                        </p>
                        <p className="view-details" style={{ display: 'none' }}>
                          View Details
                        </p>
                      </Alert>
                    ))}
                  </Card.Body>
                </div>
              </div>
            </Card>
          </Col>
          <Col lg={4}>
            <Card
              id="scrollable-div-custom"
              className="scrollable-div"
              style={{ height: '500px' }}
            >
              <Card.Header id="card-header">
                Highest rated games from 2001
              </Card.Header>
              <div id="alert-outer-div">
                <div id="alert-container-div" className="scrollable-div">
                  <Card.Body>
                    {highRated.map((item, index) => (
                      <Alert
                        id="alert"
                        onClick={() => showDetails(item)}
                        key={index}
                        className="alert-hover"
                        style={{
                          backgroundImage: `url(${item.background_image})`,
                          color: 'white',
                        }}
                      >
                        <p id="alert-para">
                          {item.name}{' '}
                          <Button
                            className="btn btn-sm"
                            key={index}
                            variant={ratingToVariant[Math.ceil(item.rating)]}
                          >
                            ★ {item.rating}
                          </Button>
                        </p>
                        <hr />
                        <p id="alert-para">Released : {item.released}</p>
                        <p id="alert-para">
                          Platforms :{' '}
                          {item.platforms
                            .map((platformItem, index) => (
                              <span key={index}>
                                {platformItem.platform.name}
                              </span>
                            ))
                            .reduce((prev, curr, index) => [prev, ', ', curr])}
                        </p>
                        <p className="view-details" style={{ display: 'none' }}>
                          View Details
                        </p>
                      </Alert>
                    ))}
                  </Card.Body>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
