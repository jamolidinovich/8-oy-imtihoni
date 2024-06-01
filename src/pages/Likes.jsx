// import React, { useEffect, useRef, useState } from "react";
// import styled from "@emotion/styled";
// import Play from "../components/Play";
// import img from "../assets/1.svg";
// import img1 from "../assets/2.svg";
// import header from "../assets/header.png";
// import Controls from "../components/Controls";
// import time from "../assets/time.svg";

// function Likes() {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [currentTrack, setCurrentTrack] = useState(null); // Track information for the currently playing track

//   const LikesWrapper = styled.div`
//     width: 66%;
//     min-height: 100vh;
//     overflow-y: auto;
//     padding: 20px;
//     background: linear-gradient(180deg, #604ec1 5.09%, #121212 55.28%);
//   `;

//   const [tracks, setTracks] = useState([]); // Ma'lumotlar massivi

//   useEffect(() => {
//     const fetchedTracks = [];
//     for (let i = 0; i <= 150; i++) {
//       const trackClickedItem = localStorage.getItem(`trackClicked_${i}`);
//       if (trackClickedItem) {
//         const trackInfo = JSON.parse(trackClickedItem);
//         const isClicked =
//           trackInfo.isClicked !== undefined ? trackInfo.isClicked : true;
//         if (!isClicked) {
//           localStorage.removeItem(`trackClicked_${i}`);
//         } else {
//           fetchedTracks.push({
//             ...trackInfo,
//             isClicked,
//           });
//         }
//       }
//     }
//     setTracks(fetchedTracks);
//   }, []);

//   const handleIconClick = (index) => {
//     const newTracks = [...tracks];
//     newTracks[index].isClicked = !newTracks[index].isClicked;
//     setTracks(newTracks);
//     if (!newTracks[index].isClicked) {
//       localStorage.removeItem(`trackClicked_${index}`);
//     } else {
//       localStorage.setItem(
//         `trackClicked_${index}`,
//         JSON.stringify(newTracks[index])
//       );
//     }
//   };

//   const handleTrackClick = (track) => {
//     setCurrentTrack(track);
//     setIsPlaying(true);
//   };

//   return (
//     <LikesWrapper>
//       <div
//         style={{
//           position: "fixed",
//           marginTop: "565px",
//           flexDirection: "column",
//           width: "960px",
//           height: "212px",
//         }}
//       >
//         <div style={{ position: "absolute" }}>
//           <Play track={currentTrack} isPlaying={isPlaying} />
//         </div>
//       </div>

//       <img
//         style={{ width: "40px", height: "40px", marginTop: "20px" }}
//         src={img}
//         alt=""
//       />
//       <img
//         style={{ width: "40px", height: "40px", marginLeft: "20px" }}
//         src={img1}
//         alt=""
//       />
//       <img style={{ width: "988px", height: "297px" }} src={header} alt="" />
//       <Controls />
//       <div>
//         <p>Tracks:</p>
//         <table
//           style={{
//             justifyContent: "space-between",
//             display: "flex",
//             borderBottom: "2px solid #666666",
//             marginBottom: "20px",
//             paddingBottom: "10px",
//           }}
//         >
//           <th>
//             # <span></span>TITLE
//           </th>
//           <th></th>
//           <th>ALBUM</th>
//           <th>DATE ADDED</th>
//           <th>
//             <img
//               style={{ width: "32px", height: "32px", marginTop: "-10px" }}
//               src={time}
//               alt=""
//             />
//           </th>
//         </table>
//         <ul>
//           {tracks.map((track, index) => (
//             <table
//               key={index}
//               style={{
//                 justifyContent: "space-between",
//                 display: "flex",
//                 marginBottom: "30px",
//                 borderBottom: "1px solid #282828",
//                 cursor: "pointer",
//               }}
//               onClick={() => handleTrackClick(track)}
//             >
//               <th
//                 style={{
//                   display: "flex",
//                   width: "350px",
//                   gap: "10px",
//                 }}
//               >
//                 <img
//                   style={{ width: "52px", height: "52px" }}
//                   src={track.album.images[0].url}
//                   alt="Album cover"
//                 />
//                 <div>
//                   <p> {track.name}</p>
//                   <p>{track.album.artists[0].name}</p>
//                 </div>
//               </th>
//               <th> </th>
//               <th style={{ width: "300px" }}>
//                 <p> {track.album.name}</p>
//               </th>
//               <th></th>
//               <th></th>
//               <th></th>
//               <th>
//                 <span
//                   role="img"
//                   aria-label={track.isClicked ? "Unfavorite" : "Favorite"}
//                   onClick={() => handleIconClick(index)}
//                 >
//                   {track.isClicked ? "💚" : "🤍"}
//                 </span>
//               </th>
//               <th>
//                 {Math.floor(track.duration_ms / 60000)}:{" "}
//                 {((track.duration_ms % 60000) / 1000)
//                   .toFixed(0)
//                   .padStart(2, "0")}
//               </th>
//             </table>
//           ))}
//         </ul>
//       </div>
//     </LikesWrapper>
//   );
// }

// export default Likes;

import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Play from "../components/Play";
import img from "../assets/1.svg";
import img1 from "../assets/2.svg";
import header from "../assets/header.png";
import Controls from "../components/Controls";
import time from "../assets/time.svg";

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 24px;
  color: white;
`;

function Likes() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null); // Track information for the currently playing track
  const [tracks, setTracks] = useState([]); // Ma'lumotlar massivi
  const [isLoading, setIsLoading] = useState(true); // Loading state

  const LikesWrapper = styled.div`
    width: 66%;
    min-height: 100vh;
    overflow-y: auto;
    padding: 20px;
    background: linear-gradient(180deg, #604ec1 5.09%, #121212 55.28%);
  `;

  useEffect(() => {
    const fetchedTracks = [];
    for (let i = 0; i <= 150; i++) {
      const trackClickedItem = localStorage.getItem(`trackClicked_${i}`);
      if (trackClickedItem) {
        const trackInfo = JSON.parse(trackClickedItem);
        const isClicked =
          trackInfo.isClicked !== undefined ? trackInfo.isClicked : true;
        if (!isClicked) {
          localStorage.removeItem(`trackClicked_${i}`);
        } else {
          fetchedTracks.push({
            ...trackInfo,
            isClicked,
          });
        }
      }
    }
    setTracks(fetchedTracks);
    setIsLoading(false); // Set loading to false once tracks are loaded
  }, []);

  const handleIconClick = (index) => {
    const newTracks = [...tracks];
    newTracks[index].isClicked = !newTracks[index].isClicked;
    setTracks(newTracks);
    if (!newTracks[index].isClicked) {
      localStorage.removeItem(`trackClicked_${index}`);
    } else {
      localStorage.setItem(
        `trackClicked_${index}`,
        JSON.stringify(newTracks[index])
      );
    }
  };

  const handleTrackClick = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  if (isLoading) {
    return <Loader>Loading...</Loader>; // Render loader while loading
  }

  return (
    <LikesWrapper>
      <div
        style={{
          position: "fixed",
          marginTop: "565px",
          flexDirection: "column",
          width: "960px",
          height: "212px",
        }}
      >
        <div style={{ position: "absolute" }}>
          <Play track={currentTrack} isPlaying={isPlaying} />
        </div>
      </div>

      <img
        style={{ width: "40px", height: "40px", marginTop: "20px" }}
        src={img}
        alt=""
      />
      <img
        style={{ width: "40px", height: "40px", marginLeft: "20px" }}
        src={img1}
        alt=""
      />
      <img style={{ width: "988px", height: "297px" }} src={header} alt="" />
      <Controls />
      <div>
        <p>Tracks:</p>
        <table
          style={{
            justifyContent: "space-between",
            display: "flex",
            borderBottom: "2px solid #666666",
            marginBottom: "20px",
            paddingBottom: "10px",
          }}
        >
          <th>
            # <span></span>TITLE
          </th>
          <th></th>
          <th>ALBUM</th>
          <th>DATE ADDED</th>
          <th>
            <img
              style={{ width: "32px", height: "32px", marginTop: "-10px" }}
              src={time}
              alt=""
            />
          </th>
        </table>
        <ul>
          {tracks.map((track, index) => (
            <table
              key={index}
              style={{
                justifyContent: "space-between",
                display: "flex",
                marginBottom: "30px",
                borderBottom: "1px solid #282828",
                cursor: "pointer",
              }}
              onClick={() => handleTrackClick(track)}
            >
              <th
                style={{
                  display: "flex",
                  width: "350px",
                  gap: "10px",
                }}
              >
                <img
                  style={{ width: "52px", height: "52px" }}
                  src={track.album.images[0].url}
                  alt="Album cover"
                />
                <div>
                  <p> {track.name}</p>
                  <p>{track.album.artists[0].name}</p>
                </div>
              </th>
              <th> </th>
              <th style={{ width: "300px" }}>
                <p> {track.album.name}</p>
              </th>
              <th></th>
              <th></th>
              <th></th>
              <th>
                <span
                  role="img"
                  aria-label={track.isClicked ? "Unfavorite" : "Favorite"}
                  onClick={() => handleIconClick(index)}
                >
                  {track.isClicked ? "💚" : "🤍"}
                </span>
              </th>
              <th>
                {Math.floor(track.duration_ms / 60000)}:{" "}
                {((track.duration_ms % 60000) / 1000)
                  .toFixed(0)
                  .padStart(2, "0")}
              </th>
            </table>
          ))}
        </ul>
      </div>
    </LikesWrapper>
  );
}

export default Likes;
