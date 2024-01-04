import {Row, Col, Form, Input, Button} from "antd"
import { useForm } from "antd/lib/form/Form";
import Link from "next/link";
import styles from "../styles/Auth.module.css"
import { FaUnlockAlt } from "react-icons/fa";

const {Item} = Form
const {Password} = Input

export default function Login() {
  const [form] = useForm()

  const handleSubmit = (formData:any) => {
    alert(JSON.stringify(formData))
    form.resetFields()
  }

  return (
    <div className="flex items-center justify-center w-full h-full">
      <Row className="p-12 border-2 rounded border-airforce/[0.2] w-[35%]"
      data-aos="fade-up">
        <div className="text-[3.25rem] flex items-center text-semiblack justify-center w-full mb-8">
          <FaUnlockAlt/>
        </div>
        <div className="font-hind text-4xl font-semibold text-semiblack text-center w-full">
          Sign into Your Marble Account
        </div>
        <Form form={form} onFinish={handleSubmit} layout="vertical"
        className="flex items-center justify-center w-full pt-8">
          <Row gutter={[10, 5]} className="w-full">
            <Col span={24}>
              <Item 
              name="username"
              label={<label className={styles["touch-form-label"]}>Username or Email</label>}
              >
                <Input size="large"/>
              </Item>
            </Col>
            <Col span={24} className="flex flex-col">
              <Item 
              name="password"
              label={<label className={styles["touch-form-label"]}>Password</label>}
              >
                <Password size="large"/>
              </Item>
              <Link href="/forgot" className="text-end mb-4 underline hover:underline">Forgot password?</Link>
            </Col>
            <Col span={24} className="mt-2 flex flex-col items-center justify-center">
              <Button type="primary" htmlType="submit"
              className="w-[40%] h-10 bg-lapis rounded-md text-neutral-50 font-hind
              text-2xl font-normal flex justify-center items-center">
                Sign In
              </Button>
              <Link href="/create" className="mt-4 underline hover:underline">Create an account</Link>
            </Col>
          </Row>
        </Form>
      </Row>
    </div>
  );
}
