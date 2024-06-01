import React, { useState } from "react";
import styled from "@emotion/styled";
import {
  FaPlay,
  FaPause,
  FaHeart,
  FaThumbsUp,
  FaThumbsDown,
  FaDownload,
  FaEllipsisH,
} from "react-icons/fa";

const ControlsWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 5px;

  .button {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    cursor: pointer;
  }

  .play-button {
    background-color: #1db954;
    color: white;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    font-size: 20px;
  }

  .icon-button {
    color: white;
    font-size: 20px;
  }

  .like-button {
    font-size: 20px;
  }

  .search-container {
    display: flex;
    align-items: center;
    margin-left: auto;

    .search-icon {
      margin-right: 10px;
      color: white;
      font-size: 20px;
    }

    .custom-order {
      color: white;
      font-size: 16px;
    }
  }
`;

const Controls = ({ onClick }) => {
  const handleClick = () => {
    if (track.preview_url) {
      setIsPlaying(!isPlaying);
      const audio = audioRef.current;
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    }
  };
  console.log(65, onClick);
  const [liked, setLiked] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [likeColor, setLikeColor] = useState("white");

  const handleLikeClick = () => {
    setLiked(!liked);
    setLikeColor(!liked ? "red" : "white");
  };

  const handlePlayClick = () => {
    setIsPlaying(!isPlaying);
  };

  const handleHeartClick = () => {
    setLiked(!liked);
    setLikeColor(liked ? "red" : "white");
  };

  return (
    <ControlsWrapper onClick={handleClick} liked={liked}>
      <div className="button play-button" onClick={handlePlayClick}>
        {isPlaying ? <FaPause /> : <FaPlay />}
      </div>
      <div
        className={`button icon-button like-button`}
        onClick={handleLikeClick}
      >
        <FaHeart
          style={{ color: liked ? likeColor : "transparent" }}
          onClick={handleHeartClick}
        />
      </div>
      <div className="button icon-button">
        <FaDownload />
      </div>
      <div className="button icon-button">
        <FaEllipsisH />
      </div>
      <div className="search-container">
        <div className="search-icon">
          <FaPlay />
        </div>
        <div className="custom-order">Custom order</div>
      </div>
    </ControlsWrapper>
  );
};

export default Controls;
