/*********************************************************************************
*  WEB422 – Assignment 3
*  I declare that this assignment is my own work in accordance with Seneca Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Ahmad Mashal  Student ID: 149015224 Date: 16/04/2024
*
*
********************************************************************************/ 



import React from 'react';
import { MongoClient } from 'mongodb';
import { useRouter } from 'next/router';
import { Accordion, Container } from 'react-bootstrap';
import PageHeader from './components/PageHeader';
import MovieDetails from './components/MovieDetails';

const Home = ({ movies, page }) => {
  const router = useRouter();

  // Function to handle page navigation
  const handleSelectPage = (newPage) => {
    router.push(`/?page=${newPage}`);
  };

  return (
    <Container>
      <PageHeader text={<strong>Film Collection: Sorted by Date</strong>} />
        <Accordion defaultActiveKey="0">
        {movies.map((movie, index) => (
          <Accordion.Item key={movie._id} eventKey={index.toString()}>
            <Accordion.Header>
            <strong>{movie.title}</strong>&nbsp;({movie.year}): Directed By {movie.directors}
            </Accordion.Header>
            <Accordion.Body>
              <MovieDetails movie={movie} />
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
      {/* Pagination Control */}
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <a className="page-link" href="#" onClick={() => handleSelectPage(page - 1)} aria-label="Previous" rel="prev">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          {/* Currently showing only the active page number */}
          <li className="page-item active" aria-current="page">
            <span className="page-link">{page}</span>
          </li>
          <li className="page-item">
            <a className="page-link" href="#" onClick={() => handleSelectPage(page + 1)} aria-label="Next" rel="next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </Container>
  );
};

export async function getServerSideProps(context) {
  const client = new MongoClient(process.env.MONGODB_URI, {
    
  });

  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);

    // Calculate pagination details
    const currentPage = parseInt(context.query.page) || 1;
    const moviesPerPage = 10;
    const skip = (currentPage - 1) * moviesPerPage;

    // Fetch movies from MongoDB for the requested page
    const movies = await db.collection('movies')
      .find({})
      .sort({ year: 1 }) // Sort by year in ascending order
      .skip(skip)
      .limit(moviesPerPage)
      .toArray();

    return {
      props: {
        movies: JSON.parse(JSON.stringify(movies)), // Serialize the MongoDB data
        page: currentPage,
      },
    };
  } catch (error) {
    console.error('Failed to fetch movies:', error);
    return {
      props: {
        movies: [],
        page: 1,
      },
    };
  } finally {
    await client.close();
  }
}

export default Home;
