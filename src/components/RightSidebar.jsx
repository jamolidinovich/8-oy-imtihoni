import styled from "@emotion/styled";
import React from "react";
import { LuUserPlus2 } from "react-icons/lu";
import { GrAdd } from "react-icons/gr";
import userLoading from "../assets/userLoading.svg";
import icon1 from "../assets/user1.svg";
import close from "../assets/close1.svg";
import "./sidebar.css";
function RightSidebar() {
  const RightSideWrapper = styled.div`
    width: 17%;
    min-height: 100vh;
    background-color: black;
    color: white;
    padding-left: 10px;
    position: fixed;
    right: 0px;
  `;
  const useLoa = [
    {
      img: userLoading,
    },
    {
      img: userLoading,
    },
    {
      img: userLoading,
    },
  ];

  return (
    <RightSideWrapper>
      <div className="container">
        <div className="top">
          <p className="topp">Friend Activity</p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "168px",
              position: "absolute",
              marginTop: "-8px",
            }}
          >
            <img className="closee" src={icon1} alt="" />
            <img className="close11" src={close} alt="" />
          </div>
        </div>
        <div>
          <span className="lorem">
            Let friends and followers on Spotify see what you’re listening to.
          </span>
        </div>
        <div className="users">
          {useLoa.map((ele, index) => {
            return (
              <img
                key={index}
                style={{
                  height: "62px",
                  marginLeft: "-25px",
                }}
                src={ele.img}
                alt=""
              />
            );
          })}
        </div>
        <div>
          <span className="lorem">
            Go to Settings Social and enable “Share my listening activity on
            Spotify.’ You can turn this off at any time.
          </span>
        </div>
        <button className="buttonn">SETTINGS</button>
      </div>
    </RightSideWrapper>
  );
}

export default RightSidebar;
