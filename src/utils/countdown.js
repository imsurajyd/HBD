export function getTimeLeft() {
  const now = new Date();

  // FINAL BIRTHDAY DATE
  const birthday = new Date("2026-09-09T00:00:00");

  const difference = birthday.getTime() - now.getTime();

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      birthdayMode: true,
    };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),

    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),

    minutes: Math.floor((difference / (1000 * 60)) % 60),

    seconds: Math.floor((difference / 1000) % 60),

    birthdayMode: false,
  };
}
