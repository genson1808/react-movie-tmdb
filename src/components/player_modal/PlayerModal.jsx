import React from "react";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import { Modal } from "react-bootstrap";
import ReactPlayer from "react-player";

const PlayerModal = (props) => {
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
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ background: "#000" }}>
        <ReactPlayer
          className="container-fluid"
          url={youtubeUrl + props.videoKey}
          playing
          width="100%"
        ></ReactPlayer>
      </Modal.Body>
    </Modal>
  );
};

export default React.memo(PlayerModal);
