import React, { useState } from "react";
/* style */
import "./header.scss";

const Header = ({ setMovieInput, setPage, setMovies }) => {
  const [userInput, setUserInput] = useState("");

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  return (
    <header className="header-container">
      <h1>SeekMovie</h1>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          setMovieInput(userInput);
          setMovies([]);
          setPage(1);
          setUserInput("");
        }}
      >
        <div className="form-btn-in">
          <label className="label" htmlFor="userInput">
            <input
              className="input"
              type="text"
              name="userInput"
              placeholder="Type a movie here"
              value={userInput}
              onChange={handleChange}
            />
          </label>
          <button className="form-btn" type="submit">
            Search
          </button>
        </div>
      </form>
    </header>
  );
};

export default Header;
