import { assert, beforeEach, describe, expect, it, vi } from "vitest";
import { datesBetween, dayOccurences, getDateBeforeToday } from "./datemanager.js";

describe("generates dates between dates", () => {
  it("generates days", () => {
    const expected = [
      new Date("2022-02-01"),
      new Date("2022-02-02"),
      new Date("2022-02-03"),
    ];
    const inc = 'day'
    const actual = datesBetween(
      new Date("2022-02-01"),
      new Date("2022-02-03"),
      inc
    );
    expect(actual[1].getTime()).eq(expected[1].getTime());
  });
  it("generates hours", () => {
    const start = new Date("2022-02-01");
    const nextHour = new Date(start.getTime() + 1000 * 60 * 60);
    const last = new Date(nextHour.getTime() + 1000 * 60 * 60);
    const expected = [start, nextHour, last];
    const inc = 'hour'
    const actual = datesBetween(start, last, inc);
    expect(actual[1].getTime()).eq(expected[1].getTime());
  });
});

describe("counts date occurences", () => {
  it("groups by day", () => {
    const input = [
      new Date("2022-01-01"),
      new Date("2022-01-02"),
      new Date("2022-01-02"),
    ];
    const actual = dayOccurences(input);
    expect(Object.keys(actual)[0]).eq("1/1/2022");
    expect(Object.keys(actual)[1]).eq("1/2/2022");
    expect(Object.values(actual)[1]).eq(2);
  });
});

describe("gets correct date before today",()=>{
  // need to mock `new Date()`
  beforeEach(()=>{vi.useFakeTimers()})
  afterEach(()=>{vi.useRealTimers()})
  it("gets 1 month before",()=>{
    vi.setSystemTime('2/19/2023') //date as of writing this test 😜
    const expected = 0
    const actual = getDateBeforeToday('month').getMonth()
    expect(actual).toEqual(expected)
  })
  it("gets 1 day before",()=>{
    vi.setSystemTime('2/19/2023') //date as of writing this test 😜
    const expected = 18
    const actual = getDateBeforeToday('day').getDate()
    expect(actual).toEqual(expected)
  })
  it("gets 1 year before",()=>{
    vi.setSystemTime('2/19/2023') //date as of writing this test 💩
    const expected = 2022
    const actual = getDateBeforeToday('year').getFullYear()
    expect(actual).toEqual(expected)
  })
})
