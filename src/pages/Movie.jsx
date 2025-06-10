
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchmovie } from "../Components/movieslice";
import {
  Container,
  Card,
  Spinner,
  Alert,
  Button,
  Row,
  Col,
} from "react-bootstrap";

const Movie = () => {
  const dispatch = useDispatch();
  const { movie, status, error } = useSelector((state) => state.movie);

  useEffect(() => {
    dispatch(fetchmovie());
  }, [dispatch]);

  const handleReload = () => {
    dispatch(fetchmovie());
  };

  

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4 fw-bold"> Random Movie Explorer</h2>

      {status === "loading" && (
        <div className="d-flex justify-content-center my-5">
          <Spinner animation="border" variant="success" />
        </div>
      )}

      {status === "failed" && (
        <Alert variant="danger" className="text-center">
          Error: {error}
        </Alert>
      )}

      {movie && (
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Card className="shadow-lg border-0 rounded-4 overflow-hidden">
              <Card.Img
                variant="top"
                src={movie.poster_path }
                alt={movie.original_title}
                style={{ objectFit: "cover", height: "400px" }}
              />

              <Card.Body className="p-4">
                <Card.Title className="mb-3 fs-4 text-primary">
                  <strong> Title:</strong> {movie?.original_title || "N/A"}
                </Card.Title>

                <Card.Text className="mb-3 text-muted">
                  <strong>Description:</strong>{" "}
                  {movie?.overview || "No description available."}
                </Card.Text>

                <Card.Text className="mb-2">
                  <strong> Language:</strong>{" "}
                  {movie?.original_language?.toUpperCase() || "N/A"}
                </Card.Text>

                <Card.Text className="mb-2">
                  <strong> Release Date:</strong>{" "}
                  {movie?.release_date || "Unknown"}
                </Card.Text>

                <Card.Text className="mb-2">
                  <strong> Rating:</strong>{" "}
                  {movie?.vote_average !== undefined
                    ? `${movie.vote_average} / 10`
                    : "Not rated"}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      <div className="text-center mt-5">
        <Button onClick={handleReload} variant="warning" className="text-white" size="lg">
           Load Another Movie
        </Button>
      </div>
    </Container>
  );
};

export default Movie;
