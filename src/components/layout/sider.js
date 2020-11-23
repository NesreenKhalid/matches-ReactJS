import React, { useContext } from "react";

import { Layout, Calendar } from "antd";
import { MatchContext } from "../../context/matchContext";
import moment from "moment";

const { Sider } = Layout;

function SideMenu() {
  const { matches, setMatches, selectedDate, setSelectedDate } = useContext(MatchContext);

  const onSelect = async (value, mode) => {
    const date = value.toDate();
    console.log('date', date)
    setSelectedDate(date);
  };

  return (
    <Sider
      style={{ margin: "24px 16px 0" }}
      theme="light"
      width="300"
    >
      <Calendar fullscreen={false} onSelect={onSelect} />
    </Sider>
  );
}

export default SideMenu;
