/**
 * @param  {Date} startDate
 * @param  { Date } endDate
 * @param  { number } increment - in miliseconds
 * @returns { Date[] }  an array of Dates
 */
export function datesBetween(startDate, endDate, increment) {
  let dates = [startDate];
  let currentDate = startDate.getTime();
  while (currentDate < endDate.getTime()) {
    const newDate = currentDate + inMili[increment];
    dates.push(new Date(newDate));
    currentDate = newDate;
  }
  dates.push(endDate);
  return dates;
}

export const HOUR = 1000 * 60 * 60;
export const DAY = HOUR * 24;
const MONTH = DAY * 30;

export const inMili = {
  hour: HOUR,
  day: DAY,
  month: MONTH,
};

function byDay(date) {
  const dayReset = new Date(date);
  dayReset.setHours(24, 0, 0);
  return dayReset.toLocaleDateString();
}

function byHour(date) {
  const hourReset = new Date(date);
  hourReset.setMinutes(60, 0, 0);
  return hourReset.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
  });
}
function byMonth(date) {
  const monthReset = new Date(date);
  monthReset.setDate(1);
  return monthReset.toLocaleString("en-US", {
    month: "short",
  });
}

function countOccurrenceBy(dates, getGroupId) {
  return dates.reduce((acc, item) => {
    const groupId = getGroupId(item);
    const groupCount = acc[groupId] ?? 0;
    return { ...acc, [groupId]: groupCount + 1 };
  }, {});
}

export function dayOccurences(dates) {
  const res = countOccurrenceBy(dates, byDay);
  return res;
}

export function hourOccurences(dates) {
  const res = countOccurrenceBy(dates, byHour);
  return res;
}
export function monthOccurences(dates) {
  const res = countOccurrenceBy(dates, byMonth);
  return res;
}

export const byOccurrences = {
  day: dayOccurences,
  month: monthOccurences,
  hour: hourOccurences,
};

export const sortDates = (a, b) => a.getTime() - b.getTime();

export function genDateKey(date, view) {
  if (view == "day") {
    return date.toLocaleDateString();
  }
  if (view == "month") {
    return date.toLocaleString("en-US", { month: "short" });
  }
  if (view == "hour") {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
    });
  }
}
