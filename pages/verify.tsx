import { Row, Col, Form, Input, Button } from "antd";
import { useForm } from "antd/lib/form/Form";
import styles from "../styles/Auth.module.css";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { toast } from "react-toastify";
import axios from "axios";
import { setUser } from "../store/userSlice";
import { useRouter } from "next/router";

const { Item } = Form;

export default function Verify() {
  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.user);

  const [form] = useForm();
  const [active, setActive] = useState<boolean>(false);
  const [values, setValues] = useState<string[]>(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState<boolean>(false);
  const [timeOut, setTimeOut] = useState<number>(0);

  useEffect(() => {
    if (timeOut > 0) {
      setTimeout(() => {
        setTimeOut(timeOut - 1);
      }, 1000);
    }
  }, [timeOut]);

  const handleSubmit = () => {
    try {
      setLoading(true);
      if (!user) {
        throw new Error(
          "User not found. Try logging in before verifying your email."
        );
      }
      if (!user.verificationCode) {
        throw new Error(
          "User already verified. Try navigating to the dashboard."
        );
      }
      const verificationCode = values.join("");

      if (verificationCode !== user.verificationCode.code) {
        throw new Error(
          "Invalid or timed out verification code. Try generating a new code."
        );
      }
      if (user.verificationCode.expiresAt < new Date()) {
        throw new Error(
          "Invalid or timed out verification code. Try generating a new code."
        );
      }

      axios
        .post("/api/verification/verify", { verificationCode })
        .then(() => {
          toast.success("Successfully verified email.");
          dispatch(setUser({ ...user, verificationCode: undefined }));
          setLoading(false);
          router.push("/dashboard");
        })
        .catch((error) => {
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
      if (error?.message) {
        toast.error(error.message);
      } else {
        toast.error(error);
      }
      setLoading(false);
    }
    form.resetFields();
    setValues(["", "", "", "", "", ""]);
  };

  const resendCode = () => {
    try {
      setLoading(true);
      setTimeOut(30);
      if (!user) {
        throw new Error(
          "User not found. Try logging in before verifying your email."
        );
      }
      if (!user.verificationCode) {
        throw new Error(
          "User already verified. Try navigating to the dashboard."
        );
      }

      axios
        .post("/api/verification/resend")
        .then((res: any) => {
          if (!res?.data?.verificationCode) {
            throw new Error("Server error. Please try again.");
          } else {
            dispatch(
              setUser({ ...user, verificationCode: res.data.verificationCode })
            );
          }

          toast.success("Successfully resent verification code.");
          setLoading(false);
        })
        .catch((error) => {
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
      if (error?.message) {
        toast.error(error.message);
      } else {
        toast.error(error);
      }
      setLoading(false);
    }
    form.resetFields();
  };

  useEffect(() => {
    refetchActive();
  }, [values]);

  const refetchActive = () => {
    for (let i = 0; i < 6; i++) {
      form.setFieldValue(`input${i}`, values[i]);
      if (values[i] === "" || isNaN(Number(values[i]))) {
        setActive(false);
        return;
      }
    }
    setActive(true);
  };

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <Row
        className="py-6 sm:p-12 border-2 rounded border-airforce/[0.2] w-[95%] sm:w-[80%] md:w-[65%] lg:w-[50%] 2xl:w-[35%]"
        data-aos="fade-up"
      >
        <div className="font-montserrat text-4xl font-semibold text-semiblack text-center w-full">
          Verify Email
        </div>
        <div className="font-montserrat text-xl  text-semiblack text-center w-full mt-8">
          We sent you a 6-digit code to <b>{user?.email}</b>. <br />
          Please enter the code below to finish your sign-up process.
        </div>
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          className="flex items-center justify-center w-full pt-8"
        >
          <Row gutter={[10, 5]} className="w-full">
            <Col span={24} className="flex flex-row gap-[0.5rem] sm:gap-4">
              {Array.from(Array(6).keys()).map((_, index) => (
                <div key={index}>
                  <Item
                    name={`input${_}`}
                    label={
                      <label className={styles["touch-form-label"]}></label>
                    }
                  >
                    <Input
                      size="large"
                      className="py-6 font-montserrat text-4xl text-center font-semibold"
                      maxLength={1}
                      id={`validate${_}`}
                      value={values[_]}
                      onChange={(e) => {
                        setValues((prev) => {
                          const clone = [...prev];
                          clone[_] = e.target.value;
                          return clone.map((s) => s.replace(/\D/g, ""));
                        });
                      }}
                      onPaste={(e) => {
                        const paste = e.clipboardData.getData("text/plain");
                        setValues((prev) => {
                          const clone = [...prev];
                          for (let i = 0; i < paste.length; i++) {
                            if (_ + i < clone.length) {
                              clone[_ + i] = paste.charAt(i);
                            }
                          }
                          return clone.map((s) => s.replace(/\D/g, ""));
                        });
                      }}
                      onKeyUp={(e) => {
                        if (e.key === "Backspace") {
                          document.getElementById(`validate${_ - 1}`)?.focus();
                        }
                      }}
                      onKeyDown={(e) => {
                        if (!isNaN(Number(e.key))) {
                          const current = document.getElementById(
                            `validate${_}`
                          ) as HTMLInputElement;
                          if (current && current?.value !== "") {
                            document
                              .getElementById(`validate${_ + 1}`)
                              ?.focus();
                          }
                        }
                      }}
                    />
                  </Item>
                </div>
              ))}
            </Col>
            <Col
              span={24}
              className="mt-2 flex flex-col items-center justify-center"
            >
              <Button
                type="primary"
                htmlType="submit"
                disabled={!active || loading}
                className="w-[40%] h-10 bg-lapis rounded-md text-neutral-50 font-montserrat
              text-2xl font-normal flex justify-center items-center"
              >
                Verify
              </Button>
              <a
                onClick={() => {
                  if (loading || timeOut) {
                    return;
                  }
                  resendCode();
                }}
                className={`mt-4 underline hover:underline ${
                  loading || timeOut ? "text-gray-400" : ""
                }`}
              >
                Resend Code {timeOut ? `(${timeOut} s)` : ""}
              </a>
            </Col>
          </Row>
        </Form>
      </Row>
    </div>
  );
}
