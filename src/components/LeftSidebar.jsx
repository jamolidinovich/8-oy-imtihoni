import React from "react";
import styled from "@emotion/styled";
import icon1 from "../assets/icon1.svg";
import icon2 from "../assets/icon2.svg";
import icon3 from "../assets/icon3.svg";
import icon4 from "../assets/icon4.svg";
import icon5 from "../assets/icon5.svg";
import "./sidebar.css";
import { Link, NavLink } from "react-router-dom";
function LeftSidebar() {
  const LeftSideWrapper = styled.div`
    width: 17%;
    padding: 20px;
    min-height: 100vh;
    background-color: black;
    color: white;
    position: sticky;
  `;

  return (
    <div style={{ width: "17%" }}>
      <LeftSideWrapper style={{ position: "fixed" }}>
        <div className="container">
          <div className="head">
            <NavLink className="navlink" to={"/"}>
              <p>
                <img
                  className="icon-left
              "
                  src={icon1}
                  alt=""
                />
                <span className="navlink">Home</span>
              </p>
            </NavLink>
            <NavLink className="navlink">
              <p>
                <img
                  className="icon-left
              "
                  src={icon2}
                  alt=""
                />
                <span className="navlink">Search</span>
              </p>
            </NavLink>
            <NavLink className="navlink">
              <p>
                <img
                  className="icon-left
              "
                  src={icon3}
                  alt=""
                />
                <span className="navlink">Your Library</span>
              </p>
            </NavLink>
            <NavLink className="navlink">
              <p>
                <img
                  className="icon-left
              "
                  src={icon4}
                  alt=""
                />
                <span className="navlink">Create Playlist</span>
              </p>
            </NavLink>
            <NavLink className="navlink">
              <p>
                <img
                  className="icon-left
              "
                  src={icon5}
                  alt=""
                />
                <NavLink className="navlink" to={"/likes"}>
                  Liked Songs
                </NavLink>
              </p>
            </NavLink>
          </div>
          <div className="text">
            <p>Chill Mix</p>
            <p>Insta Hits</p>
            <p>Your Top Songs 2021</p>
            <p>Mellow Songs</p>
            <p>Anime Lofi & Chillhop Music</p>
            <p>BG Afro “Select” Vibes</p>
            <p>Afro “Select” Vibes</p>
            <p>Happy Hits!</p>
            <p>Deep Focus</p>
            <p>Instrumental Study</p>
            <p>OST Compilations</p>
            <p>Nostalgia for old souled mill...</p>
            <p>Mixed Feelings</p>
          </div>
        </div>
      </LeftSideWrapper>
    </div>
  );
}

export default LeftSidebar;
