import bcryprt from "bcryptjs";
import { BookingType } from "./@types/bookings";
import { RoomType } from "./@types/rooms";
import { UserType } from "./@types/users";
import { ContactType } from "./@types/contacts";

type FetchAlllData = BookingType[] | RoomType[] | UserType[] | ContactType[];
type FetchItemlData = BookingType | RoomType | UserType | ContactType;

export async function getAllData(fileName: string) {
  const resp = await fetch(`${process.env.PUBLIC_URL}/mockData/${fileName}`);
  const data: FetchAlllData = await resp.json();
  const delayData = await delayFunction(data);
  return delayData;
}

export async function getItemData(fileName: string, id: string) {
  const allData = await getAllData(fileName);
  const index = allData.findIndex((item: FetchItemlData) => item.id === id);
  return allData[index];
}

export async function delayFunction(
  info: FetchAlllData
): Promise<FetchAlllData> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(info);
    }, 300);
  });
}

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

export function formatDate(date: number | string) {
  let newDate: Date;
  if (typeof date === "string") {
    newDate = new Date(parseInt(date));
  } else {
    newDate = new Date(date);
  }
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

export function hashData(data: string): string {
  const salt = bcryprt.genSaltSync(10);
  return bcryprt.hashSync(data, salt);
}
