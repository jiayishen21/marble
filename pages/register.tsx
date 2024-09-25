import { Row, Col, Form, Input, Button, Checkbox } from "antd";
import { useForm } from "antd/lib/form/Form";
import Link from "next/link";
import styles from "../styles/Auth.module.css";
import encrypt from "../utils/encrypt";
import { toast } from "react-toastify";
import { isNameValid, isEmailValid, isPasswordValid } from "../utils/validForm";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { setUser } from "../store/userSlice";
import useMobile from "../hooks/useMobile";

const { Item } = Form;
const { Password } = Input;

export default function Register() {
  const dispatch = useDispatch<AppDispatch>();
  const [form] = useForm();
  const [loading, setLoading] = useState(false);
  const [agree, setAgree] = useState(false);
  const { mobile } = useMobile();

  const handleSubmit = (formData: any) => {
    try {
      setLoading(true);
      if (!isNameValid(formData["given-name"])) {
        throw new Error(
          "Invalid format for first name. Please make sure it is not empty and contains only alphabetical characters, dashes, quotes, and periods."
        );
      }
      if (!isNameValid(formData["lastname"])) {
        throw new Error(
          "Invalid format for last name. Please make sure it is not empty and contains only alphabetical characters, dashes, quotes, and periods."
        );
      }
      if (!isEmailValid(formData["email"])) {
        throw new Error(
          "Invalid email. Please make sure it is not empty and in the correct format."
        );
      }
      if (!isPasswordValid(formData["password"])) {
        throw new Error(
          "Invalid password. Please make sure it is not empty and contains at least 8 characters, including at least one uppercase letter, one lowercase letter, and one number."
        );
      }
      if (formData["password"] !== formData["confirm"]) {
        throw new Error(
          "Passwords do not match. Please make sure they are the same."
        );
      }
      if (!agree) {
        throw new Error(
          "Please read and acknowledge the conditions in order to become a member of Marble Investments."
        );
      }

      const encrypted = encrypt(formData.password);

      axios
        .post("/api/user/signup", {
          firstName: formData["given-name"],
          lastName: formData["lastname"],
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
    // form.resetFields()
  };

  return (
    <div className={`flex items-center justify-center w-full h-screen`}>
      <Row
        className={`p-12 rounded ${mobile ? "w-full" : "w-[35%] border-airforce/[0.2] border-2"
          }`}
        data-aos={mobile ? undefined : "fade-up"}
      >
        <div
          className="text-semiblack font-bold leading-[1.3] z-[10] text-2xl sm:text-3xl lg:text-4xl 
            2xl:text-5xl text-center w-full"
        >
          Become a Marble Member
        </div>
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          className="flex items-center justify-center w-full pt-8"
        >
          <Row gutter={[10, 5]} className="w-full">
            <Col span={11}>
              <Item
                name="given-name"
                label={
                  <label className={styles["touch-form-label"]}>
                    First Name
                  </label>
                }
              >
                <Input size="large" />
              </Item>
            </Col>
            <Col span={2}></Col>
            <Col span={11}>
              <Item
                name="lastname"
                label={
                  <label className={styles["touch-form-label"]}>
                    Last Name
                  </label>
                }
              >
                <Input size="large" />
              </Item>
            </Col>
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
            <Col span={24}>
              <Item
                name="password"
                label={
                  <label className={styles["touch-form-label"]}>
                    Set a password
                  </label>
                }
              >
                <Password size="large" />
              </Item>
            </Col>
            <Col span={24}>
              <Item
                name="confirm"
                label={
                  <label className={styles["touch-form-label"]}>
                    Retype password
                  </label>
                }
              >
                <Password size="large" />
              </Item>
            </Col>
            <Col
              span={24}
            >
              <Checkbox
                checked={agree}
                onChange={(e: any) => setAgree(e.target.checked)}
              >
                <div className={`${styles["touch-form-label"]} py-1`}>
                  I confirm and acknowledge Marble's{' '}
                  <Link
                    className="text-blue-500 underline hover:underline hover:text-blue-300"
                    href='/documents/privacy-policy.pdf'
                    target="_blank"
                  >privacy policy.
                  </Link>
                </div>
              </Checkbox>
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
                Sign Up
              </Button>
              <Link href="/login" className="mt-4 underline hover:underline">
                I already have an account
              </Link>
            </Col>
          </Row>
        </Form>
      </Row>
    </div>
  );
}
