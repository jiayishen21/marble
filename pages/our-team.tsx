import { PrimaryTeamData, SecondaryTeamData } from "../data/TeamData"
import { Row, Col, Image, Divider } from "antd"

export default function Team(){
    return(
        <main className="flex flex-col gap-12 px-20 pt-20 text-semiblack">
            <div className="font-bold text-6xl">
                Meet our Team
            </div>
            <div className="text-2xl">
                Gorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate <br/>
                libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu <br/>
                ad litora torquent per conubia nostra, per inceptos himenaeos.
            </div>
            <Row gutter={[20, 20]}>
                {PrimaryTeamData.map((person, key) => {
                    return (  
                        <div key={key}>
                            {person.name}
                        </div>
                    )
                })}
            </Row>
        </main>
    )
}