import {Row, Col, Form, Input, Button} from "antd"
import { useForm } from "antd/lib/form/Form";
import styles from "../styles/Auth.module.css"
import { useEffect, useState } from "react";

const {Item} = Form

export default function Verify() {
  const [form] = useForm()
  const [active, setActive] = useState<boolean>(false)
  const [values, setValues] = useState<string[]>(["", "", "", "", "", ""])

  const handleSubmit = (formData:any) => {
    alert(JSON.stringify(formData))
    form.resetFields()
  }

  useEffect(() => {
    refetchActive()
  }, [values])

  const refetchActive = () => {
    for(let i = 0; i < 6; i++){
        form.setFieldValue(`input${i}`, values[i])
        if(values[i] === "" || isNaN(Number(values[i]))){
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
                {Array.from(Array(6).keys()).map((_, index) => 
                    <div key={index}>
                        <Item 
                        name={`input${_}`}
                        label={<label className={styles["touch-form-label"]}></label>}
                        >
                            <Input size="large" className="py-6 font-hind text-4xl text-center font-semibold" 
                            maxLength={1} id={`validate${_}`}
                            value={values[_]}
                            onChange={e => {
                                setValues(prev => {
                                    const clone = [...prev]
                                    clone[_] = e.target.value
                                    return clone.map(s => s.replace(/\D/g, ''))
                                })
                            }}
                            onPaste={e => {
                                const paste = e.clipboardData.getData('text/plain')
                                setValues(prev => {
                                    const clone = [...prev]
                                    for(let i = 0; i < paste.length; i++){
                                        if(_ + i < clone.length){
                                            clone[_ + i] = paste.charAt(i)
                                        }
                                    }
                                    return clone.map(s => s.replace(/\D/g, ''))
                                })
                            }}
                            onKeyUp={e => {
                                if (e.key === 'Backspace') {
                                    document.getElementById(`validate${_-1}`)?.focus()
                                }
                            }}
                            onKeyDown={e => {
                                if(!isNaN(Number(e.key))){
                                    const current = document.getElementById(`validate${_}`) as HTMLInputElement
                                    if(current && current?.value !== ''){
                                        document.getElementById(`validate${_+1}`)?.focus()
                                    }
                                }
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
