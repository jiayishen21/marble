import React from "react";
import { Form, Button, Select } from "antd";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";

export default function PollCard() {
  const polls = useSelector((state: RootState) => state.polls.polls);
  const { Option } = Select;
  return polls.map((item: any, index: number) => (
    <section>
      <h2 className="text-2xl text-[#7E8083] font-semibold">
        Poll {index + 1}/{polls.length}
      </h2>
      <div className="w-full flex flex-col border border-gray-400 rounded-lg">
        <div className="m-[3rem] flex flex-col">
          <h2 className="text-2xl font-bold">{item.question}</h2>
          {/* <p className="mt-[1rem]">{item.description}</p> */}
        </div>
        <Form
          name="votingForm"
          onFinish={() => console.log("submitted")}
          onFinishFailed={() => console.log("submit failed")}
        >
          <Form.Item
            label="Select your decision"
            name="response"
            className="mx-[3rem]"
            rules={[
              {
                required: true,
                message: "Please select your response",
              },
            ]}
          >
            <Select style={{ borderRadius: "5px" }}>
              {item.options.map((option: any) => (
                <Option key={option.num} value={option.text}>
                  {option.text}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item className="flex justify-center">
            <Button
              type="primary"
              htmlType="submit"
              className="bg-[#26477C] text-white"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
        <div className="bg-[#EBEEEF] py-[1.5rem] pl-[3rem] text-xl">
          Voting closes on{" "}
          <span className="font-semibold">
            {new Date(item.deadline).toLocaleString()}
          </span>
        </div>
      </div>
    </section>
  ));
}
