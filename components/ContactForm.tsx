import React from "react";
import { ContactOptions } from "../data/ContactOptions";
import { Button, Col, Form, Input, Row } from "antd";
import styles from "../styles/Home.module.css";
import { useForm } from "antd/lib/form/Form";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import useMobile from "../hooks/useMobile";

const { Item } = Form;
const { TextArea } = Input;

export default function ContactForm() {
  const [form] = useForm();
  const {mobile} = useMobile()
  const router = useRouter();
  const onSubmit = (formData: any) => {
    const { fullName, email, company, subject, message } = formData;

    axios
      .post("/api/message", {
        fullName,
        email,
        company,
        subject,
        message,
      })
      .then((res) => {
        if (res?.data?.message) {
          toast.success(res.data.message);
        } else {
          toast.success("Message sent successfully!");
        }
      })
      .catch((err: any) => {
        if (err?.response?.data?.error) {
          toast.error(err.response.data.error);
        } else if (err?.message) {
          toast.error(err.message);
        } else {
          toast.error(err);
        }
      });

    form.resetFields();
  };

  return (
    <section
      className={`${!mobile ? "mt-[8rem]" : ""} ${
        router.pathname === "/contact" ? "mt-[4rem]" : ""
      }`}
    >
      <div className="pl-10">
        <div
          className={`text-semiblack font-bold font-hind ${
            mobile ? "text-4xl -mt-[2rem]" : "text-6xl"
          }`}
        >
          Get in touch
        </div>
      </div>
      <Row
        className={`${
          mobile ? "flex flex-col items-start" : "pb-[12rem] pt-[2rem]"
        }`}
      >
        <Col className="flex flex-col gap-12 pl-10" span={9}>
          <div
            className={`text-semiblack font-hind ${
              mobile ? "text-md mt-[1rem]" : "text-2xl"
            }`}
          >
            We invite you to contact us through one of the methods below.
          </div>
          <div
            className={`flex flex-col justify-between h-full pb-8 ${
              mobile ? "gap-[1rem]" : "pt-4"
            }`}
          >
            {ContactOptions.map((item, key) => {
              return (
                <div
                  className={`flex flex-col ${
                    mobile ? "text-sm" : "text-2xl gap-6"
                  }`}
                  key={key}
                >
                  <div
                    className={`flex items-center ${
                      mobile ? "gap-2" : "gap-6"
                    }`}
                  >
                    <span className={`${mobile ? "text-xl" : "text-3xl"}`}>
                      {item.icon}
                    </span>
                    <span className="font-hind font-bold">{item.title}</span>
                  </div>
                  <div className="font-hind whitespace-nowrap mt-[0.5rem] text-lg">
                    {item.value}
                  </div>
                </div>
              );
            })}
          </div>
        </Col>
        {!mobile && (
          <Col span={2} className="flex items-center justify-center mr-[6rem]">
            <div className="w-[0.25em] h-full bg-lapis rounded"></div>
          </Col>
        )}
        {mobile ? (
          <Col className="flex flex-col gap-8 mb-[2rem] px-10 w-full">
            <div className="text-semiblack font-hind text-lg">
              Or, reach us directly.
            </div>
            <form onSubmit={onSubmit} className="w-full">
              <div className="text-semiblack/[0.5] text-sm font-light font-hind mb-4">
                All fields marked with * are required.
              </div>
              <div className="row-gutter-10">
                {/* Replace Col and Item with standard HTML structure */}
                <div className="flex flex-col w-full gap-[0.5rem]">
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    placeholder="Name"
                    required
                    className="h-[3rem] rounded-lg"
                  />
                </div>
                <div className="flex flex-col w-full mt-[1rem] gap-[0.5rem]">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    required
                    className="h-[3rem] rounded-lg"
                  />
                </div>
                <div className="flex flex-col w-full mt-[1rem] gap-[0.5rem]">
                  <label htmlFor="company">Your Company/Institution</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    placeholder="Company"
                    className="h-[3rem] rounded-lg"
                  />
                </div>
                <div className="flex flex-col w-full mt-[1rem] gap-[0.5rem]">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="Subject"
                    required
                    className="h-[3rem] rounded-lg"
                  />
                </div>
                <div className="flex flex-col w-full mt-[1rem] gap-[0.5rem]">
                  <label htmlFor="message">
                    Please leave your message below.
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Enter your message here..."
                    rows={5}
                    style={{ height: "15rem" }}
                    required
                  />
                </div>
                <div className="flex flex-col w-full mt-[1rem] gap-[0.5rem]">
                  <button
                    type="submit"
                    className="mx-auto w-[40%] h-10 bg-lapis rounded-md text-neutral-50 font-hind text-xl font-normal flex justify-center items-center"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </Col>
        ) : (
          <Col
            className={`flex flex-col gap-8 ${
              mobile && "ml-auto mr-[5rem] mb-[2rem]"
            }`}
            span={10}
          >
            <div className="text-semiblack text-2xl font-hind">
              Or, reach us directly.
            </div>
            <Form form={form} layout="vertical" onFinish={onSubmit}>
              <div className="text-semiblack/[0.5] text-xl font-light font-hind mb-4">
                All fields marked with * are required.
              </div>
              <Row gutter={[10, 10]}>
                <Col span={12}>
                  <Item
                    name="fullName"
                    rules={[
                      {
                        required: true,
                        message: "Required field",
                      },
                    ]}
                    label={
                      <label className={styles["touch-form-label"]}>
                        Full Name
                      </label>
                    }
                  >
                    <Input size="large" placeholder="Name" />
                  </Item>
                </Col>
                <Col span={12}>
                  <Item
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Required field",
                      },
                    ]}
                    label={
                      <label className={styles["touch-form-label"]}>
                        Email
                      </label>
                    }
                  >
                    <Input size="large" placeholder="Email" />
                  </Item>
                </Col>
                <Col span={12}>
                  <Item
                    name="company"
                    rules={[
                      {
                        required: false,
                      },
                    ]}
                    label={
                      <label className={styles["touch-form-label"]}>
                        Your Company/Institution
                      </label>
                    }
                  >
                    <Input size="large" placeholder="Company" />
                  </Item>
                </Col>
                <Col span={12}>
                  <Item
                    name="subject"
                    rules={[
                      {
                        required: true,
                        message: "Required field",
                      },
                    ]}
                    label={
                      <label className={styles["touch-form-label"]}>
                        Subject
                      </label>
                    }
                  >
                    <Input size="large" placeholder="Subject" />
                  </Item>
                </Col>
                <Col span={24}>
                  <Item
                    name="message"
                    rules={[
                      {
                        required: true,
                        message: "Required field",
                      },
                    ]}
                    label={
                      <label className={styles["touch-form-label"]}>
                        Please leave your message below.
                      </label>
                    }
                  >
                    <TextArea
                      size="large"
                      placeholder="Enter your message here..."
                      rows={5}
                      style={{ resize: "none" }}
                    />
                  </Item>
                </Col>
                <Col span={6} className="mt-2">
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="w-full h-10 bg-lapis rounded-md text-neutral-50 font-hind
                text-xl font-normal flex justify-center items-center"
                  >
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        )}
      </Row>
    </section>
  );
}
