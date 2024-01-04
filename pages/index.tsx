import type { NextPage } from "next";
import Polywave from "../components/Polywave";
import Navbar from "../components/layout/Navbar";
import { useNavParams } from "../hooks/useNavParams";
import { Button, Col, Form, Input, Row } from "antd";
import { ContactOptions } from "../data/ContactOptions";
import { useForm } from "antd/lib/form/Form";

import styles from "../styles/Home.module.css"
import { useRouter } from "next/router";
import Footer from "../components/layout/Footer";

const {Item} = Form;
const {TextArea} = Input;

const Home: NextPage = () => {
  const {navRef, navHeight} = useNavParams()
  const router = useRouter()

  const [form] = useForm()

  const onSubmit = (formData:any) => {
    alert(JSON.stringify(formData))
    form.resetFields()
  }

  return (
    <main>
      <div
        style={{
          display:"grid",
          gridTemplateRows:`${navHeight}px calc(100vh - ${navHeight}px)`
      }}>
        <Navbar navRef={navRef} blank={false} router={router}/>
        <div className="flex absolute bottom-0 left-0 h-[300px] w-screen overflow-y-hidden pointer-events-none">
          <div className={`absolute bottom-0 left-0 z-[500] w-screen overflow-hidden
          ${styles['bottom-surge']}`}>
              <Polywave/>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-screen h-screen z-[-1]"/>
        <section className={`relative flex flex-col gap-12 px-20 h-full`}
        data-aos="fade-right">
          <div className="flex flex-col gap-3 mt-20 text-semiblack font-bold text-6xl">
              A hedge fund like no other —<br/>
              by students, for students.
          </div>
          <div className="text-airforce font-cairo font-semibold tracking-wide text-3xl">
              “TO INVEST IN THE FUTURE, INVEST IN THOSE WHO BUILD THE FUTURE” <br/>
              — PREFERABLY THIS IS MORE UNIQUE TO MARBLE THAN A QUOTE
          </div>
          <Button type="primary" className="w-60 h-14 bg-lapis rounded-md text-neutral-50 font-hind
          text-2xl font-normal flex justify-center items-center">
            Invest with us
          </Button>
        </section>
      </div>
      <section className={`${styles['buffer']} h-[2rem]`}/>
      <section className="bg-airforce flex flex-col gap-12 pb-[10rem] pt-[8rem]"> 
        <div className="text-neutral-50 text-6xl font-bold
        text-center" data-aos="fade-up">
          Our Mission
        </div>
        <div className=" text-neutral-50 text-3xl font-normal mx-auto text-center"
         data-aos="fade-up">
        Gorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate <br/>
        libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu <br/>
        ad litora torquent per conubia nostra, per inceptos himenaeos.
        </div>
        <div className="w-screen flex justify-around align-center pt-8 px-10">
          <div className="bg-neutral-50 h-80 w-[28%] bg-opacity-50 rounded"
           data-aos="fade-right"/>
          <div className="bg-neutral-50 h-80 w-[28%] bg-opacity-50 rounded"
          data-aos="fade-up"/>
          <div className="bg-neutral-50 h-80 w-[28%] bg-opacity-50 rounded"
          data-aos="fade-left"/>
        </div>
      </section>
      <section className="grid grid-cols-2 gap-12 pb-10 pt-[10rem]"> 
        <div className="flex flex-col gap-12 pl-20" data-aos="fade-right">
          <div className="text-semiblack text-6xl font-bold">
            We are passionate about <br/>
            growing your money
          </div>
          <div className="text-semiblack text-2xl">
            Gorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, 
            dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, 
            risus sem sollicitudin lacus, ut interdum tellus elit sed risus.
             Maecenas eget condimentum velit, sit amet feugiat lectus.
          </div>
          <Button type="primary" className="w-60 h-14 bg-lapis rounded-md text-neutral-50 font-hind
          text-2xl font-normal flex justify-center items-center">
            Meet our team
          </Button>
        </div>
        <div className="flex items-center justify-center pl-20 pr-40">
          <div className="bg-neutral-400 h-[28rem] w-full bg-opacity-50 rounded"
           data-aos="fade-left"/>
        </div>
      </section>
      <div className="pt-[16rem] pl-20">
        <div className="text-semiblack text-6xl font-bold font-hind">
          Get in touch
        </div>
      </div>
      <Row className="pb-[12rem] pt-[2rem]"> 
        <Col className="flex flex-col gap-12 pl-20" span={9}>
          <div className="text-semiblack text-2xl font-hind">
            We invite you to contact us through one of the methods below.
          </div>
          <div className="flex flex-col justify-between h-full pb-8 pt-4">
          {ContactOptions.map((item, key) => {
            return (
              <div className="flex flex-col gap-6 text-2xl" key={key}>
                <div className="flex flex-row items-center gap-6">
                  <span className="text-3xl">{item.icon}</span>
                  <span className="font-hind font-bold">{item.title}</span>
                </div>
                <div className="font-hind">{item.value}</div>
              </div>
            )
          })}
          </div>
        </Col>
        <Col span={2} className="flex items-center justify-center">
          <div className="w-[0.25em] h-full bg-lapis rounded"></div>
        </Col>
        <Col className="flex flex-col gap-8" span={10}>
          <div className="text-semiblack text-2xl font-hind">
            Or, reach us directly.
          </div>
          <Form form={form} layout="vertical" onFinish={onSubmit}>
          <div className="text-semiblack/[0.5] text-xl font-light font-hind mb-4">
            All fields marked with * are required.
            </div>
            <Row gutter={[10, 10]}>
              <Col span={12}>
                <Item name="fullname" className="touch-form"
                rules={[
                  {
                    required: true,
                    message: "Required field"
                  }
                ]}
                label={<label className={styles['touch-form-label']}>Full Name</label>}>
                  <Input size="large" placeholder="Name"
                  />
                </Item>
              </Col>
              <Col span={12}>
                <Item name="email"
                rules={[
                  {
                    required: true,
                    message: "Required field"
                  }
                ]}
                label={<label className={styles['touch-form-label']}>Email</label>}>
                  <Input size="large" placeholder="Email"/>
                </Item>
              </Col>
              <Col span={12}>
                <Item name="company"
                rules={[
                  {
                    required: true,
                    message: "Required field"
                  }
                ]}
                label={<label className={styles['touch-form-label']}>Your Company/Institution</label>}>
                  <Input size="large" placeholder="Company"/>
                </Item>
              </Col>
              <Col span={12}>
                <Item name="subject"
                rules={[
                  {
                    required: true,
                    message: "Required field"
                  }
                ]}
                label={<label className={styles['touch-form-label']}>Subject</label>}>
                  <Input size="large" placeholder="Subject"/>
                </Item>
              </Col>
              <Col span={24}>
                <Item name="message"
                rules={[
                  {
                    required: true,
                    message: "Required field"
                  }
                ]}
                label={<label className={styles['touch-form-label']}>Please leave your message below.</label>}>
                  <TextArea size="large" placeholder="Enter your message here..."
                  rows={5} style={{resize:"none"}}/>
                </Item>
              </Col>
              <Col span={6} className="mt-2">
                <Button type="primary" htmlType="submit"
                className="w-full h-10 bg-lapis rounded-md text-neutral-50 font-hind
                text-2xl font-normal flex justify-center items-center">
                  Submit
                </Button>
              </Col>  
            </Row>
          </Form>
        </Col>
      </Row>
      <Footer/>
    </main>
  );
};

export default Home;
