# RN Url Preview

Fully customizable preview of the URL.

## Getting Started

```sh
yarn add rn-url-preview
```

## Usage

<img src="assets/screenshot.png" width="754" height="650">

```tsx
import UrlPreview from "rn-url-preview";
// ...
<UrlPreview
  url="https://github.com/"
  style={{
    backgroundColor: "gainsboro",
    borderRadius: 16,
    padding: 12,
    marginVertical: 12,
    gap: 12,
  }}
>
  <UrlPreview.Image style={{ width: "100%", height: 200, borderRadius: 12 }} />
  <UrlPreview.Title
    style={{ fontWeight: "bold", fontSize: 18, color: "blue" }}
  />
  <UrlPreview.Description />
</UrlPreview>;
```

## Props

You can customize everything in UrlPreview, UrlPreview.Image, UrlPreview.Title and UrlPreview.Description. Top image, bottom title, left image, right title, just title and description, no image. Whatever you want.

| Name                   | Type  | Description                                                                                                                                                                                                                                                                           |
| ---------------------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| UrlPreview             | View  | URL wrapper, only has one special prop `url` which is the string url to display, all other props are [View Props](https://reactnative.dev/docs/view)                                                                                                                                  |
| UrlPreview.Image       | Image | Automatically gets the image of the `url` , the `placeholder` prop accepts an [Image Source](https://reactnative.dev/docs/image#source) to display while fetching data from the url , all other props work like a normal Image with [Image Props](https://reactnative.dev/docs/image) |
| UrlPreview.Title       | Text  | Automatically gets the title of the `url` , the `placeholder` prop accepts a string to display while fetching data from the url , all other props work like a normal Text with [Text Props](https://reactnative.dev/docs/text)                                                        |
| UrlPreview.Description | Text  | Automatically gets the description of the `url` , the `placeholder` prop accepts a string to display while fetching data from the url , all other props work like a normal Text with [Text Props](https://reactnative.dev/docs/text)                                                  |

## License

[MIT](LICENSE)
