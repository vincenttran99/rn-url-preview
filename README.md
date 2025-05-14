# RN Url Preview

Fully customizable preview of the URL.

<!-- <img src="https://user-images.githubusercontent.com/14123304/119363213-d727b580-bcad-11eb-8678-6e4c4a54621c.png" width="428" height="926"> -->

## Getting Started

```sh
yarn add rn-url-preview
```

## Usage

```tsx
import UrlPreview from "rn-url-preview";
// ...
<UrlPreview url="https://github.com">
  <UrlPreview.Image />
  <UrlPreview.Title />
  <UrlPreview.Description />
</UrlPreview>;
```

## Props

You can customize everything in UrlPreview, UrlPreview.Image, UrlPreview.Title, and UrlPreview.Description.

| Name                   | Type                                                                                                                                                                                                                                                                                  | Description                                                                                                                                                                                                                          |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| UrlPreview             | View                                                                                                                                                                                                                                                                                  | URL wrapper, only has one special prop `url` which is the string url to display, all other props are [View Props](https://reactnative.dev/docs/view)                                                                                 |
| UrlPreview.Image       | Automatically gets the image of the `url` , the `placeholder` prop accepts an [Image Source](https://reactnative.dev/docs/image#source) to display while fetching data from the url , all other props work like a normal Image with [Image Props](https://reactnative.dev/docs/image) |
| UrlPreview.Title       | Text                                                                                                                                                                                                                                                                                  | Automatically gets the title of the `url` , the `placeholder` prop accepts a string to display while fetching data from the url , all other props work like a normal Text with [Text Props](https://reactnative.dev/docs/text)       |
| UrlPreview.Description | Text                                                                                                                                                                                                                                                                                  | Automatically gets the description of the `url` , the `placeholder` prop accepts a string to display while fetching data from the url , all other props work like a normal Text with [Text Props](https://reactnative.dev/docs/text) |

## License

[MIT](LICENSE)
