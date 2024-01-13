import styles from "../styles/Polywave.module.css";

export function PolywaveTop() {
  return (
    <div className={`${styles["polywave-container"]} h-[500px]`}>
      <div
        className={`${styles["polywave-internal"]}
            scale-x-[1] scale-y-[0.45]`}
        style={{
          backgroundImage: `url('/waves/polywave1.svg')`,
          backgroundSize: "100vw auto",
          backgroundRepeat: "repeat-x",
          backgroundPositionX: "25vw",
          backgroundPositionY: "bottom",
        }}
      />
      <div
        className={`${styles["polywave-internal"]} 
            scale-x-[-1] scale-y-[0.5]`}
        style={{
          backgroundImage: `url('/waves/polywave2.svg')`,
          backgroundSize: "95vw auto",
          backgroundRepeat: "repeat-x",
          backgroundPositionX: "50vw",
          backgroundPositionY: "bottom",
        }}
      />
    </div>
  );
}

export function PolywaveBottom() {
  const polywave_props = (i: number) => {
    return {
      backgroundImage: `url('/waves/polywave${i}.svg')`,
      backgroundSize: "100vw auto",
      backgroundRepeat: "repeat-x",
      backgroundPositionY: "bottom",
      animationDuration: `${4.5 + 2 * i}s`,
    };
  };

  return (
    <div className={`${styles["polywave-container"]} h-[300px] scale-y-[-1]`}>
      <div
        className={`${styles["polywave-internal"]} 
            scale-x-[1] scale-y-[0.6]`}
        style={{
          backgroundImage: `url('/waves/polywave2.svg')`,
          backgroundSize: "90vw auto",
          backgroundRepeat: "repeat-x",
          backgroundPositionX: "50vw",
          backgroundPositionY: "bottom",
        }}
      />
    </div>
  );
}
