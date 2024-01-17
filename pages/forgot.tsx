import { Row, Col, Form, Input, Button } from "antd";
import { useForm } from "antd/lib/form/Form";
import Link from "next/link";
import styles from "../styles/Auth.module.css";

const { Item } = Form;

export default function Forgot() {
  const [form] = useForm();

  const handleSubmit = (formData: any) => {
    alert(JSON.stringify(formData));
    form.resetFields();
  };

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <Row
        className="p-12 border-2 rounded border-airforce/[0.2] w-[35%]"
        data-aos="fade-up"
      >
        <div className="font-montserrat text-4xl font-semibold text-semiblack text-center w-full">
          Account Recovery
        </div>
        <div className="font-montserrat text-xl  text-semiblack text-center w-full mt-8">
          Enter your email to recover your password
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
            <Col
              span={24}
              className="mt-2 flex flex-col items-center justify-center"
            >
              <Button
                type="primary"
                htmlType="submit"
                className="px-10 h-10 bg-lapis rounded-md text-neutral-50 font-montserrat
              text-2xl font-normal flex justify-center items-center"
              >
                Send Email
              </Button>
              <Link href="/login" className="mt-4 underline hover:underline">
                Back
              </Link>
            </Col>
          </Row>
        </Form>
      </Row>
    </div>
  );
}
