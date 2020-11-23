import React, { useState, useContext } from "react";
import "antd/dist/antd.css";
// import "../App.css";
import axios from "axios";
import { Button, Modal, Form, Input } from "antd";
import moment from "moment";
import { MatchContext } from "../context/matchContext";

const MatchCreateForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="Mew Match"
      okText="create"
      cancelText="cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="horizontal"
        name="form_in_modal"
        initialValues={{
          modifier: "public",
        }}
      >
        {/* homeTeam, awayTeam, startTime, endTime, duration, homeTeamScore, awayTeamScore, isActive, league */}

        <Form.Item
          label="homeTeam"
          name="homeTeam"
          rules={[
            { required: true, message: "please enter the name of HomeTeam " },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="awayTeam"
          name="awayTeam"
          rules={[
            { required: true, message: "please enter the name of AwayTeam " },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="startTime"
          name="startTime"
          rules={[{ required: true, message: "please enter startTime " }]}
        >
          <Input type="datetime-local" />
        </Form.Item>
        <Form.Item
          label="endTime"
          name="endTime"
          rules={[{ required: true, message: "please enter endTime " }]}
        >
          <Input type="datetime-local" />
        </Form.Item>

        <Form.Item
          label="homeTeamScore"
          name="homeTeamScore"
          rules={[{ required: false }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label="awayTeamScore"
          name="awayTeamScore"
          rules={[{ required: false }]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item label="league" name="league">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const MatchModal = ({ handleDataFormat, getMatches }) => {
  const [visible, setVisible] = useState(false);
  const { setSelectedDate } = useContext(MatchContext);

  const isActive = (start, end) => {
    return moment().isBetween(start, end);
  };

  const onCreate = (values) => {
    console.log("Received values of form: ", values);
    const record = {
      ...values,
      isActive: isActive(values.startTime, values.endTime),
    };

    axios
      .post("http://localhost:4000/matches/create", record)
      .then((response) => {
        getMatches();
      })
      .catch((error) => {
        console.log("error on create match", error);
      });
    setVisible(false);
  };

  return (
    <div>
      <Button
        style={{ margin: "0 30px" }}
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        Create Match
      </Button>
      {/* <Button
        style={{ margin: "0 30px" }}
        type="primary"
        onClick={() => {
          getMatches();
        }}
      >
        Filter
      </Button> */}

      <Button
        style={{ margin: "0 30px" }}
        type="primary"
        onClick={() => {
          setSelectedDate("");
        //   getMatches();
        }}
      >
        reset
      </Button>
      <MatchCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};

export default MatchModal;
