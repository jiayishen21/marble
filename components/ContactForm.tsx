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
  const { mobile } = useMobile();
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
      className={`px-10 lg:px-20 xl:px-32 2xl:px-48 flex flex-col md:flex-row md:space-x-14 ${
        router.pathname === "/contact" ? "mt-[4rem]" : ""
      }`}
    >
      <div className="flex flex-col">
        <h2
          className={`text-semiblack font-bold font-montserrat text-3xl md:text-4xl lg:text-5xl`}
          data-aos="fade-right"
        >
          Get in touch
        </h2>
        <p
          className={`text-semiblack font-montserrat my-3 text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl`}
          data-aos="fade-right"
        >
          We invite you to contact us through one of the methods below.
        </p>
        <div className={`flex flex-col justify-start space-y-6 h-full pb-8`}>
          {ContactOptions.map((item, key) => {
            return (
              <div
                className={`flex flex-col text-sm md:text-md lg:text-lg 2xl:text-xl`}
                key={key}
                data-aos="fade-right"
              >
                <div
                  className={`flex flex-row justify-start items-center ${
                    mobile ? "gap-2" : ""
                  }`}
                >
                  <span>{item.icon}</span>
                  <span className="font-montserrat font-bold ml-1">
                    {item.title}
                  </span>
                </div>
                <div className="font-montserrat whitespace-nowrap text-sm md:text-base lg:text-lg 2xl:text-xl">
                  {item.value}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex-col flex mb-10" data-aos="fade-left">
        <p className="text-semiblack font-semibold text-xl md:text-2xl xl:text-3xl font-montserrat">
          Or, reach us directly.
        </p>
        <Form form={form} layout="vertical" onFinish={onSubmit}>
          <p className="text-semiblack/50 text-lg md:text-xl xl:text-2xl font-light font-montserrat mb-4">
            All fields marked with * are required.
          </p>
          <Row gutter={[8, 0]}>
            <Col span={mobile ? 24 : 12}>
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
            <Col span={mobile ? 24 : 12}>
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
            <Col span={mobile ? 24 : 12}>
              <Item
                name="company"
                rules={[
                  {
                    required: false,
                  },
                ]}
                label={
                  <label className={styles["touch-form-label"]}>
                    Company name
                  </label>
                }
              >
                <Input size="large" placeholder="Company" />
              </Item>
            </Col>
            <Col span={mobile ? 24 : 12}>
              <Item
                name="subject"
                rules={[
                  {
                    required: true,
                    message: "Required field",
                  },
                ]}
                label={
                  <label className={styles["touch-form-label"]}>Subject</label>
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
            <Col span={mobile ? 24 : 12} className="mt-2">
              <button
                type="submit"
                className="w-full h-10 bg-lapis rounded-none text-neutral-50 font-montserrat
                text-base md:text-lg lg:text-xl px-4 py-2 font-normal flex justify-center items-center
                hover:bg-lapis/80 transition-all duration-200
                "
              >
                Submit
              </button>
            </Col>
          </Row>
        </Form>
      </div>
    </section>
  );
}
