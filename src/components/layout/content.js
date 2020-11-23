import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Layout } from "antd";
import MatchesTable from "../table";
const {Content} = Layout;

function MainContent() {
  return (
    <Content style={{ margin: "24px 16px 0" }}>
      <div
        className="site-layout-background"
        style={{ padding: 24, minHeight: 360 }}
      >
        <MatchesTable/>
      </div>
    </Content>
  );
}

export default MainContent;
