import React from "react";
import "./Good.css";
import { useNavigate } from "react-router-dom";
function Good(props) {
  const navigate = useNavigate();
  function handleRedirect() {
    navigate(`/playlist/${props.data.id}`);
  }
  return (
    <div className="good-contyainerr">
      <div className="Good" onClick={handleRedirect}>
        <img
          width={82}
          height={82}
          src={props.data.images[0].url}
          alt={props.data.name}
        />
        <h5>{props.data.name}</h5>
      </div>
    </div>
  );
}

export default Good;
