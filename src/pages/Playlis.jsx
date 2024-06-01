import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getToken } from "../components/utils";
import { create } from "../redux/authSlice";
import MusicTables from "../components/MusicTables";
import Play from "../components/Play";
import Controls from "../components/Controls";
import time from "../assets/time.svg";
import img1 from "../assets/1.svg";
import img2 from "../assets/2.svg";
import Loader from "./Loaderr";
import styled from "@emotion/styled";
import "./playlis.css";

const HomeWrapper = styled.div`
  width: 66%;
  min-height: 100vh;
  overflow-y: auto;
  background-color: #111111;
  padding: 20px;
`;

function Playlis() {
  const params = useParams();
  const token = useSelector((store) => store.auth.token);
  const [data, setData] = useState([]);
  const [playlistDetails, setPlaylistDetails] = useState({});
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [trackUrls, setTrackUrls] = useState([]);

  useEffect(() => {
    if (!token) {
      getToken()
        .then((res) => {
          dispatch(create(res));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (params.id && token) {
      setLoading(true);
      fetch(`${import.meta.env.VITE_API_MUSIC}playlists/${params.id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((d) => {
          setPlaylistDetails(d);
          const tracks = d.tracks.items.map((item) => item.track);
          setData(tracks);
          const trackUrls = tracks.map((track) => track.preview_url);
          setTrackUrls(trackUrls);
          localStorage.setItem("playlistDetails", JSON.stringify(d));
          localStorage.setItem("tracks", JSON.stringify(tracks));
          localStorage.setItem("local", JSON.stringify(trackUrls));
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [params.id, token]);

  useEffect(() => {
    const storedPlaylistDetails = localStorage.getItem("playlistDetails");
    const storedTracks = localStorage.getItem("tracks");
    const storedTrackUrls = localStorage.getItem("local");

    if (storedPlaylistDetails) {
      setPlaylistDetails(JSON.parse(storedPlaylistDetails));
    }

    if (storedTracks) {
      setData(JSON.parse(storedTracks));
    }

    if (storedTrackUrls) {
      setTrackUrls(JSON.parse(storedTrackUrls));
    }
  }, []);

  function handelPlayMusic() {}

  return (
    <HomeWrapper className="HomeWrapper">
      <div
        style={{
          position: "fixed",
          marginTop: "565px",
          width: "960px",
          height: "212px",
        }}
      >
        <Play data={data} />
      </div>
      <div>
        <img className="img-select" src={img1} alt="Image 1" />
        <img className="img-select" src={img2} alt="Image 2" />
      </div>
      <div>
        {playlistDetails.images && playlistDetails.images.length > 0 && (
          <div className="playlist-header">
            <img
              className="playlist-image"
              src={playlistDetails.images[0].url}
              alt={playlistDetails.name}
            />
            <div>
              <h2 className="playlist-name">{playlistDetails.name}</h2>
              <p className="playlist-desc">{playlistDetails.description}</p>
            </div>
          </div>
        )}
        <Controls />
      </div>
      <div
        className="tables header"
        style={{ width: "100%", justifyContent: "space-between" }}
      >
        <div
          className="p pp"
          style={{ marginLeft: "20px", position: "absolute" }}
        >
          #
        </div>
        <div className="p pp" style={{ marginLeft: "70px" }}>
          TITLE
        </div>
        <div className="p pp" style={{ marginLeft: "300px" }}>
          ALBUM
        </div>
        <div className="p pp" style={{ marginLeft: "100px" }}>
          DATE
        </div>
        <div className="p pp">
          <img
            style={{
              width: "28px",
              height: "28px",
              marginTop: "-2px",
              marginLeft: "50px",
            }}
            src={time}
            alt=""
          />
        </div>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <>
          {data.length > 0 ? (
            <>
              <div className="wra" onClick={handelPlayMusic}>
                {data.map((track, index) => (
                  <MusicTables data={{ track }} index={index + 1} />
                ))}
              </div>
            </>
          ) : (
            <div></div>
          )}
        </>
      )}
    </HomeWrapper>
  );
}

export default Playlis;
