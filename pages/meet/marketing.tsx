import React from "react";
import { TeamSections } from "../../data/TeamData";
import { Row, Col } from "antd";
import Card from "../../components/Card";
import TeamTabs from "../../components/TeamTabs";

export default function marketing() {
  return (
    <main className="w-full px-[4rem] flex flex-col gap-12 mb-[8rem]">
      <TeamTabs />
      <section className="mt-[5rem]" data-aos="fade-right">
        <Row gutter={[12, 40]}>
          {TeamSections.Marketing.map((item, key) => (
            <Col
              className="flex flex-col gap-2 items-center justify-center"
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
