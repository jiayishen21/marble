import { Row, Col, Form, Input, Button } from "antd";
import { useForm } from "antd/lib/form/Form";
import Link from "next/link";
import styles from "../styles/Auth.module.css";
import { FaUnlockAlt } from "react-icons/fa";
import { isEmailValid } from "../utils/validForm";
import axios from "axios";
import encrypt from "../utils/encrypt";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { setUser } from "../store/userSlice";
import { AppDispatch } from "../store/store";
import { useDispatch } from "react-redux";
import useMobile from "../hooks/useMobile";

const { Item } = Form;
const { Password } = Input;

export default function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const [form] = useForm();
  const { mobile } = useMobile();

  const handleSubmit = (formData: any) => {
    try {
      setLoading(true);

      if (!isEmailValid(formData["email"])) {
        throw new Error(
          "Could not find an account matching this email and password. Please try again."
        );
      }
      if (!formData["password"]) {
        throw new Error(
          "Could not find an account matching this email and password. Please try again."
        );
      }

      const encrypted = encrypt(formData.password);

      axios
        .post("/api/user/login", {
          email: formData["email"],
          encryptedPassword: encrypted.encryptedPassword,
          iv: encrypted.iv,
          clientKey: encrypted.clientKey,
        })
        .then((response: any) => {
          if (!response?.data?.user) {
            throw new Error("Server error. Please try again");
          }
          dispatch(setUser(response.data.user));
          setLoading(false);
        })
        .catch((error: any) => {
          if (error?.response?.data?.message) {
            toast.error(error.response.data.message);
          } else if (error?.message) {
            toast.error(error.message);
          } else {
            toast.error(error);
          }
          setLoading(false);
        });
    } catch (error: any) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <Row
        className={`p-12 rounded ${mobile ? "w-full" : "w-[35%] border-airforce/[0.2] border-2"
          }`}
        data-aos={mobile ? undefined : "fade-up"}
      >
        <div className="text-[3.25rem] flex items-center text-semiblack justify-center w-full mb-8">
          <FaUnlockAlt />
        </div>
        <div
          className="text-semiblack font-bold leading-[1.3] z-[10] text-2xl sm:text-3xl lg:text-4xl 
            2xl:text-5xl text-center w-full"
        >
          Sign into Your Marble Account
        </div>
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          className="flex items-center justify-center w-full pt-8"
        >
          <Row gutter={[10, 5]} className="w-full">
            <Col span={24}>
              <Item
                name="email"
                label={
                  <label className={styles["touch-form-label"]}>Email</label>
                }
              >
                <Input size="large" />
              </Item>
            </Col>
            <Col span={24} className="flex flex-col">
              <Item
                name="password"
                label={
                  <label className={styles["touch-form-label"]}>Password</label>
                }
              >
                <Password size="large" />
              </Item>
              {/* FIXME */}
              {/* <Link
                href="/forgot"
                className="text-end mb-4 underline hover:underline"
              >
                Forgot password?
              </Link> */}
            </Col>
            <Col
              span={24}
              className="mt-2 flex flex-col items-center justify-center"
            >
              <Button
                type="primary"
                htmlType="submit"
                disabled={loading}
                className="px-10 h-10 bg-lapis rounded-md text-neutral-50 font-montserrat
              text-2xl font-normal flex justify-center items-center"
              >
                Sign In
              </Button>
              <Link href="/register" className="mt-4 underline hover:underline">
                Create an account
              </Link>
            </Col>
          </Row>
        </Form>
      </Row>
    </div>
  );
}
