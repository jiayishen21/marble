import React from "react";
import { ContactOptions } from "../data/ContactOptions";
import { Button, Col, Form, Input, Row } from "antd";
import useMobileDetection from "../utils/detectMobile";
import styles from "../styles/Home.module.css";
import { useForm } from "antd/lib/form/Form";
import axios from "axios";
import { toast } from "react-toastify";

const { Item } = Form;
const { TextArea } = Input;

export default function ContactForm() {
  const [form] = useForm();
  const mobile = useMobileDetection();
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
    <section className="mt-[8rem]">
      <div className="pl-20">
        <div className="text-semiblack text-6xl font-bold font-hind">
          Get in touch
        </div>
      </div>
      <Row className={`${mobile ? "flex flex-col" : "pb-[12rem] pt-[2rem]"}`}>
        <Col className="flex flex-col gap-12 pl-20" span={9}>
          <div className="text-semiblack text-2xl font-hind">
            We invite you to contact us through one of the methods below.
          </div>
          <div className="flex flex-col justify-between h-full pb-8 pt-4">
            {ContactOptions.map((item, key) => {
              return (
                <div
                  className={`flex flex-col gap-6 text-2xl ${
                    mobile && "mt-[2rem]"
                  }`}
                  key={key}
                >
                  <div className="flex flex-row items-center gap-6">
                    <span className="text-3xl">{item.icon}</span>
                    <span className="font-hind font-bold">{item.title}</span>
                  </div>
                  <div className="font-hind">{item.value}</div>
                </div>
              );
            })}
          </div>
        </Col>
        <Col span={2} className="flex items-center justify-center mr-[6rem]">
          <div className="w-[0.25em] h-full bg-lapis rounded"></div>
        </Col>
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
                  className="touch-form"
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
                    <label className={styles["touch-form-label"]}>Email</label>
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
      </Row>
    </section>
  );
}
