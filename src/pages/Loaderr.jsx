import React from "react";
import styled from "@emotion/styled";
import time from "../assets/time.svg";

const LoaderWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Placeholder = styled.div`
  background: #333;
  border-radius: 4px;

  margin: 10px 0;
  animation: pulse 1.5s infinite ease-in-out;
  / @keyframes pulse {
    0% {
      background-color: #333;
    }
    50% {
      background-color: #444;
    }
    100% {
      background-color: #333;
    }
  }
`;

const HeaderPlaceholder = styled(Placeholder)`
  width: 200px;
  height: 30px;
`;

const ImagePlaceholder = styled(Placeholder)`
  width: 100px;
  height: 100px;
`;

const TitlePlaceholder = styled(Placeholder)`
  width: 60%;
  height: 20px;
`;

const DescPlaceholder = styled(Placeholder)`
  width: 80%;
  height: 15px;
`;

const RowPlaceholder = styled(Placeholder)`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
`;

const ColPlaceholder = styled(Placeholder)`
  width: ${(props) => props.width || "100%"};
  height: 20px;
  margin-left: ${(props) => props.margin || "0"};
`;

function Loader() {
  return (
    <LoaderWrapper>
      <div style={{ marginTop: "20px", width: "100%" }}>
        <RowPlaceholder>
          <ColPlaceholder width="10%" margin="20px" />
          <ColPlaceholder width="20%" margin="70px" />
          <ColPlaceholder width="20%" margin="300px" />
          <ColPlaceholder width="10%" margin="100px" />
          <img
            src={time}
            alt="Time icon"
            style={{
              width: "28px",
              height: "28px",
              marginTop: "-2px",
              marginLeft: "50px",
            }}
          />
        </RowPlaceholder>
      </div>
      {Array.from({ length: 10 }).map((_, index) => (
        <RowPlaceholder key={index}>
          <ColPlaceholder width="10%" margin="20px" />
          <ColPlaceholder width="20%" margin="70px" />
          <ColPlaceholder width="20%" margin="300px" />
          <ColPlaceholder width="10%" margin="100px" />
        </RowPlaceholder>
      ))}
    </LoaderWrapper>
  );
}

export default Loader;
