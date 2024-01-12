import React from "react";
import { TeamSections } from "../../data/TeamData";
import { Row, Col } from "antd";
import Card from "../../components/Card";
import TeamTabs from "../../components/TeamTabs";

export default function developer() {
  return (
    <main className="w-full px-[4rem] flex flex-col gap-12 mb-[8rem]">
      <TeamTabs />
      <section className="mt-[6rem]" data-aos="fade-right">
        <Row gutter={[24, 40]}>
          {TeamSections.Developers.map((item, key) => (
            <Col
              className="flex flex-col gap-2 items-center justify-center mb-[6rem]"
              span={6}
              key={key}
            >
              <Card {...item} />
            </Col>
          ))}
        </Row>
      </section>
    </main>
  );
}
