import TimeBox from "./TimeBox";

const teddyBirthday =
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExdnU5YjY1cGo2ZDJ2YjhqMnQ2MnF4Y3RwdXZzaHFzenRybzVlYWh6ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Ie4CIIvQS0bk3zwZlM/giphy.gif";

function CountdownScreen({ timeLeft }) {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#fff7fa] px-5 py-10 text-[#5b343f]">
      <div className="absolute left-[7%] top-[15%] animate-bounce text-4xl text-pink-300">
        ♡
      </div>

      <div className="absolute right-[10%] top-[18%] animate-pulse text-3xl text-pink-300">
        ✦
      </div>

      <div className="absolute bottom-[15%] left-[10%] animate-pulse text-4xl">
        🌸
      </div>

      <div className="absolute right-[7%] top-[10%] animate-bounce text-4xl">
        🌷
      </div>

      <div className="relative z-10 w-full max-w-4xl text-center">
        <p className="mb-6 text-[10px] font-medium uppercase tracking-[0.3em] text-[#a76576] sm:text-xs">
          A little surprise for someone special
        </p>

        <h1 className="font-display text-7xl font-semibold leading-[0.8] sm:text-8xl md:text-[120px]">
          Something
          <br />
          <span className="italic text-[#df6f8d]">Beautiful</span>
          <br />
          Is Coming... 🎀
        </h1>

        <p className="mx-auto mt-8 max-w-md text-sm leading-7 text-[#8d6972] sm:text-base">
          A tiny corner of the internet, made with lots of love. ❤️
        </p>

        <div className="mx-auto mt-10 grid max-w-xl grid-cols-4 gap-2 sm:gap-4">
          <TimeBox value={timeLeft.days} label="Days" />
          <TimeBox value={timeLeft.hours} label="Hours" />
          <TimeBox value={timeLeft.minutes} label="Minutes" />
          <TimeBox value={timeLeft.seconds} label="Seconds" />
        </div>

        <div className="mt-8 flex justify-center">
          <img
            src={teddyBirthday}
            alt="Cute teddy"
            className="h-28 w-28 object-contain drop-shadow-xl sm:h-36 sm:w-36"
          />
        </div>
      </div>
    </section>
  );
}

export default CountdownScreen;
