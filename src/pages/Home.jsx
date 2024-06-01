import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { getToken } from "../components/utils";
import { useDispatch, useSelector } from "react-redux";
import { create } from "../redux/authSlice";
import Musics from "./Musics";
import "./home.css";
import LoaderComponent from "../components/LoaderComponent";
import Good from "../components/Good";
import img1 from "../assets/1.svg";
import img2 from "../assets/2.svg";
import Play from "../components/Play";
import { FaPlay } from "react-icons/fa";
import Likes from "./Likes";
function Home() {
  const HomeWrapper = styled.div`
    width: 66%;
    min-height:100vh
    overflow-y: auto;
    background-color: #111111;


  `;
  const CardWrap = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 30px;
    justify-content: center;
  `;

  const dispatch = useDispatch();
  const token = useSelector((store) => store.auth.token);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataa, setDataa] = useState([]);
  const [good, setGood] = useState([]);
  const [mixes, setMixes] = useState([]);
  const [made, setMade] = useState([]);
  const [recently, setRecently] = useState([]);
  const [uniquely, setUniquely] = useState([]);
  const [jump, setJump] = useState([]);
  useEffect(() => {
    if (!token) {
      getToken()
        .then((res) => {
          dispatch(create(res));
        })
        .catch((err) => {
          console.error("Error fetching token:", err);
        });
    }
  }, [token, dispatch]);
  useEffect(() => {
    if (token) {
      fetch(`${"https://api.spotify.com/v1/browse/featured-playlists"}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((d) => {
          const slicedData = d.playlists.items.slice(1, 7);
          setGood(slicedData);

          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching playlists:", err);
        });
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetch(`${"https://api.spotify.com/v1/browse/featured-playlists"}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((d) => {
          const shuffledData = d.playlists.items.sort(
            () => Math.random() - 0.5
          );
          setMixes(shuffledData);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching playlists:", err);
        });
    }
  }, [token]);
  useEffect(() => {
    if (token) {
      fetch(
        ` ${"https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFHOzuVTgTizF/playlists"}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((res) => res.json())
        .then((d) => {
          const shuffledData = d.playlists.items.sort(
            () => Math.random() - 0.5
          );
          setMade(shuffledData);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching playlists:", err);
        });
    }
  }, [token]);
  useEffect(() => {
    if (token) {
      fetch(
        ` ${"https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFQ00XGBls6ym/playlists"}`,
        {
          method: "GET",
          headers: {
            Authorization: ` Bearer ${token}`,
          },
        }
      )
        .then((res) => res.json())
        .then((d) => {
          const shuffledData = d.playlists.items.sort(
            () => Math.random() - 0.5
          );
          setRecently(shuffledData);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching playlists:", err);
        });
    }
  }, [token]);
  useEffect(() => {
    if (token) {
      fetch(
        `${"https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFLVaM30PMBm4/playlists"}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((res) => res.json())
        .then((d) => {
          setUniquely(d.playlists.items);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching playlists:", err);
        });
    }
  }, [token]);
  useEffect(() => {
    if (token) {
      fetch(
        `${"https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFCbimwdOYlsl/playlists"}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      )
        .then((res) => res.json())
        .then((d) => {
          setJump(d.playlists.items);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching playlists:", err);
        });
    }
  }, [token]);

  const [songTitle, setSongTitle] = useState("Play It Safe");
  const [songArtist, setSongArtist] = useState("Julia Wolf");

  useEffect(() => {
    const savedSongTitle = localStorage.getItem("songTitle");
    const savedSongArtist = localStorage.getItem("songArtist");

    if (savedSongTitle) setSongTitle(savedSongTitle);
    if (savedSongArtist) setSongArtist(savedSongArtist);
  }, []);

  const handlePlay = () => {
    const audio = document.getElementById("audio");
    audio.play();
  };

  return (
    <HomeWrapper className="HomeWrapper">
      <div>
        <img className="img" src={img1} alt="" />
        <img className="img" src={img2} alt="" />
      </div>
      <h1 className="afternoon">Good afternoon</h1>
      <div style={{ marginLeft: "-10px" }}>
        <CardWrap className="cardwrap">
          {isLoading ? (
            <LoaderComponent />
          ) : (
            good.map((el, index) => <Good key={index} data={el} />)
          )}
        </CardWrap>
      </div>
      <h2 className="Mixes">Your top mixes</h2>
      <div>
        <CardWrap>
          {isLoading ? (
            <LoaderComponent />
          ) : (
            mixes &&
            mixes.length > 0 &&
            mixes.map((el, index) => <Musics key={index} data={el} />)
          )}
        </CardWrap>
      </div>
      <h2 className="Mixes">Made for you</h2>
      <div>
        <CardWrap>
          {isLoading ? (
            <LoaderComponent />
          ) : (
            made.map((el, index) => <Musics key={index} data={el} />)
          )}
        </CardWrap>
      </div>
      <h2 className="Mixes">Recently played</h2>
      <div>
        <CardWrap>
          {isLoading ? (
            <LoaderComponent />
          ) : (
            jump.map((el, index) => <Musics key={index} data={el} />)
          )}
        </CardWrap>
      </div>
      <div>
        <h2 className="Mixes">Jump back in</h2>
        <CardWrap>
          {isLoading ? (
            <LoaderComponent />
          ) : (
            recently.map((el, index) => <Musics key={index} data={el} />)
          )}
        </CardWrap>
      </div>
      <h2 className="Mixes">Uniquely yours</h2>
      <div>
        <CardWrap>
          {isLoading ? (
            <LoaderComponent />
          ) : (
            uniquely.map((el, index) => <Musics key={index} data={el} />)
          )}
        </CardWrap>
      </div>

      <div
        style={{
          position: "fixed",
          marginTop: "-8745px",
          flexDirection: "column",
          width: "960px",
          height: "212px",
          display: "inline-block",
        }}
      >
        <div style={{ position: "absolute" }}>
          <Play></Play>
        </div>
      </div>
    </HomeWrapper>
  );
}

export default Home;
