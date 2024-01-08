import {Row, Col, Form, Input, Button} from "antd"
import { useForm } from "antd/lib/form/Form";
import Link from "next/link";
import styles from "../styles/Auth.module.css"
import { useCallback, useEffect, useState } from "react";

const {Item} = Form

export default function Verify() {
  const [form] = useForm()
  const [active, setActive] = useState<boolean>(false)

  const handleSubmit = (formData:any) => {
    alert(JSON.stringify(formData))
    form.resetFields()
  }

  const refetchActive = () => {
    const data = form.getFieldsValue()
    console.log(data)
    for(let i = 0; i < 6; i++){
        if(!data || !data[`input${i}`] || data[`input${i}`] === "" || isNaN(Number(data[`input${i}`]))){
            setActive(false)
            return
        }
    }
    setActive(true)
  }

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <Row className="p-12 border-2 rounded border-airforce/[0.2] w-[35%]"
      data-aos="fade-up">
        <div className="font-hind text-4xl font-semibold text-semiblack text-center w-full">
          Verify Email
        </div>
        <div className="font-hind text-xl  text-semiblack text-center w-full mt-8">
            We sent you a 6-digit code to <b>sample-email@gmail.com</b>. <br/> 
            Please enter the code below to finish your sign-up process.
        </div>
        <Form form={form} onFinish={handleSubmit} layout="vertical"
        className="flex items-center justify-center w-full pt-8">
          <Row gutter={[10, 5]} className="w-full">
            <Col span={24} className="flex flex-row gap-4">
                {Array.from(Array(6).keys()).map((item, key) => 
                    <div key={key}>
                        <Item 
                        name={`input${item}`}
                        label={<label className={styles["touch-form-label"]}></label>}
                        >
                            <Input size="large" className="py-6 font-hind text-4xl text-center font-semibold" 
                            maxLength={1} id={`validate${item}`}
                            onKeyUp={e => {
                                if(!isNaN(Number(e.key)) || e.key === 'Backspace'){
                                    if (e.key === 'Backspace') {
                                        document.getElementById(`validate${item-1}`)?.focus()
                                    }
                                    else{
                                        const current = document.getElementById(`validate${item}`) as HTMLInputElement
                                        if(current && current?.value !== ''){
                                            document.getElementById(`validate${item+1}`)?.focus()
                                        }
                                    }
                                }
                            }}
                            onChange={() => {
                                refetchActive()
                            }}/>
                        </Item>
                    </div>
                )}
            </Col>
            <Col span={24} className="mt-2 flex flex-col items-center justify-center">
                <Button type="primary" htmlType="submit" disabled={!active}
              className="w-[40%] h-10 bg-lapis rounded-md text-neutral-50 font-hind
              text-2xl font-normal flex justify-center items-center">
                Submit
              </Button>
              <a onClick={e => e.stopPropagation()}
              className="mt-4 underline hover:underline">
                Resend Code
              </a>
            </Col>
          </Row>
        </Form>
      </Row>
    </div>
  );
}
