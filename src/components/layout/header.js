import { Layout } from "antd";

const { Header } = Layout;

function HeadBar() {
  return (
    <Header
      className="site-layout-sub-header-background"
      style={{ padding: "0px 200px"   }}
    >
      <h2 style={{color: "white" }}> Table of Matches </h2>
    </Header>
  );
}

export default HeadBar;
