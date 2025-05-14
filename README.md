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

Bạn có thể tuỳ chỉnh mọi thứ trong UrlPreview, UrlPreview.Image, UrlPreview.Title, UrlPreview.Description.

| Name                   | Type  | Description                                                                                                                                                                                                                                                                   |
| ---------------------- | ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| UrlPreview             | View  | Trình bọc URL, chỉ có 1 prop đặc biệt `url` là string url cần hiển thị, còn lại toàn bộ đều là [View Props](https://reactnative.dev/docs/view)                                                                                                                                |
| UrlPreview.Image       | Image | Tự động nhận hình ảnh của `url`, prop `placeholder` nhận vào một [Image Source](https://reactnative.dev/docs/image#source) để hiển thị chờ trong lúc lấy dữ liệu từ `url`, còn lại hoạt động như một Image thông thường với [Image Props](https://reactnative.dev/docs/image) |
| UrlPreview.Title       | Text  | Tự động nhận tiêu đề của `url`, prop `placeholder` nhận vào một string để hiển thị chờ trong lúc lấy dữ liệu từ `url`, còn lại hoạt động như một Text thông thường với [Text Props](https://reactnative.dev/docs/text)                                                        |
| UrlPreview.Description | Text  | Tự động nhận mô tả của `url`,prop `placeholder` nhận vào một string để hiển thị chờ trong lúc lấy dữ liệu từ `url`, còn lại hoạt động như một Text thông thường với [Text Props](https://reactnative.dev/docs/text)                                                           |

## License

[MIT](LICENSE)
