import "antd/dist/antd.css";
import "./index.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Layout } from "antd";

import SideMenu from "./components/layout/sider";
import HeadBar from "./components/layout/header";
import MainContent from "./components/layout/content";
import MatchContextProvider from "./context/matchContext";
const { Footer } = Layout;

function App() {
  return (
    <Layout>
      <MatchContextProvider>
      <HeadBar />
      <Layout style={{padding: "20px 50px"}} >
        <Layout >
          <MainContent />
        </Layout>
        <SideMenu />
      </Layout>
      <Footer style={{ textAlign: "center" }}>
        Matches information ©2020 Created by Nesreen Khalid
      </Footer>
      </MatchContextProvider>
    </Layout>
  );
}

export default App;
