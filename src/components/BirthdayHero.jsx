import Confetti from "./Confetti";
import Balloons from "./Balloons";

const teddyBirthday =
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExdnU5YjY1cGo2ZDJ2YjhqMnQ2MnF4Y3RwdXZzaHFzenRybzVlYWh6ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Ie4CIIvQS0bk3zwZlM/giphy.gif";

function BirthdayHero({ onTeddyClick }) {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-b from-[#fff7fa] via-[#fff1f5] to-[#ffeaf0] px-5 py-16">
      
      {/* Confetti */}
      <Confetti />

      {/* Balloons */}
      <Balloons />

      {/* Floating Hearts */}
      <div className="absolute left-[7%] top-[25%] z-10 animate-float text-4xl">
        💗
      </div>

      <div className="absolute right-[8%] top-[35%] z-10 animate-float-slow text-4xl">
        💕
      </div>

      <div className="absolute bottom-[15%] left-[18%] z-10 animate-float-slow text-3xl">
        💖
      </div>

      <div className="absolute bottom-[18%] right-[20%] z-10 animate-float text-2xl">
        💞
      </div>

      {/* Main Birthday Content */}
      <div className="relative z-20 w-full max-w-4xl text-center">

        {/* Cake */}
        <div className="mb-5 animate-birthday-bounce text-6xl sm:text-8xl">
          🎂
        </div>

        {/* Small Heading */}
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.35em] text-[#a76576] sm:text-sm">
          Today is your special day
        </p>

        {/* Birthday Heading */}
        <h1 className="font-display text-6xl font-semibold leading-[0.9] sm:text-8xl md:text-[110px]">
          Happy
          <br />

          <span className="italic text-[#df6f8d]">
            18th Birthday
          </span>

          <br />

          <span className="text-5xl sm:text-7xl">
            ❤️
          </span>
        </h1>

        {/* Birthday Message */}
        <p className="mx-auto mt-7 max-w-lg text-sm leading-7 text-[#8d6972] sm:text-base">
          Today isn't just another day...
          <br />
          It's the day someone incredibly special came into this world. 🌸
        </p>

        {/* =================================================
            TEDDY — CLICK TO OPEN MESSAGE
        ================================================= */}

        <div className="mt-8 flex justify-center">

          <button
            type="button"
            onClick={onTeddyClick}
            aria-label="Open your surprise"
            className="group relative cursor-pointer rounded-full outline-none"
          >

            {/* Glow */}
            <div className="absolute inset-4 rounded-full bg-pink-300/30 blur-2xl transition-all duration-500 group-hover:bg-pink-400/50 group-hover:blur-3xl" />

            {/* Teddy */}
            <img
              src={teddyBirthday}
              alt="Cute birthday teddy"
              className="relative h-36 w-36 object-contain drop-shadow-2xl transition-all duration-500 group-hover:scale-110 group-active:scale-95 sm:h-48 sm:w-48"
            />

            {/* Floating Heart */}
            <span className="absolute -right-1 top-2 text-2xl opacity-0 transition-all duration-300 group-hover:-translate-y-2 group-hover:opacity-100">
              💗
            </span>

          </button>

        </div>

        {/* Teddy Hint */}
        <div className="mt-4 animate-pulse">

          <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#a76576]">
            Tap the teddy
          </p>

          <p className="mt-1 font-display text-lg italic text-[#df6f8d]">
            I have something for you... 💌
          </p>

        </div>

        {/* Celebration */}
        <div className="mt-7 text-3xl tracking-widest">
          🎈 ✨ 🎉 ✨ 🎈
        </div>

      </div>

      {/* Decorations */}

      <div className="absolute bottom-8 left-8 z-10 text-5xl opacity-70 sm:text-6xl">
        🌸
      </div>

      <div className="absolute right-8 top-8 z-10 text-5xl opacity-70 sm:text-6xl">
        🌷
      </div>

      <div className="absolute bottom-10 right-16 z-10 text-3xl">
        ✨
      </div>

      <div className="absolute left-16 top-16 z-10 text-3xl">
        ✦
      </div>

    </section>
  );
}

export default BirthdayHero;