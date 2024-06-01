import React from "react";
import { ScaleLoader } from "react-spinners";
import "./Loader.css";
import { CirclesWithBar } from "react-loader-spinner";

const LoaderComponent = () => (
  <div className="loader-container">
    render(
    <CirclesWithBar
      height="200"
      width="200"
      color="#4fa94d"
      outerCircleColor="#4fa94d"
      innerCircleColor="#4fa94d"
      barColor="#4fa94d"
      ariaLabel="circles-with-bar-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
    )
  </div>
);

export default LoaderComponent;
