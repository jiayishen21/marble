import { LeadMembers, teamOptions } from "../../data/TeamData";
import Card from "../../components/Card";
import { Row, Col, Button, Form, Select, Image } from "antd";
import { useState } from "react";
import Team from "../../components/Team";
import useMobile from "../../hooks/useMobile";

export default function Meet() {
  const { mobile } = useMobile();
  const [option, setOption] = useState("Managers");
  const { Option } = Select;

  return (
    <>
      <main className="w-full px-[1.5rem] md:px-[2.5rem] lg:px-[3.5rem] xl:px-[4.5rem] 2xl:px-[6.5rem] flex flex-col gap-12 mb-[8rem] relative">
        <img
          src="/elements/shape.svg"
          className="w-[30vw] h-auto absolute right-0 top-0 max-xl:hidden"
        />
        <div>
          <section className="gap-[2rem]">
            <div className="flex flex-col gap-6" data-aos="fade-right">
              <h1
                className="text-semiblack font-bold leading-[1.3] z-[10] text-2xl sm:text-3xl lg:text-4xl 
            2xl:text-5xl mt-[5rem]"
              >
                Meet Our Team
              </h1>
              <span className="text-semiblack text-base md:text-lg xl:text-xl w-full xl:max-w-[55%]">
                {/* We've gathered a top-notch team of diverse talent from across
                Canada.  */}
                Get to know the people forging your financial success.
              </span>
            </div>
          </section>
          <section className="w-[50%] flex gap-[1rem] mt-[3rem]">
            {mobile ? (
              <Form>
                <Form.Item>
                  <Select
                    onChange={(value) => setOption(value)}
                    placeholder="Managers"
                  >
                    {teamOptions.map((option: any) => (
                      <Option key={option.title} value={option.title}>
                        {option.title}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Form>
            ) : (
              <>
                {teamOptions.map((item, key) => (
                  <Button
                    key={key}
                    className={`flex items-center justify-center w-fit rounded-full gap-[0.5rem] px-[2rem] py-[1.5rem] text-base md:text-lg xl:text-xl text-[#17499A] ${option === item.title ? "bg-[#E7F6F9] border-4" : "bg-none"
                      }`}
                    onClick={() => setOption(item.title)}
                  >
                    {item.title}
                  </Button>
                ))}
              </>
            )}
          </section>
        </div>
        {option === "Managers" ? (
          <section
            className="mt-[2rem] 2xl:mt-[6rem]"
            data-aos={mobile ? undefined : "fade-right"}
          >
            <Row gutter={[24, 40]}>
              {LeadMembers.map((item, key) => (
                <Col
                  className="flex flex-col gap-2 items-center justify-center mb-[6rem]"
                  key={key}
                  xs={24}
                  md={6}
                >
                  <Card {...item} />
                </Col>
              ))}
            </Row>
          </section>
        ) : (
          <Team name={option} />
        )}
      </main>
    </>
  );
}
