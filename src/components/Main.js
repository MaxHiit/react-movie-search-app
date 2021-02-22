import React, { useState, useEffect, useCallback } from "react";
/* component */
import Header from "./header/Header";
import MovieCard from "./card/MovieCard";
import BtnTop from "./topBtn/BtnTop";
/* npm package */
import InfiniteScroll from "react-infinite-scroll-component";
/* npm package for API */
import fetch from "isomorphic-fetch";
/* style */
import "./main.scss";

require("dotenv").config();

const Main = () => {
  const [movies, setMovies] = useState([{}]);
  const [moviesNb, setMoviesNb] = useState(0);
  const [genres, setGenres] = useState([]);
  const [page, setPage] = useState(1);
  const [movieInput, setMovieInput] = useState("");

  const fetchMovie = useCallback(
    (movieUSerInput) => {
      const url = !movieInput.length
        ? `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
        : `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${movieUSerInput}&page=${page}`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setMoviesNb(data.total_results);
          setMovies((prevMovie) => [...prevMovie, ...data.results]);
        });
      setPage(page + 1);
    },
    [movieInput, page]
  );

  useEffect(() => {
    getGenre();
    fetchMovie(movieInput);
  }, [movieInput]);

  const getGenre = async () => {
    const urlGenre = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;
    fetch(urlGenre)
      .then((res) => res.json())
      .then((data) => {
        setGenres(data.genres);
      });
  };

  console.log(process.env.REACT_APP_API_KEY);
  return (
    <>
      <Header setMovieInput={setMovieInput} setPage={setPage} setMovies={setMovies} />
      <main className="main">
        <div className="main-container">
          <div className="movie-header">
            <h2>
              {movieInput && movieInput
                ? `Search for "${movieInput}" - ${moviesNb} results found`
                : "Trending Movies"}
            </h2>
          </div>
          <div className="card-list" id="card-list">
            <InfiniteScroll
              dataLength={movies.length}
              next={() => fetchMovie(movieInput)}
              hasMore={true}
              scollableTarget="card-list"
              className="card-list"
            >
              {movies &&
                movies
                  .filter((movie) => movie.poster_path)
                  .map((movie, index) => <MovieCard key={index} movie={movie} genre={genres} />)}
            </InfiniteScroll>
          </div>
        </div>
        <BtnTop />
      </main>
    </>
  );
};

export default Main;
