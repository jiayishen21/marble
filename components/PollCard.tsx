import React, { use, useEffect, useState } from "react";
import { Form, Button, Select } from "antd";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { setPolls } from "../store/pollSlice";
import { setUser } from "../store/userSlice";
import { useDispatch } from "react-redux"
import { AppDispatch } from "../store/store";
import { canVote } from "../utils/canVote";
import { PollType } from "../types";

export default function PollCard() {
  const user = useSelector((state: RootState) => state.user.user);
  const polls = useSelector((state: RootState) => state.polls.polls);
  const dispatch = useDispatch<AppDispatch>();

  const [form] = Form.useForm()

  const { Option } = Select;

  const buttonDisabled = (poll: PollType) => {
    try {
      if (!user) {
        return true
      }
      canVote(user, poll)
      return false
    } catch (err) {
      return true
    }
  }

  const fetchInitialFormData = () => {
    const formData: any = {}

    for (let i = 0; i < polls.length; i++) {
      formData[`response${i}`] = ''

      if (!user || !polls) {
        continue
      }

      for (const vote of user.voteHistory) {
        if (vote.poll === polls[i]._id) {
          for (const option of polls[i].options) {
            if (option.num === vote.optionNum) {
              formData[`response${i}`] = option.text
              break
            }
          }
          break
        }
      }
    }

    return formData
  }

  useEffect(() => {
    form.setFieldsValue(fetchInitialFormData())
  }, [user, polls])


  return polls.map((item: any, index: number) => (
    <section key={`poll${index}`}>
      <h2 className="text-2xl text-[#7E8083] font-semibold">
        Poll {index + 1}/{polls.length}
      </h2>
      <div className="w-full flex flex-col border border-gray-400 rounded-lg">
        <div className="m-[3rem] flex flex-col">
          <h2 className="text-2xl font-bold">{item.question}</h2>
          {/* <p className="mt-[1rem]">{item.description}</p> */}
        </div>
        <Form
          form={form}
          name={`votingForm${index}`}
          onFinish={(formData) => {
            try {
              if (!user) {
                throw new Error('Please login to vote.')
              }
              if (!formData[`response${index}`]) {
                throw new Error('Please select an option before voting.')
              }

              let optionNum = -1
              for (const option of item.options) {
                if (option.text === formData[`response${index}`]) {
                  optionNum = option.num
                  break
                }
              }
              if (optionNum === -1) {
                throw new Error('Please select a valid option before voting.')
              }

              canVote(user, item)

              const token = localStorage.getItem('token') || ''
              axios
                .post('/api/poll/vote', { pollId: item._id, optionNum }, { headers: { 'Authorization': `Bearer ${token}` } })
                .then((response: any) => {
                  if (!response?.data) {
                    throw new Error('Server error. Please try again')
                  }
                  const { polls, voteHistory } = response.data
                  if (!polls || !voteHistory) {
                    throw new Error('Server error. Please try again')
                  }

                  dispatch(setPolls(polls))
                  dispatch(setUser({ ...user, voteHistory }))
                  toast.success('Vote submitted successfully!')
                })
                .catch((error: any) => {
                  if (error?.response?.data?.message) {
                    toast.error(error.response.data.message)
                  } else if (error?.message) {
                    toast.error(error.message)
                  } else {
                    toast.error(error)
                  }
                })

            } catch (error: any) {
              toast.error(error.message)
            }
          }}
        >
          <Form.Item
            label="Select your decision"
            name={`response${index}`}
            className="mx-[3rem]"
            rules={[
              {
                required: true,
                message: "Please select your response",
              },
            ]}
          >
            <Select style={{ borderRadius: "5px" }}
              disabled={buttonDisabled(item)}
            >
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
              disabled={buttonDisabled(item)}
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
