const months = {
  0: "Jan",
  1: "Feb",
  2: "Mar",
  3: "Apr",
  4: "May",
  5: "Jun",
  6: "Jul",
  7: "Aug",
  8: "Sep",
  9: "Oct",
  10: "Nov",
  11: "Dec",
};
const days = {
  1: "st",
  2: "nd",
  3: "rd",
};

export function formatDate(date) {
  const newDate = new Date(parseInt(date));
  const year = newDate.getFullYear();
  const month = newDate.getMonth();
  const day = newDate.getDate();
  const hour = newDate.getHours();
  const minutes = newDate.getMinutes().toString();

  const shortDate = `${months[month]} ${day}${
    day < 4 ? days[day] : "th"
  }, ${year}`;
  const timeDate = `${hour > 12 ? hour - 12 : hour}:${
    minutes.length === 1 ? "0" + minutes : minutes
  } ${hour > 12 ? "PM" : "AM"}`;
  const calendarDate = `${year}-${
    (month + 1).toString().length < 2 ? "0" + (month + 1) : month + 1
  }-${day.toString().length < 2 ? "0" + day : day}`;
  return [shortDate, timeDate, calendarDate];
}

export function generateId() {
  let id = "";
  for (let i = 0; i < 15; i++) {
    id += Math.floor(Math.random() * 10);
  }
  return id;
}
