export const destructureDate = (date) => {
  return {
    year: date.getFullYear(),
    month: date.toLocaleString("default", { month: "long" }),
    day: date.getDate(),
    weekday: date.toLocaleString("default", { weekday: "long" }),
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
  };
};
