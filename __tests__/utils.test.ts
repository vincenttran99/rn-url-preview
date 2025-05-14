import { log } from "console";
import {
  REGEX_EMAIL,
  REGEX_IMAGE_CONTENT_TYPE,
  REGEX_IMAGE_TAG,
  REGEX_LINK,
  REGEX_META,
  REGEX_TITLE,
} from "../src/utils";

describe("REGEX_EMAIL", () => {
  it("matches valid emails", () => {
    expect("test@example.com".match(REGEX_EMAIL)).toEqual(["test@example.com"]);
    expect("abc.def+123@domain.co.uk".match(REGEX_EMAIL)).toEqual([
      "abc.def+123@domain.co.uk",
    ]);
  });

  it("does not match invalid emails", () => {
    expect("not-an-email".match(REGEX_EMAIL)).toBeNull();
    expect("test@.com".match(REGEX_EMAIL)).toBeNull();
  });
});

// REGEX_IMAGE_CONTENT_TYPE
describe("REGEX_IMAGE_CONTENT_TYPE", () => {
  it("matches image content-types", () => {
    expect("image/png".match(REGEX_IMAGE_CONTENT_TYPE)).not.toBeNull();
    expect("image/jpeg".match(REGEX_IMAGE_CONTENT_TYPE)).not.toBeNull();
    expect("image/".match(REGEX_IMAGE_CONTENT_TYPE)).not.toBeNull();
  });

  it("does not match non-image content-types", () => {
    expect("text/html".match(REGEX_IMAGE_CONTENT_TYPE)).toBeNull();
    expect("application/json".match(REGEX_IMAGE_CONTENT_TYPE)).toBeNull();
  });
});

// REGEX_IMAGE_TAG
describe("REGEX_IMAGE_TAG", () => {
  it("matches img tag with src", () => {
    const html = `<img src="https://domain.com/image.png" />`;
    expect(REGEX_IMAGE_TAG.exec(html)?.[1]).toBe(
      "https://domain.com/image.png"
    );
  });

  it("does not match img tag without src", () => {
    const html = `<img alt="no src" />`;
    expect(REGEX_IMAGE_TAG.exec(html)).toBeNull();
  });
});

// REGEX_LINK
describe("REGEX_LINK", () => {
  it("matches valid urls", () => {
    expect("https://google.com".match(REGEX_LINK)?.[0]).toBe(
      "https://google.com"
    );
    expect("ftp://abc.com".match(REGEX_LINK)?.[0]).toBe("ftp://abc.com");
    expect("www.example.com".match(REGEX_LINK)?.[0]).toBe("www.example.com");
  });

  it("does not match invalid urls", () => {
    expect("not a url".match(REGEX_LINK)?.[0]).not.toBe("not a url");
  });
});

// REGEX_META
describe("REGEX_META", () => {
  it("matches meta tag with property", () => {
    const html = `<meta property="og:title" content="Tiêu đề" />`;
    REGEX_META.lastIndex = 0; // Reset state
    const match = REGEX_META.exec(html);
    console.log(match);
    expect(match?.[2]).toBe("og:title");
    expect(match?.[3]).toBe("Tiêu đề");
  });

  it("matches meta tag with name", () => {
    const html = `<meta name="description" content="Mô tả" />`;
    REGEX_META.lastIndex = 0; // Reset state
    const match = REGEX_META.exec(html);
    console.log(match);
    expect(match?.[2]).toBe("description");
    expect(match?.[3]).toBe("Mô tả");
  });

  it("does not match meta tag without content", () => {
    const html = `<meta name="description" />`;
    REGEX_META.lastIndex = 0; // Reset state
    expect(REGEX_META.exec(html)).toBeNull();
  });
});

// REGEX_TITLE
describe("REGEX_TITLE", () => {
  it("matches page title", () => {
    const html = `<title>Trang chủ</title>`;
    expect(REGEX_TITLE.exec(html)?.[1]).toBe("Trang chủ");
  });

  it("does not match if there is no title tag", () => {
    const html = `<div>No title here</div>`;
    expect(REGEX_TITLE.exec(html)).toBeNull();
  });
});
