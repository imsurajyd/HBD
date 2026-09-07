function Balloons() {
  const balloons = [
    {
      position: "left-[3%] top-[12%]",
      delay: "0s",
      size: "text-5xl sm:text-7xl",
      filter: "brightness(0.9) contrast(1.1) sepia(0.2) drop-shadow(0 10px 15px rgba(0,0,0,0.4))",
    },
    {
      position: "left-[12%] bottom-[18%]",
      delay: "1s",
      size: "text-4xl sm:text-6xl",
      filter: "brightness(1.1) hue-rotate(330deg) drop-shadow(0 8px 12px rgba(0,0,0,0.35))",
    },
    {
      position: "right-[3%] top-[15%]",
      delay: "0.5s",
      size: "text-5xl sm:text-7xl",
      filter: "brightness(0.95) contrast(1.1) drop-shadow(0 10px 15px rgba(0,0,0,0.4))",
    },
    {
      position: "right-[12%] bottom-[20%]",
      delay: "1.5s",
      size: "text-4xl sm:text-6xl",
      filter: "brightness(1.05) hue-rotate(340deg) drop-shadow(0 8px 12px rgba(0,0,0,0.35))",
    },
  ];

  return (
    <>
      {balloons.map((balloon, index) => (
        <div
          key={index}
          className={`absolute ${balloon.position} ${balloon.size} z-10 animate-balloon select-none`}
          style={{
            animationDelay: balloon.delay,
            filter: balloon.filter,
          }}
        >
          🎈
        </div>
      ))}
    </>
  );
}

export default Balloons;