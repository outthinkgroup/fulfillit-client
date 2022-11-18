import { assert, describe, expect, it } from "vitest";
import { datesBetween, dayOccurences } from "./datemanager.js";

describe("generates dates between dates", () => {
  it("generates days", () => {
    const expected = [
      new Date("2022-02-01"),
      new Date("2022-02-02"),
      new Date("2022-02-03"),
    ];
    const inc = 1000 * 60 * 60 * 24;
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
    const inc = 1000 * 60 * 60;
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
    console.log(actual);
    expect(Object.keys(actual)[0]).eq("1/1/2022");
    expect(Object.keys(actual)[1]).eq("1/2/2022");
    expect(Object.values(actual)[1]).eq(2);
  });
});
