import styled from "@emotion/styled";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";
import "../App.css";
import Play from "../components/Play";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function Layout({ children, data }) {
  // console.log(9, data);
  const token = useSelector((store) => store.auth.token);
  const Wrapper = styled.div`
    width: 100%;
    display: flex;
  `;

  useEffect(() => {
    if (data) {
      localStorage.setItem("data", JSON.stringify(data));
    }
  }, [data]);

  return (
    <div>
      <Wrapper>
        <LeftSidebar />

        {children}

        <RightSidebar />
      </Wrapper>
    </div>
  );
}

export default Layout;
