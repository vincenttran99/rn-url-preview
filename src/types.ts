import { GestureResponderEvent, PressableProps } from "react-native";

export interface PreviewData {
  description?: string;
  image?: string;
  link?: string;
  title?: string;
}

export interface UrlPreviewProps extends Omit<PressableProps, "onPress"> {
  onPreviewDataFetched?: (previewData: PreviewData) => void;
  requestTimeout?: number;
  url: string;
  onPress?: (
    data: PreviewData | undefined,
    event: GestureResponderEvent,
  ) => void;
}
