import { PressableProps, StyleProp, TextStyle, ViewStyle } from "react-native";

export interface PreviewData {
  description?: string;
  image?: string;
  link?: string;
  title?: string;
  url: string;
}

export interface UrlPreviewProps extends PressableProps {
  onPreviewDataFetched?: (previewData: PreviewData) => void;
  previewData?: PreviewData;
  requestTimeout?: number;
  url: string;
}
