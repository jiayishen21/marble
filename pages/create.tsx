import {Row, Col, Form, Input, Button} from "antd"
import { useForm } from "antd/lib/form/Form";
import Link from "next/link";
import styles from "../styles/Auth.module.css"

const {Item} = Form
const {Password} = Input

export default function Create() {
  const [form] = useForm()

  const handleSubmit = (formData:any) => {
    alert(JSON.stringify(formData))
    form.resetFields()
  }

  return (
    <div className="flex items-center justify-center w-full h-full">
      <Row className="p-12 border-2 rounded border-airforce/[0.2] w-[35%]"
      data-aos="fade-up">
        <div className="font-hind text-4xl font-semibold text-semiblack text-center w-full">
          Become a Marble Investor
        </div>
        <Form form={form} onFinish={handleSubmit} layout="vertical"
        className="flex items-center justify-center w-full pt-8">
          <Row gutter={[10, 5]} className="w-full">
            <Col span={11}>
              <Item 
              name="firstname"
              label={<label className={styles["touch-form-label"]}>First Name</label>}
              >
                <Input size="large"/>
              </Item>
            </Col>
            <Col span={2}></Col>
            <Col span={11}>
              <Item 
              name="firstname"
              label={<label className={styles["touch-form-label"]}>Last Name</label>}
              >
                <Input size="large"/>
              </Item>
            </Col>
            <Col span={24}>
              <Item 
              name="email"
              label={<label className={styles["touch-form-label"]}>Email</label>}
              >
                <Input size="large"/>
              </Item>
            </Col>
            <Col span={24}>
              <Item 
              name="password"
              label={<label className={styles["touch-form-label"]}>Set a password</label>}
              >
                <Password size="large"/>
              </Item>
            </Col>
            <Col span={24}>
              <Item 
              name="confirm"
              label={<label className={styles["touch-form-label"]}>Retype password</label>}
              >
                <Input size="large"/>
              </Item>
            </Col>
            <Col className="flex flex-row gap-2 items-start justify-center" span={24}>
              <Item name="agree">
                <Input size="large" type="checkbox"/>
              </Item>
              <div className={`${styles["touch-form-label"]} py-1`}>
                I confirm and acknowledge the terms and conditions.
              </div>
            </Col>
            <Col span={24} className="mt-2 flex flex-col items-center justify-center">
              <Button type="primary" htmlType="submit"
              className="w-[40%] h-10 bg-lapis rounded-md text-neutral-50 font-hind
              text-2xl font-normal flex justify-center items-center">
                Sign Up
              </Button>
              <Link href="/login" className="mt-4 underline hover:underline">I already have an account</Link>
            </Col>
          </Row>
        </Form>
      </Row>
    </div>
  );
}
