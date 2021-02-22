import React from "react";
/* style */
import "./moviecard.scss";

const MovieCard = ({ movie, genre = [] }) => {
  const namesGenre = movie.genre_ids.map(
    (movieId) => genre.length && genre.find((el) => el.id === movieId).name
  );
  const name = namesGenre.join(", ");

  const cardMovieStyle = {
    backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movie.poster_path})`,
    width: "100%",
    height: "100%",
    position: "relative",
    borderRadius: "1rem"
  };

  return (
    <div className="card-movie" style={cardMovieStyle}>
      <div className="card-movie--blur-background">
        <div className="card-movie_image">
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title + "poster"}
          />
        </div>
        <div className="card-movie_content">
          <div className="card-content_header">
            <h3 className="card-content--title">{movie.title}</h3>
            <p>{name !== "" ? "genre: " + name : "no gender informed"}</p>
          </div>
          <div className="card-content_info">
            <div className="card-info">
              <span>
                {movie.release_date === "" || movie.release_date === undefined
                  ? "no date entered"
                  : movie.release_date.substring(0, 4)}
              </span>
              <p className="card-info_text">Realease Date</p>
            </div>
            <div className="card-info card-average">
              <span className="span-average">{movie.vote_average}</span>
              <p className="card-info_text">Average</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
