// pages/movies/[title].js
import React from 'react';
import { MongoClient } from 'mongodb';
import { useRouter } from 'next/router';
import MovieDetails from '../components/MovieDetails';
import PageHeader from '../components/PageHeader';

const MoviePage = ({ movie }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>; // or a loading spinner
  }

  if (!movie) {
    return <div>Movie not found</div>; // You could render a custom 404 page here
  }

  return (
    <div>
      <PageHeader text={<strong>{movie.title}</strong>} />

      <MovieDetails movie={movie} />
    </div>
  );
};

export async function getServerSideProps({ params }) {
  const { title } = params;
  let client;
  let movie;

  try {
    client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db(process.env.DB_NAME);
    // Make sure the query is case-insensitive if the titles have varying cases
    movie = await db.collection('movies').findOne({ title: new RegExp(title, 'i') });
  } catch (error) {
    console.error('Failed to fetch movie details', error);
  } finally {
    if (client) {
      await client.close();
    }
  }

  return {
    props: {
      movie: movie ? JSON.parse(JSON.stringify(movie)) : null,
    },
  };
}

export default MoviePage;
