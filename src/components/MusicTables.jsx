// import React, { useState, useRef, useEffect } from "react";
// import "./tables.css";
// import Controls from "./Controls";

// function MusicTables({ data, handelLink, index }) {
//   const { track } = data;
//   const [isClicked, setIsClicked] = useState(false);
//   const [imageError, setImageError] = useState(false);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const audioRef = useRef(new Audio(track.preview_url));

//   useEffect(() => {
//     const storedIsPlaying = localStorage.getItem("isPlaying") === "true";
//     setIsPlaying(storedIsPlaying);
//   }, []);

//   useEffect(() => {
//     const storedIsClicked =
//       localStorage.getItem(`isClicked_${index}`) === "true";
//     setIsClicked(storedIsClicked);
//   }, [index]);

//   useEffect(() => {
//     localStorage.setItem("isPlaying", isPlaying);
//   }, [isPlaying]);

//   const handleIconClick = () => {
//     const newIsClicked = !isClicked;
//     setIsClicked(newIsClicked);
//     localStorage.setItem(`isClicked_${index}`, newIsClicked);
//   };

//   const handleError = () => {
//     setImageError(true);
//   };

//   const handleClick = () => {
//     if (track.preview_url) {
//       setIsPlaying(!isPlaying);
//       const audio = audioRef.current;
//       if (isPlaying) {
//         audio.pause();
//       } else {
//         audio.play();
//       }
//     }
//   };

//   return (
//     <div className="music-row">
//       <span
//         style={{ marginTop: "10px", display: "inline-block" }}
//         onClick={handleClick}
//       >
//         {isPlaying ? "⏸️" : "▶️"}
//       </span>
//       <div style={{ display: "flex", alignItems: "center" }}>
//         <div className="music-cover" onClick={handleClick}>
//           {imageError ? (
//             <img
//               src="path_to_your_image/image_error_placeholder.png"
//               alt="Error"
//             />
//           ) : (
//             <img
//               src={track.album.images[0].url}
//               alt="Album Cover"
//               onError={handleError}
//             />
//           )}
//         </div>
//         <div className="music-details">
//           <div className="music-title">{track.name}</div>
//           <div className="music-artist">{track.album.artists[0].name}</div>
//         </div>
//         <div className="music-album">{track.album.name}</div>
//         <div className="music-time">
//           <span
//             role="img"
//             aria-label={isClicked ? "Unfavorite" : "Favorite"}
//             onClick={handleIconClick}
//           >
//             {isClicked ? "💚" : "🤍"}
//           </span>
//           <span>
//             {Math.floor(track.duration_ms / 60000)}:
//             {((track.duration_ms % 60000) / 1000).toFixed(0).padStart(2, "0")}
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default MusicTables;
import React, { useState, useRef, useEffect } from "react";
import "./tables.css";
import Controls from "./Controls";
import Likes from "../pages/Likes";

function MusicTables({ data, handelLink, index }) {
  <Likes index={index}></Likes>;
  const { track } = data;
  const [isClicked, setIsClicked] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio(track.preview_url));

  useEffect(() => {
    const storedIsPlaying =
      localStorage.getItem(`isPlaying_${index}`) === "true";
    setIsPlaying(storedIsPlaying);
  }, [index]);

  useEffect(() => {
    const storedIsClicked =
      localStorage.getItem(`isClicked_${index}`) === "true";
    setIsClicked(storedIsClicked);
  }, [index]);

  useEffect(() => {
    if (isPlaying) {
      localStorage.setItem(`isPlaying_${index}`, "true");
      localStorage.setItem(`trackPlaying_${index}`, JSON.stringify(track));
    } else {
      localStorage.removeItem(`isPlaying_${index}`);
      localStorage.removeItem(`trackPlaying_${index}`);
    }
  }, [isPlaying, index, track]);

  useEffect(() => {
    if (isClicked) {
      localStorage.setItem(`isClicked_${index}`, "true");
      localStorage.setItem(`trackClicked_${index}`, JSON.stringify(track));
    } else {
      localStorage.removeItem(`isClicked_${index}`);
      localStorage.removeItem(`trackClicked_${index}`);
    }
  }, [isClicked, index, track]);

  const handleIconClick = () => {
    const newIsClicked = !isClicked;
    setIsClicked(newIsClicked);
  };

  const handleError = () => {
    setImageError(true);
  };

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
  // console.log(tracks);
  return (
    <div className="music-row">
      <span
        style={{ marginTop: "10px", display: "inline-block" }}
        onClick={handleClick}
      >
        {isPlaying ? "⏸️" : "▶️"}
      </span>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div className="music-cover" onClick={handleClick}>
          {imageError ? (
            <img
              src="path_to_your_image/image_error_placeholder.png"
              alt="Error"
            />
          ) : (
            <img
              src={track.album.images[0].url}
              alt="Album Cover"
              onError={handleError}
            />
          )}
        </div>
        <div className="music-details">
          <div className="music-title">{track.name}</div>
          <div className="music-artist">{track.album.artists[0].name}</div>
        </div>
        <div
          style={{ marginLeft: "130px", width: "360px" }}
          className="music-album"
        >
          {track.album.name}
        </div>
        <div className="music-time">
          <span
            role="img"
            aria-label={isClicked ? "Unfavorite" : "Favorite"}
            onClick={handleIconClick}
          >
            {isClicked ? "💚" : "🤍"}
          </span>
          <span>
            {Math.floor(track.duration_ms / 60000)}:
            {((track.duration_ms % 60000) / 1000).toFixed(0).padStart(2, "0")}
          </span>
        </div>
      </div>
    </div>
  );
}

export default MusicTables;
