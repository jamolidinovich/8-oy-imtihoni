import { Route, Routes } from "react-router-dom";
import Layout from "./layoutt/Layout";
import Home from "./pages/Home";
import Musics from "./pages/Musics";
import Likes from "./pages/Likes";
import Playlis from "./pages/Playlis";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home></Home>
            </Layout>
          }
        ></Route>
        <Route
          path="/likes"
          element={
            <Layout>
              <Likes></Likes>
            </Layout>
          }
        ></Route>
        <Route
          path="/playlist/:id"
          element={
            <Layout>
              <Playlis></Playlis>
            </Layout>
          }
        ></Route>
      </Routes>
    </>
  );
}

export default App;
