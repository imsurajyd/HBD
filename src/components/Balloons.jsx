function Balloons() {
  const balloons = [
    {
      position: "left-[3%] top-[12%]",
      delay: "0s",
      size: "text-5xl sm:text-7xl",
    },
    {
      position: "left-[12%] bottom-[18%]",
      delay: "1s",
      size: "text-4xl sm:text-6xl",
    },
    {
      position: "right-[3%] top-[15%]",
      delay: "0.5s",
      size: "text-5xl sm:text-7xl",
    },
    {
      position: "right-[12%] bottom-[20%]",
      delay: "1.5s",
      size: "text-4xl sm:text-6xl",
    },
  ];

  return (
    <>
      {balloons.map((balloon, index) => (
        <div
          key={index}
          className={`absolute ${balloon.position} ${balloon.size} z-10 animate-balloon`}
          style={{
            animationDelay: balloon.delay,
          }}
        >
          🎈
        </div>
      ))}
    </>
  );
}

export default Balloons;
