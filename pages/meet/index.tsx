import { LeadMembers } from "../../data/TeamData";
import Card from "../../components/Card";
import { Row, Col } from "antd";
import TeamTabs from "../../components/TeamTabs";

export default function Meet() {
  return (
    <main className="w-full px-[4rem] flex flex-col gap-12 mb-[8rem]">
      <TeamTabs />
      <section className="mt-[6rem]" data-aos="fade-right">
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
    </main>
  );
}
