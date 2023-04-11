const utils = require("../utils");

describe("isStrBetween", () => {
  const isStrBetween = utils.isStrBetween;

  test("returns correct response", () => {
    expect(isStrBetween("", 1, 3)).toBe(false);
    expect(isStrBetween("test", 1, 3)).toBe(false);
    expect(isStrBetween("test", 1, 10)).toBe(true);
    expect(isStrBetween("test", 4, 10)).toBe(true);
    expect(isStrBetween("test", 1, 4)).toBe(true);
  });

  test("throws error on invalid input", () => {
    const expectedErrMsg = "Invalid values for \"min\" or \"max\".";
    expect(() => isStrBetween("", "a", 3)).toThrow(expectedErrMsg);
    expect(() => isStrBetween("", 3, "b")).toThrow(expectedErrMsg);
    expect(() => isStrBetween("", -1, 3)).toThrow(expectedErrMsg);
    expect(() => isStrBetween("", 5, 3)).toThrow(expectedErrMsg);
  });
});

describe("isLiteralObject", () => {
  const isLiteralObject = utils.isLiteralObject;

  test("returns correct response on valid inputs", () => {
    expect(isLiteralObject({})).toBe(true);
    expect(isLiteralObject({question: ""})).toBe(true);
    expect(isLiteralObject({question: "", answer: ""})).toBe(true);
  });

  test("returns correct response on invalid inputs", () => {
    expect(isLiteralObject(undefined)).toBe(false);
    expect(isLiteralObject(null)).toBe(false);
    expect(isLiteralObject(1)).toBe(false);
    expect(isLiteralObject("str")).toBe(false);
    expect(isLiteralObject(false)).toBe(false);
    expect(isLiteralObject(new Date)).toBe(false);
    expect(isLiteralObject([])).toBe(false);
    expect(isLiteralObject(() => {})).toBe(false);
    expect(isLiteralObject(Object.create(null))).toBe(false);
  });
});

describe("arrayOfObjContainKeys", () => {
  const arrayOfObjContainKeys = utils.arrayOfObjContainKeys;

  test("returns correct response", () => {
    const cases = [
      [[{a: ""}], false],
      [[{a: "", b: ""}], false],
      [[{a: "", b: "", c: ""}], false],
      [[{a: "1", b: "2", c: "3"}], true],
      [[{a: "1", b: "2", c: "3", d: ""}], true],
    ];
    for (const val of cases) {
      expect(arrayOfObjContainKeys(val[0], ["a", "b", "c"])).toBe(val[1]);
    }
  });

  test("throws error on invalid input", () => {
    const cases = ["", {}, [""], [1], [[]], [{}, []]];
    for (const arr of cases) {
      expect(() => arrayOfObjContainKeys(arr, [])).toThrow(
          "\"arr\" parameter must be an array of objects.",
      );
    }
    expect(() => arrayOfObjContainKeys([], [1, 2, {}])).toThrow(
        "\"keys\" parameter must be an array of strings.",
    );
  });
});
