import React, { memo, useEffect, useState } from "react";
import { useMemo } from "react";
import {
  ImageProps,
  ImageSourcePropType,
  Linking,
  Pressable,
  Text,
  TextProps,
  Image as ImageComponent,
  GestureResponderEvent,
} from "react-native";

import { PreviewData, UrlPreviewProps } from "./types";
import { getPreviewDataHelper, renderSpecialElementHelper } from "./utils";

enum EUrlPreview {
  Title = "UrlPreview.Title",
  Description = "UrlPreview.Description",
  Image = "UrlPreview.Image",
}

const UrlPreviewComponent = memo(
  ({
    onPreviewDataFetched,
    requestTimeout = 15000,
    url,
    children,
    onPress,
    ...props
  }: UrlPreviewProps) => {
    const [data, setData] = useState<PreviewData>();

    useEffect(() => {
      let isCancelled = false;

      const fetchData = async () => {
        setData(undefined);
        const newData = await getPreviewDataHelper(url, requestTimeout);
        // Set data only if component is still mounted
        /* istanbul ignore next */
        if (!isCancelled) {
          // No need to cover LayoutAnimation
          /* istanbul ignore next */
          setData(newData);
          onPreviewDataFetched?.(newData);
        }
      };

      fetchData();
      return () => {
        isCancelled = true;
      };
    }, [onPreviewDataFetched, requestTimeout, url]);

    const handlePress = (event: GestureResponderEvent) => {
      if (typeof onPress === "function") {
        onPress(data, event);
      } else {
        if (data?.link)
          Linking.openURL(data.link).catch(() => console.log("ljafn"));
      }
    };

    const ContentPreview = useMemo(
      () =>
        renderSpecialElementHelper({
          children:
            typeof children === "function"
              ? children({ pressed: false, hovered: false })
              : children,
          props: {
            [EUrlPreview.Title]: { children: data?.title || "" },
            [EUrlPreview.Description]: { children: data?.description || "" },
            [EUrlPreview.Image]: {
              source: data?.image ? { uri: data.image } : "",
            },
          },
        }),
      [data, children]
    );

    return (
      <Pressable {...props} onPress={handlePress}>
        {ContentPreview}
      </Pressable>
    );
  }
);

const Title = ({
  placeholder,
  children,
  ...props
}: TextProps & { placeholder?: string }) => (
  <Text children={children || placeholder || ""} {...props} />
);
Title.displayName = EUrlPreview.Title;

const Description = ({
  placeholder,
  children,
  ...props
}: TextProps & { placeholder?: string }) => (
  <Text children={children || placeholder || ""} {...props} />
);
Description.displayName = EUrlPreview.Description;

const Image = ({
  source,
  placeholder,
  ...props
}: ImageProps & { placeholder?: ImageSourcePropType }) => (
  <ImageComponent source={source || placeholder || undefined} {...props} />
);
Image.displayName = EUrlPreview.Image;

const UrlPreview = Object.assign(UrlPreviewComponent, {
  Title: Title,
  Description: Description,
  Image: Image,
});

export default UrlPreview;
