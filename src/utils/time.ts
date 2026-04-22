export const convertTo24HourTime = (value: string) => {
  const twelveHourMatch = value.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);

  if (!twelveHourMatch) return value;

  const [, hourRaw, minute, periodRaw] = twelveHourMatch;
  const period = periodRaw.toUpperCase();
  let hour = Number(hourRaw);

  if (period === "AM" && hour === 12) {
    hour = 0;
  } else if (period === "PM" && hour < 12) {
    hour += 12;
  }

  return `${String(hour).padStart(2, "0")}:${minute}`;
};
