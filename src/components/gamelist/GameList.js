import React, { useState, useEffect } from 'react';
import {
  Card,
  Col,
  Row,
  Container,
  Form,
  FormControl,
  Button,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './GameList.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import { DartsSpinnerOverlay } from 'react-spinner-overlay';

const GameList = (props) => {
  const [games, setGames] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearchFunctionality(event);
    }
  };

  const handleSearchFunctionality = async (event) => {
    event.preventDefault();
    setGames([]);
    setCurrentPage(1);
    setHasMore(true);
    getGameListFunction();
  };

  const getGameListFunction = async () => {
    setLoading(true);
    let REACT_APP_RAWG = '3896265182c3481ab09163b92a9cd5bd';
    try {
      const response = await fetch(
        `https://api.rawg.io/api/games?key=${REACT_APP_RAWG}&page=${currentPage}&search=${searchText}&page_size=15`,
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
      console.error('Error fetching data from RAWG API:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getGameListFunction();
  }, []);

  const navigate = useNavigate();

  const showDetails = (element, id) => {
    console.log(element);
    navigate('/gamedetails', { state: { gameData: element } });
  };

  return (
    <>
      <Container id="container-custom">
        <Form className="d-flex" id="search-bar">
          <FormControl
            type="search"
            placeholder="Search"
            className="mr-2"
            aria-label="Search"
            value={searchText}
            onChange={handleSearch}
            id="search-input"
            onKeyPress={handleKeyPress}
          />
          <Button
            variant="outline-success"
            id="search-button"
            type="submit"
            onClick={handleSearchFunctionality}
          >
            Search
          </Button>
        </Form>

        <div className="gameCardListDiv">
          <DartsSpinnerOverlay
            overlayColor="rgb(255 255 255 / 38%)"
            size={90}
            loading={loading}
            color="white"
            borderWidth="8"
            borderHeight="25"
          />
          <InfiniteScroll
            dataLength={games.length}
            next={getGameListFunction}
            hasMore={hasMore}
            endMessage={
              <p id="end-marker-para">
                <b>Thats all!</b>
              </p>
            }
          >
            <Row xs={1} md={2} lg={3} className="g-4">
              {games.map((element, id) => (
                <Col key={id}>
                  <Card
                    onClick={() => showDetails(element, id)}
                    id="card-custom"
                  >
                    <Card.Img
                      variant="top"
                      className="imageCustomSize"
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
        </div>
      </Container>
    </>
  );
};

GameList.propTypes = {};

export default GameList;
