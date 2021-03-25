import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import {
  fetchMovies,
  fetchGenre,
  fetchMoviesByGenre,
  fetchPersons,
  fetchToprateMovie,
  fetchMovieVideos,
} from "../../service/index";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import FooterComponent from "../footer/footer";
import PlayerModal from "../player_modal/PlayerModal";

const Home = () => {
  const [nowPlaying, setNowPlaying] = useState([]);
  const [genres, setGenres] = useState([]);
  const [movieByGenre, setMovieByGenre] = useState([]);
  const [persons, setPersons] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [video, setVideo] = useState([]);
  const [title, setTitle] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchAPI = async () => {
      setNowPlaying(await fetchMovies());
      setGenres(await fetchGenre());
      setMovieByGenre(await fetchMoviesByGenre());
      setPersons(await fetchPersons());
      setTopRated(await fetchToprateMovie());
    };
    fetchAPI();
  }, []);

  useEffect(() => {
    if (nowPlaying) {
      console.log(nowPlaying);
    }
  }, [nowPlaying]);

  const handlerGenreClick = async (genre_id) => {
    setMovieByGenre(await fetchMoviesByGenre(genre_id));
  };

  const handlePlayerClick = async (title, id) => {
    setVideo(await fetchMovieVideos(id));
    setTitle(title);
    setIsOpen(true);
  };

  const movies = nowPlaying.slice(0, 5).map((item, index) => {
    return (
      <Carousel.Item interval={2000} key={index}>
        <img
          style={{ height: 600 }}
          className="d-block w-100"
          src={item.backPoster}
          alt={item.title}
        />
        <div className="carousel-center">
          <i
            onClick={() => handlePlayerClick(item.title, item.id)}
            className="far fa-play-circle"
            style={{ fontSize: 95, color: "#f4c10f", cursor: "pointer" }}
          ></i>
        </div>
        <Carousel.Caption style={{ textAlign: "center", fontSize: 35 }}>
          {item.title}
        </Carousel.Caption>
      </Carousel.Item>
    );
  });

  const genreList = genres.map((item, index) => {
    return (
      <li className="list-inline-item" key={index}>
        <button
          type="button"
          className="btn btn-outline-info"
          onClick={() => {
            handlerGenreClick(item.id);
          }}
        >
          {item.name}
        </button>
      </li>
    );
  });

  const movieList = movieByGenre.slice(0, 4).map((item, index) => {
    return (
      <div className="col-md-3 col-sm-6" key={index}>
        <div className="card">
          <Link to={`/movie/${item.id}`}>
            <img src={item.poster} className="img-fluid" alt={item.title} />
          </Link>
        </div>
        <div className="mt-3">
          <p style={{ fontWeight: "bolder" }}>{item.title}</p>
          <p>Rated: {item.rating}</p>
          <ReactStars
            count={item.rating}
            size={20}
            color={"#f4c10f"}
          ></ReactStars>
        </div>
      </div>
    );
  });

  const trendingPersons = persons.slice(0, 4).map((p, i) => {
    return (
      <div className="col-md-3 col-sm-6 text-center" key={i}>
        <img
          className="img-fluid rounded-circle mx-auto d-block"
          src={p.profileImg}
          alt={p.name}
        />
        <p className="font-weight-bold text-center">{p.name}</p>
        <p
          className="font-weight-light text-center"
          style={{ color: "#5a606b" }}
        >
          Trending for {p.known}
        </p>
      </div>
    );
  });

  const topRatedList = topRated.slice(0, 4).map((item, index) => {
    return (
      <div className="col-md-3 col-sm-6" key={index}>
        <div className="card">
          <Link to={`/movie/${item.id}`}>
            <img src={item.poster} className="img-fluid" alt={item.title} />
          </Link>
        </div>
        <div className="mt-3">
          <p style={{ fontWeight: "bolder" }}>{item.title}</p>
          <p>Rated: {item.rating}</p>
          <ReactStars
            count={item.rating}
            size={20}
            color={"#f4c10f"}
          ></ReactStars>
        </div>
      </div>
    );
  });

  return (
    <div className="container">
      <PlayerModal
        show={isOpen}
        onHide={() => {
          setIsOpen(false);
        }}
        videoKey={video.key}
        title={title}
      ></PlayerModal>
      <div className="row">
        <div className="col">
          <Carousel
            slide={false}
            fade={false}
            style={{ width: "100%" }}
            indicators={false}
          >
            {movies}
          </Carousel>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col">
          <ul className="list-inline">{genreList}</ul>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col">
          <div className="float-right">
            <i className="far fa-arrow-alt-circle-right"></i>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col">
          <div className="float-left">
            <i className="far fa-arrow-alt-circle-left"></i>
          </div>
        </div>
      </div>
      <div className="row mt-3">{movieList}</div>
      <div className="row mt-3">
        <div className="col">
          <p className="font-weight-bold" style={{ color: "#5a606b" }}>
            TRENDING PERSONS ON THIS WEEK
          </p>
        </div>
      </div>
      <div className="row mt-3">{trendingPersons}</div>
      <div className="row mt-3">
        <div className="col">
          <p className="font-weight-bold" style={{ color: "#5a606b" }}>
            TOP RATED MOVIES
          </p>
        </div>
      </div>
      <div className="row mt-3">{topRatedList}</div>

      <FooterComponent />
    </div>
  );
};

export default React.memo(Home);
