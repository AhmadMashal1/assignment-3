// components/MovieDetails.js
import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

const MovieDetails = ({ movie }) => {
  if (!movie) return <p>No movie data</p>;

  return (
    <Container className="mt-4">
      <Row>
        {movie.poster && (
          <Col md={4}>
            <Image src={movie.poster} alt="Movie Poster" className="w-100" />
          </Col>
        )}
        <Col md={movie.poster ? 8 : 12}>
          <p><strong>Directed By:</strong> {movie.directors?.join(', ') || 'N/A'}</p>
          <p>{movie.fullplot}</p>
          <p><strong>Cast:</strong> {movie.cast?.join(', ') || 'N/A'}</p>
          <p><strong>Awards:</strong> {movie.awards?.text || 'N/A'}</p>
          <p><strong>IMDb Rating:</strong> {movie.imdb?.rating || 'N/A'} ({movie.imdb?.votes || 'N/A'} votes)</p>
        </Col>
      </Row>
    </Container>
  );
};

export default MovieDetails;
