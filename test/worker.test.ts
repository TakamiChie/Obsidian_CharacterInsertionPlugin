import { switchChar } from "../src/worker";

describe("switchChar", () => {
  const charactors = "ABC".split("");
  const charactors2 = ["A", "BCE", "EF"];

  it("正常系:文字列の先頭にキャラクタリストの項目がない", () => {
    expect(switchChar("NBCDEF", charactors)).toBe("ANBCDEF");
  });

  it("正常系:文字列の先頭にキャラクタリスト先頭の項目がある", () => {
    expect(switchChar("ABCDEF", charactors)).toBe("BBCDEF");
  });

  it("正常系:文字列の先頭にキャラクタリスト最後の項目がある", () => {
    expect(switchChar("CBCDEF", charactors)).toBe("BCDEF");
  });

  it("正常系:文字列の先頭にキャラクタリスト先頭の項目あり・次の項目と文字数が違う", () => {
    expect(switchChar("A12345", charactors2)).toBe("BCE12345");
  });

  it("正常系:文字列の先頭にキャラクタリストの項目あり・次の項目の文字数が少ない", () => {
    expect(switchChar("BCEDFG", charactors2)).toBe("EFDFG");
  });

  it("準正常:文字列が空", () => {
    expect(switchChar("", charactors)).toBe("A");
  });

  it("準正常:キャラクタリストが空", () => {
    expect(switchChar("", [])).toBe("");
  });

  it("準正常:キャラクタリストが1項目だけかつ、文字列先頭にキャラクタなし", () => {
    expect(switchChar("", ["A"])).toBe("A");
  });

  it("準正常:キャラクタリストが1項目だけかつ、文字列先頭にキャラクタあり", () => {
    expect(switchChar("A", ["A"])).toBe("");
  });

  it("準正常:文字列の先頭にキャラクタリストの項目あり・文字列にキャラクタリストの文字列のみ", () => {
    expect(switchChar("BCE", charactors2)).toBe("EF");
  });

});
