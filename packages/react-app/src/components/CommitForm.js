import React, { useState } from "react";
import { NavEnums } from "../App";
import { Button, Form, Input, Space, Select, Result } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import ipfsHttpClient from "ipfs-http-client";
import { ethers } from "ethers";

const { Option } = Select;

const url = "https://ipfs.infura.io:5001/api/v0/";
// const url = "http://127.0.0.1:5001/v0/";

const upload = async data => {
  const ipfs = ipfsHttpClient({ url });

  return ipfs.add(JSON.stringify(data));
};

const layout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 16
  }
};

export default function CommitForm(props) {
  const title = <h1>"Social Commitment of Goods and Services"</h1>;
  const disclaimer = (
    <div>
      <p>
        Community acceptance, usage and the value of a Community Inclusive
        Currency (CIC) starts with the Social backing, which is the commitment
        of individuals from the community to accept CIC in exchange for their
        Good and Services.
      </p>
      <h2>PLEASE READ THIS CAREFULLY</h2>
      <p>
        You are about to make a Social contract with your community, the
        statement you make about your commitments will serve as an input for
        deciding the ammount of CIC to be supplied to your community.
      </p>
      <p>
        This submission is to be evaluated by an assembly of local leaders of
        your community who will witness you as a trustwhorty prosumer who’s able
        to fullfill your commitment.
      </p>
      <p>
        After your commitment is aproved, you will be considered as every
        comitter, to receive a proportional ammount of CIC regarding the ammount
        you are stating here to receive in exchange for the good and services
        you will be offering.
      </p>
    </div>
  );

  const signValues = async values => {
    const signer = props.injectedProvider.getSigner();
    const signature = await signer.signMessage(JSON.stringify(values))
    const payload = {
      values: values,
      signature: signature
    }
    return payload
  } 

  const [hash, setHash] = useState("");
  const onFinish = values => {
    console.log("Received values of form: ", values);
    signValues(values)
    .then(payload => {
      debugger
      upload(payload)
        .then(({ path }) => setHash(path))
      })
      .catch(console.error);
  };

  const selectAfter = (
    <Select defaultValue="month" className="select-after">
      <Option value="hour">hour</Option>
      <Option value="day">day</Option>
      <Option value="week">week</Option>
      <Option value="month">month</Option>
      <Option value="year">year</Option>
    </Select>
  );

  if (props.currentStep !== NavEnums.COMMIT) return null;
  if (hash) {
    return (
      <div>
        <p>
          Your form has been succesfully stored. You can see it by visiting
          following link:{" "}
          <a href={`https://ipfs.io/ipfs/${hash}`}>
            `https://ipfs.io/ipfs/${hash}`
          </a>
        </p>
      </div>
    );
  }
  return (
    <div className="onboardContainer">
      <Form onFinish={onFinish} {...layout}>
        <div className="onboardTitle">{title}</div>
        <div className="onboardBody">
          {disclaimer}

          {/* Name */}
          <Form.Item
            label="Name"
            name="name"
            rules={[
              { required: true, message: "Please input your full name!" }
            ]}
          >
            <Input />
          </Form.Item>

          {/* ID Number */}
          <Form.Item
            label="ID Number"
            name="id"
            rules={[
              { required: true, message: "Please input your ID Number!" }
            ]}
          >
            <Input />
          </Form.Item>

          {/* Phone Number */}
          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[
              { required: true, message: "Please input your Phone Number!" }
            ]}
          >
            <Input />
          </Form.Item>

          {/* Email */}
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>

          <Form.List name="goods">
            {(fields, { add, remove }) => {
              return (
                <div>
                  <h3>List the goods and/or services you will provide</h3>
                  {fields.map(field => (
                    <Space
                      key={field.key}
                      style={{ display: "flex", marginBottom: 8 }}
                      align="start"
                    >
                      <Form.Item
                        {...field}
                        label="Name"
                        name={[field.name, "name"]}
                        fieldKey={[field.fieldKey, "name"]}
                        rules={[
                          {
                            required: true,
                            message:
                              "Please fill in the name of the good or service."
                          }
                        ]}
                      >
                        <Input placeholder="e.g. Babysitting or Baked goods & Treats" />
                      </Form.Item>

                      <Form.Item
                        {...field}
                        label="CIC Volume"
                        name={[field.name, "volume"]}
                        fieldKey={[field.fieldKey, "volume"]}
                        rules={[
                          {
                            required: true,
                            message: "Please fill in the volume in CIC."
                          }
                        ]}
                      >
                        <Input
                          placeholder="e.g. 3"
                          addonAfter={selectAfter}
                          suffix="CICs"
                        />
                      </Form.Item>

                      <Form.Item
                        {...field}
                        label="Duration"
                        name={[field.name, "duration"]}
                        fieldKey={[field.fieldKey, "duration"]}
                        rules={[
                          {
                            required: true,
                            message:
                              "Please fill in for how long will you provide this good or service."
                          }
                        ]}
                      >
                        <Input
                          placeholder="e.g. 6 months"
                          addonAfter={selectAfter}
                        />
                      </Form.Item>

                      <MinusCircleOutlined
                        onClick={() => {
                          remove(field.name);
                        }}
                      />
                    </Space>
                  ))}

                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => {
                        add();
                      }}
                      block
                    >
                      <PlusOutlined /> Add commitment
                    </Button>
                  </Form.Item>
                </div>
              );
            }}
          </Form.List>

          <Button htmlType="submit">Commit my Goods and/or Services</Button>
        </div>
      </Form>
    </div>
  );
}
