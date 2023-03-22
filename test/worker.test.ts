import { switchChar } from "../src/worker";

describe("switchChar", () => {
  const charactors = "ABC".split("");
  it("正常系:文字列の先頭にキャラクタリストの項目がない", () => {
    expect(switchChar("NBCDEF", charactors)).toBe("ANBCDEF");
  });

  it("正常系:文字列の先頭にキャラクタリスト先頭の項目がある", () => {
    expect(switchChar("ABCDEF", charactors)).toBe("BBCDEF");
  });

  it("正常系:文字列の先頭にキャラクタリスト最後の項目がある", () => {
    expect(switchChar("CBCDEF", charactors)).toBe("ABCDEF");
  });

  it("準正常:文字列が空", () => {
    expect(switchChar("", charactors)).toBe("A");
  });

});
