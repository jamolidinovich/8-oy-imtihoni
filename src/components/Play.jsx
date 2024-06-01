import React, { useEffect, useRef, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import oldinga from "../assets/oldinga.svg";
import orqaga from "../assets/orqaga.svg";
import play from "../assets/play.webp";
import pause from "../assets/pause.png";
import "./Play.css";

function Play() {
  const [tracks, setTracks] = useState([]); // Parçaların listesi
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0); // Şu an çalınan parçanın indeksi
  const [isPlaying, setIsPlaying] = useState(false); // Parça çalıyor mu?
  const [currentTime, setCurrentTime] = useState(0); // Geçerli çalma zamanı
  const [duration, setDuration] = useState(0); // Parçanın toplam süresi
  const audioRef = useRef(new Audio()); // Ses öğesi referansı

  useEffect(() => {
    const storedTracks = JSON.parse(localStorage.getItem("local"));
    if (storedTracks) {
      setTracks(storedTracks);
    } else {
      alert("Local storage'da kayıtlı veri bulunamadı!");
    }

    const storedCurrentTrackIndex =
      parseInt(localStorage.getItem("currentTrackIndex")) || 0;
    const storedIsPlaying =
      localStorage.getItem("isPlaying") === "true" || false;
    const storedCurrentTime =
      parseInt(localStorage.getItem("currentTime")) || 0;

    setCurrentTrackIndex(storedCurrentTrackIndex);
    setIsPlaying(storedIsPlaying);
    setCurrentTime(storedCurrentTime);
  }, []);

  // Sayfa kapatıldığında veya yenilendiğinde veriyi yerel depolamaya kaydet
  useEffect(() => {
    localStorage.setItem("local", JSON.stringify(tracks.slice(0, 100)));
    localStorage.setItem("currentTrackIndex", currentTrackIndex);
    localStorage.setItem("isPlaying", isPlaying);
    localStorage.setItem("currentTime", currentTime);
  }, [tracks, currentTrackIndex, isPlaying, currentTime]);

  // Ses öğesinin olaylarını izleme ve güncelleme
  useEffect(() => {
    const audio = audioRef.current;

    const updateCurrentTime = () => {
      setCurrentTime(audio.currentTime);
    };

    const updateDuration = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener("timeupdate", updateCurrentTime);
    audio.addEventListener("loadedmetadata", updateDuration);

    if (tracks.length > 0) {
      audio.src = tracks[currentTrackIndex];
      audio.currentTime = currentTime;
      if (isPlaying) {
        audio.play();
      }
    }

    return () => {
      audio.removeEventListener("timeupdate", updateCurrentTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
    };
  }, [currentTrackIndex, tracks, isPlaying, currentTime]);

  // Parçayı çalmak için fonksiyon
  function handlePlay() {
    const audio = audioRef.current;

    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }

    // Yerel depolamayı güncelle
    localStorage.setItem("isPlaying", !audio.paused);
    localStorage.setItem("currentTime", audio.currentTime);

    // Autoplayni to'xtatish
    if (audio.autoplay && !audio.paused) {
      audio.autoplay = false;
    }
  }

  function handleNext() {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length);
    setCurrentTime(0);
  }

  function handleBefore() {
    setCurrentTrackIndex(
      (prevIndex) => (prevIndex - 1 + tracks.length) % tracks.length
    );
    setCurrentTime(0);
  }

  function handleRangeChange(event) {
    const time = event.target.value;
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  }

  function handleVolumeChange(event) {
    const volumeLevel = event.target.value;
    audioRef.current.volume = volumeLevel;
  }

  return (
    <div
      style={{
        background: "#181818",
        display: "flex",
        alignItems: "center",
        height: "112px",
        width: "1000px",
        paddingLeft: "20px",
        marginLeft: "-20px",
      }}
    >
      <div
        className="div-main"
        style={{
          position: "absolute",
          marginLeft: "340px",
        }}
      >
        <button
          style={{
            background: "transparent",
            border: "none",
          }}
          onClick={handleBefore}
        >
          <img
            style={{
              width: "32px",
              height: "32px",
              marginLeft: "-100px",
              marginRight: "56px",
              marginTop: "30px",
            }}
            src={orqaga}
            alt=""
          />
        </button>
        <button
          style={{
            background: "transparent",
            borderRadius: "50px",
            border: "none",
            color: "black,",
            marginTop: "20px",
            position: "absolute",
          }}
          onClick={handlePlay}
        >
          <audio
            onClick={handleNext}
            preload="metadata"
            controls
            src={tracks[currentTrackIndex]}
            type="audio/ogg"
          >
            {console.log(1293, tracks)}
            <source src={tracks[currentTrackIndex]} type="audio/ogg"></source>
          </audio>
        </button>
        <button
          style={{
            background: "transparent",
            borderRadius: "50px",
            border: "none",
            color: "black,",
            marginTop: "20px",
            position: "absolute",
          }}
          onClick={handlePlay}
        ></button>
        <button
          style={{
            background: "transparent",
            marginLeft: "200px",
            border: "none",
          }}
          onClick={handleNext}
        >
          <img
            style={{ width: "32px", height: "32px", marginLeft: "156px" }}
            src={oldinga}
            alt=""
          />
        </button>
      </div>
    </div>
  );
}

export default Play;
