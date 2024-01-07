import React, { useCallback } from "react";
import { LeadMembers, TeamSections } from "../data/TeamData";
import { Button, Row, Col, Divider, Image } from "antd";
import { MdEmail } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa";

export default function Meet() {
  const SocialButtons = useCallback((item:any) => {
    return <div className="flex gap-6 mt-2">
      <Button type="primary" className="rounded-full bg-lapis
      flex items-center justify-center text-white text-xl"
      href={item.email} target="_blank">
        <MdEmail/>
      </Button>
      <Button type="primary" className="rounded-full bg-lapis
      flex items-center justify-center text-white text-xl"
      href={item.link} target="_blank">
        <FaLinkedin/>
      </Button>
    </div>
  }, [])

  const Card = useCallback((item:any, large:boolean) => {
    return <>
      <Image
        src={item.photo}
        alt={item.name}
        preview={false}
        className={`scale-[${large ? 1.25 : 1}] origin-bottom`}
      />
      <span className="text-semiblack font-bold text-3xl font-hind">{item.name}</span>
      <span className="font-cairo font-normal tracking-wider text-xl text-semiblack">{item.role}</span>
      {SocialButtons(item)}
    </>
  }, [])

  return (
    <main className="w-full px-[4rem] flex flex-col gap-12 mb-[8rem]">
      <section className="gap-[2rem] px-[3rem]">
        <div className="flex flex-col gap-6" data-aos="fade-right">
          <span className="text-semiblack mt-[5rem] font-bold text-6xl">Meet Our Team</span>
          <span className="text-semiblack text-2xl">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut sint <br/>
            maiores dicta corrupti quae eaque magni praesentium labore, <br/>
            numquam cupiditate saepe architecto necessitatibus cumque minima <br/>
            culpa sequi. Aliquid, quia non. <br/>
          </span>
        </div>
      </section>
      <section className="mt-20" data-aos="fade-right">
        <Row gutter={[16, 0]}>
          {LeadMembers.map((item, key) => (
            <Col className="flex flex-col gap-2 items-center justify-center" key={key}
            span={8}>
              {Card(item, true)}
            </Col>
          ))}
        </Row>
      </section>
      {TeamSections.map((section, key) => (
        <div key={key} className="flex flex-col gap-12" data-aos="fade-right">
          <Divider className="bg-airforce h-[2px]"/>
          <div className="text-semiblack font-hind font-bold text-[2.5em] px-[2.5rem]">
            {section.title}
          </div>
          <section>
            <Row gutter={[12, 40]}>
              {section.members.map((item, ikey) => (
                <Col className="flex flex-col gap-2 items-center justify-center" span={6}
                key={ikey}>
                  {Card(item, false)}
                </Col>
              ))}   
            </Row>
          </section>
        </div>
      ))}
    </main>
  );
}
