import React from "react";
import "./music.css";
import { useNavigate } from "react-router-dom";
function Musics({ data }) {
  const navigate = useNavigate();
  function handleRedirect(e) {
    navigate(`/playlist/${data.id}`);
  }

  return (
    <div className="containerr">
      <div onClick={handleRedirect} className="wrapper">
        <div className="content">
          <img
            width={182}
            height={182}
            src={data.images[0].url}
            alt={data.name}
          />
          <h2>{data.name}</h2>
          <p>{data.description}</p>
        </div>
      </div>
    </div>
  );
}

export default Musics;
