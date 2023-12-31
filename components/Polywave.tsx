import styles from "../styles/Polywave.module.css"

export default function Polywave(){
    const polywave_props = (i:number) => {
        return {
            backgroundImage: `url('/waves/polywave${i}.svg')`,
            backgroundSize: "50vw auto",
            backgroundRepeat: "repeat-x",
            backgroundPositionY: "bottom",
            animationDuration: `${4.5+2*i}s`,
        }
    }

    return(
        <div className={`${styles["polywave-container"]} h-[300px]`}>
            <div className={`${styles["polywave-internal"]} opacity-30`} style={polywave_props(3)}/>
            <div className={`${styles["polywave-internal"]} opacity-40 delay-[3s]`} style={polywave_props(1)}/>
            <div className={`${styles["polywave-internal"]} opacity-40 delay-[1.5s]`} style={polywave_props(2)}/>
        </div>
    )
}