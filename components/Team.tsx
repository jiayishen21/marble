import React, { useState } from "react";
import { TeamSections, teamOptions } from "../data/TeamData";
import { Row, Col } from "antd";
import Card from "./Card";
import useMobile from "../hooks/useMobile";

type Prop = {
  name: string;
};

export default function Team({ name }: Prop) {
  const { mobile } = useMobile()
  const teamSection = TeamSections[name];

  return (
    <section className="mt-[6rem]" data-aos="fade-right">
      <Row gutter={[24, 40]}>
        {teamSection.map((item, key) =>
          mobile ? (
            <Col
              className="flex flex-col gap-2 items-center justify-center mb-[6rem]"
              span={name === 'Managers' ? 8 : 12}
              key={key}
            >
              <Card {...item} />
            </Col>
          ) : (
            <Col
              className="flex flex-col gap-2 items-center justify-center mb-[6rem]"
              span={name === 'Managers' ? 4 : 6}
              key={key}
            >
              <Card {...item} />
            </Col>
          )
        )}
      </Row>
    </section>
  );
}
