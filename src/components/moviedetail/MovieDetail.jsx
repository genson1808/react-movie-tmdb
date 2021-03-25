import React, { useState, useEffect } from "react";
import {
  fetchMovieDetail,
  fetchMovieVideos,
  fetchCasts,
  fetchSimilarMovie,
} from "../../service";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Carousel from "react-bootstrap/Carousel";
import { Modal } from "react-bootstrap";
import ReactPlayer from "react-player";
import ReactStars from "react-rating-stars-component";
import FooterComponent from "../footer/footer";
import { Link } from "react-router-dom";
import PlayerModal from "../player_modal/PlayerModal";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";

const MovieDetail = () => {
  let genres = [];
  const { id } = useParams();
  const [detail, setDetail] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [video, setVideo] = useState([]);
  const [casts, setCasts] = useState([]);
  const [similarMovie, setSimilarMovie] = useState([]);

  useEffect(() => {
    console.log("id: ", id);
    const fetchAPI = async () => {
      setDetail(await fetchMovieDetail(id));
      setVideo(await fetchMovieVideos(id));
      setCasts(await fetchCasts(id));
      setSimilarMovie(await fetchSimilarMovie(id));
    };

    fetchAPI();
  }, [id]);

  genres = detail.genres;

  const MoviePlayerModal = (props) => {
    const youtubeUrl = "https://www.youtube.com/watch?v=";
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-vcenter"
            style={{
              color: "#000",
              fontWeight: "bolder",
            }}
          >
            {detail.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: "#000" }}>
          <ReactPlayer
            className="container-fluid"
            url={youtubeUrl + video.key}
            playing
            width="100%"
          ></ReactPlayer>
        </Modal.Body>
      </Modal>
    );
  };

  let genresList;
  if (genres) {
    genresList = genres.map((g, i) => {
      return (
        <li className="list-inline-item" key={i}>
          <button type="button" className="btn btn-outline-info">
            {g.name}
          </button>
        </li>
      );
    });
  }

  const castList = casts.slice(0, 4).map((c, i) => {
    return (
      <div className="col-md-3 text-center" key={i}>
        <img
          className="img-fluid rounded-circle mx-auto d-block"
          src={c.img}
          alt={c.name}
        ></img>
        <p className="font-weight-bold text-center">{c.name}</p>
        <p
          className="font-weight-light text-center"
          style={{ color: "#5a606b" }}
        >
          {c.character}
        </p>
      </div>
    );
  });

  const similarMovieList = similarMovie.slice(0, 4).map((item, index) => {
    return (
      <div className="col-md-3 col-sm-6" key={index}>
        <div className="card">
          <Link to={`/movie/${item.id}`}>
            <img className="img-fluid" src={item.poster} alt={item.title}></img>
          </Link>
        </div>
        <div className="mt-3">
          <p style={{ fontWeight: "bolder" }}>{item.title}</p>
          <p>Rated: {item.rating}</p>
          <ReactStars
            count={item.rating}
            size={20}
            color1={"#f4c10f"}
          ></ReactStars>
        </div>
      </div>
    );
  });

  return (
    <div className="container">
      <div className="row mt-2">
        <PlayerModal
          show={isOpen}
          onHide={() => {
            setIsOpen(false);
          }}
          videoKey={video.key}
          title={detail.title}
        ></PlayerModal>
        <div className="col text-center" style={{ width: "100%" }}>
          <img
            className="img-fluid"
            src={`https://image.tmdb.org/t/p/original/${detail.backdrop_path}`}
            alt={detail.title}
          />
          <div className="carousel-center">
            <i
              onClick={() => setIsOpen(true)}
              className="far fa-play-circle"
              style={{ fontSize: 95, color: "#f4c10f", cursor: "pointer" }}
            ></i>
          </div>
          <Carousel.Caption style={{ textAlign: "center", fontSize: 35 }}>
            {detail.title}{" "}
          </Carousel.Caption>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col">
          <p style={{ color: "#5a606b", fontWeight: "bolder" }}>GENRE</p>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col">
          <ul className="list-inline">{genres && genresList}</ul>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col">
          <div className="text-center">
            <ReactStars
              count={detail.vote_average}
              size={20}
              color1="#f4c10f"
            ></ReactStars>
          </div>
          <div className="mt-3" style={{ color: "#B3AFC2" }}>
            <p style={{ color: "#5a606b", fontWeight: "bolder" }}>OVERVIEW</p>
            {detail.overview}
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-3">
          <p style={{ color: "#5a606b", fontWeight: "bolder" }}>RELEASE DATE</p>
          <p style={{ color: "#f4c10f" }}>{detail.release_date}</p>
        </div>
        <div className="col-md-3">
          <p style={{ color: "#5a606b", fontWeight: "bolder" }}>RUN TIME</p>
          <p style={{ color: "#f4c10f" }}>{detail.runtime}</p>
        </div>
        <div className="col-md-3">
          <p style={{ color: "#5a606b", fontWeight: "bolder" }}>BUDGET</p>
          <p style={{ color: "#f4c10f" }}>{detail.budget}</p>
        </div>
        <div className="col-md-3">
          <p style={{ color: "#5a606b", fontWeight: "bolder" }}>HOMEPAGE</p>
          <p style={{ color: "#f4c10f" }}>{detail.homepage}</p>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col">
          <p style={{ color: "#5a606b", fontWeight: "bolder" }}>CASTS</p>
        </div>
      </div>
      <div className="row mt-3">{castList}</div>
      <div className="row mt-3">
        <div className="col">
          <p style={{ color: "#5a606b", fontWeight: "bolder" }}>
            SIMILAR MOVIES
          </p>
        </div>
      </div>
      <div className="row mt-3">{similarMovieList}</div>:w
      <FooterComponent />
    </div>
  );
};

export default React.memo(MovieDetail);
