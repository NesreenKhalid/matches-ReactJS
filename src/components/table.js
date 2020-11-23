import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import { Table, Tag, Space, Spin, Input, Button } from "antd";
import MatchModal from "./createMatch";
import Moment from "react-moment";
import moment from "moment";
import { MatchContext } from "../context/matchContext";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

// import "moment-timezone";
// wether if is the match active now, finished or will start and the
// score and name of each team and

// group the matches with the date

function MatchesTable() {
  //   const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const { matches, setMatches, selectedDate } = useContext(MatchContext);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
const [searchInput, setSearchInput] = useState('')
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            setSearchInput(node);
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    // onFilterDropdownVisibleChange: (visible) => {
    //   if (visible) {
    //     setTimeout(() => this.searchInput.select(), 100);
    //   }
    // },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const columns = [
    {
      title: "Is Active",
      key: "isActive",
      dataIndex: "isActive",
      render: (tag) => {
        let color;
        if (tag === "finished") {
          color = "green";
        } else if (tag === "active") {
          color = "volcano";
        } else {
          color = "geekblue";
        }

        return (
          <Tag color={color} key={tag}>
            {tag}
          </Tag>
        );
      },
      editable: true,
    },
    {
      title: "HomeTeam",
      dataIndex: "homeTeam",
      key: "homeTeam",
      //   render: (text) => <a>{text}</a>,
      editable: true,
      ...getColumnSearchProps('homeTeam'),
    },
    {
      title: "Score",
      dataIndex: "score",
      key: "score",
      editable: true,
    },
    {
      title: "AwayTeam",
      dataIndex: "awayTeam",
      key: "awayTeam",
      editable: true,
      ...getColumnSearchProps('awayTeam'),
    },
    // homeTeam, awayTeam, startTime, endTime, duration, homeTeamScore, awayTeamScore, isActive, league
    {
      title: "StartTime",
      dataIndex: "startTime",
      key: "startTime",
      editable: true,
    },
    {
      title: "EndTime",
      dataIndex: "endTime",
      key: "endTime",
      editable: true,
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      editable: true,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => handleDelete(record.key)}>Delete</a>
          {/* <a onClick={() => handleUpdate(record.key)}>Update</a> */}
        </Space>
      ),
    },
  ];

  const handleState = (start, end) => {
    if (moment().isBetween(start, end)) return "active";
    else if (moment().isAfter(end)) return "finished";
    else return "will start";
  };

  const calcDuration = (date1, date2) => {
    var end = moment(date1);
    var start = moment(date2);
    return moment
      .utc(
        moment(end, "DD/MM/YYYY HH:mm:ss").diff(
          moment(start, "DD/MM/YYYY HH:mm:ss")
        )
      )
      .format("HH:mm");
  };

  const handleDataFormat = (matches) => {
    return matches.map((match) => {
      return {
        key: match._id,
        isActive: handleState(match.startTime, match.endTime),
        homeTeam: match.homeTeam,
        score: `${match.homeTeamScore} - ${match.awayTeamScore}`,
        awayTeam: match.awayTeam,
        startTime: moment(match.startTime).format("YYYY-MM-DD HH:mm"),
        endTime: moment(match.endTime).format("HH:mm"),
        duration: `${calcDuration(match.endTime, match.startTime)} hr`,
      };
    });
  };

  const handleDelete = async (key) => {
    await axios
      .delete(`http://localhost:4000/matches/${key}`)
      .then((res) => {
        getMatches();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdate = (key) => {};
  const getMatches = async () => {
    await axios
      .get("http://localhost:4000/matches/", { params: { date: selectedDate } })
      .then((res) => {
        setMatches(handleDataFormat(res.data));
        setLoading(false);
        console.log(" Home is loaded");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {   
    getMatches();
  }, [selectedDate]);

  return (
    <div>
        
      <MatchModal handleDataFormat={handleDataFormat} getMatches={getMatches} />
      <br />
      <Space direction="vertical" size="large">
        {loading ? (
          <Spin size="large" />
        ) : matches.length === 0 ? (
          <p> No Matches Yet</p>
        ) : (
          <Table showHeader="false" columns={columns} dataSource={matches} />
        )}
      </Space>
    </div>
  );
}

export default MatchesTable;
