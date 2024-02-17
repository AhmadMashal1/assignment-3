// pages/about.js


import React from 'react';
import { MongoClient } from 'mongodb';
import { Container, Row, Col, Card } from 'react-bootstrap';
import PageHeader from './components/PageHeader'; // Adjust the import path as necessary
import MovieDetails from './components/MovieDetails'; // Adjust the import path as necessary

const About = ({ movie }) => {
  return (
    <Container>
      <PageHeader text={<><strong>About the Developer:</strong> Ahmad Mashal</>} />

        <Row className="mt-3">
        <Col>
          <p>Ahmad Mashal is a dedicated software developer currently pursuing a degree in computer science at Seneca College. 
            With a keen interest in technology and a passion for coding, Ahmad enjoys crafting web applications and exploring 
            new frameworks and tools to enhance his skills.Ahmad's journey into the world of software development began with
             a curiosity about how things work and a drive to create solutions to real-world problems. This passion led him 
             to delve into various programming languages and platforms, honing his abilities to develop efficient and user-friendly
              software.In addition to his academic pursuits, Ahmad actively engages in personal projects and contributes to 
              open-source initiatives, showcasing his commitment to continuous learning and community collaboration. He enjoys 
              the challenges of problem-solving and the creative process of turning ideas into functional software solutions.</p>

          <p>It's difficult to choose a favorite, but <a href={`/movies/${encodeURIComponent(movie.title)}`}>{movie.title}</a> (released in {movie.year}) is one that I always enjoy watching.</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <MovieDetails movie={movie} />
        </Col>
      </Row>
    </Container>
  );
};

export async function getStaticProps() {
  let client;
  let movie;
  const movieTitle = "Robin Hood"; // Replace with the title of the movie you want to fetch

  try {
    client = await MongoClient.connect(process.env.MONGODB_URI, {});
    const db = client.db(process.env.DB_NAME);

    // Fetch the specific movie by title
    movie = await db.collection('movies').findOne({ title: movieTitle });

    // Ensure that the _id is converted to a string if it's going to be used in the client-side
    if (movie) {
      movie._id = movie._id.toString();
    }

  } catch (error) {
    console.error('Failed to fetch the movie.', error);
    movie = null;
  }

  if (client) {
    await client.close();
  }

  return {
    props: {
      movie: movie ? JSON.parse(JSON.stringify(movie)) : null,
    },
  };
}

export default About;
