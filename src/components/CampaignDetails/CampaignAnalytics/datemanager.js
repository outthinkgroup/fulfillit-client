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
    const newDate = currentDate + increment;
    dates.push(new Date(newDate));
    currentDate = newDate;
  }
  dates.push(endDate);
  return dates;
}
