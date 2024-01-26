import React, { useState } from "react";
import { TeamSections, teamOptions } from "../data/TeamData";
import { Row, Col } from "antd";
import Card from "./Card";
import useMobile from "../hooks/useMobile";

type Prop = {
  name: string;
};

export default function Team({ name }: Prop) {
  const { width, mobile } = useMobile();
  const teamSection = TeamSections[name];

  return (
    <section className="mt-[2rem] 2xl:mt-[6rem]" data-aos="fade-right">
      <Row gutter={[24, 40]}>
        {teamSection.map((item, key) =>
          (width && width < 1050) || mobile ? (
            <Col
              className="flex flex-col gap-2 items-center justify-center mb-[6rem]"
              span={width && width < 525 ? 24 :
                12
              }
              key={key}
            >
              <Card {...item} />
            </Col>
          ) : (
            <Col
              className="flex flex-col gap-2 items-center justify-center mb-[6rem]"
              span={name === "Managers" ? 12 : 6}
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
