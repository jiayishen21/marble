import { LeadMembers, teamOptions } from "../../data/TeamData";
import Card from "../../components/Card";
import { Row, Col, Button } from "antd";
import { useState } from "react";
import Team from "../../components/Team";
import useMobile from "../../hooks/useMobile";

export default function Meet() {
  const { mobile } = useMobile()
  const [option, setOption] = useState("Managers");

  return (
    <>
      <main className="w-full px-[4rem] flex flex-col gap-12 mb-[8rem]">
        <div>
          <section className="gap-[2rem] px-[3rem]">
            <div className="flex flex-col gap-6" data-aos="fade-right">
              <span className="text-semiblack mt-[5rem] font-bold text-6xl">
                Meet Our Team
              </span>
              <span className="text-semiblack text-lg max-w-[55%]">
                We've gathered a top-notch team of diverse talent from across Canada. Get to know the folks forging your financial success.
              </span>
            </div>
          </section>
          <section className="w-[50%] flex gap-[1rem] pl-[3rem] mt-[3rem]">
            {teamOptions.map((item, key) => (
              <Button
                key={key}
                className={`flex items-center justify-center w-fit rounded-full gap-[0.5rem] px-[3rem] py-[1.5rem] text-lg text-[#17499A] ${option === item.title ? "bg-[#E7F6F9] border-4" : "bg-none"
                  }`}
                onClick={() => setOption(item.title)}
              >
                {item.title}
              </Button>
            ))}
          </section>
        </div>
        {option === 'Managers' ? (
          <section
            className="mt-[6rem]"
            data-aos={mobile ? undefined : "fade-right"}
          >
            <Row gutter={[24, 40]}>
              {LeadMembers.map((item, key) => (
                <Col
                  className="flex flex-col gap-2 items-center justify-center mb-[6rem]"
                  key={key}
                  span={8}
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
  )
}
