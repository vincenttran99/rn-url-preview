import React, { memo, useEffect, useState } from "react";
import { useMemo } from "react";
import {
  ImageProps,
  ImageSourcePropType,
  Linking,
  Pressable,
  Text,
  TextProps,
} from "react-native";

import { UrlPreviewProps } from "./types";
import { getPreviewDataHelper, renderSpecialElementHelper } from "./utils";

enum EUrlPreview {
  Title = "UrlPreview.Title",
  Description = "UrlPreview.Description",
  Image = "UrlPreview.Image",
}

const UrlPreviewComponent = memo(
  ({
    onPreviewDataFetched,
    previewData,
    requestTimeout = 5000,
    url,
    children,
    ...props
  }: UrlPreviewProps) => {
    const [data, setData] = useState(previewData);

    useEffect(() => {
      let isCancelled = false;
      if (previewData) {
        setData(previewData);
        return;
      }

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
    }, [onPreviewDataFetched, previewData, requestTimeout, url]);

    const handlePress = () =>
      data?.link &&
      Linking.openURL(data.link).catch(() => console.log("ljafn"));

    const ContentPreview = useMemo(
      () =>
        renderSpecialElementHelper({
          children:
            typeof children === "function"
              ? children({ pressed: false })
              : children,
          props: {
            [EUrlPreview.Title]: { children: data?.title || "" },
            [EUrlPreview.Description]: { children: data?.description || "" },
            [EUrlPreview.Image]: { source: data?.image || "" },
          },
        }),
      [data, children],
    );

    return (
      <Pressable onPress={handlePress} {...props}>
        {ContentPreview}
      </Pressable>
    );
  },
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
  <Image source={source || placeholder} {...props} />
);
Image.displayName = EUrlPreview.Image;

const UrlPreview = Object.assign(UrlPreviewComponent, {
  Title: Title,
  Description: Description,
  Image: Image,
});

export default UrlPreview;
