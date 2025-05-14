import { isValidElement, Children, cloneElement } from "react";
import { decode } from "html-entities";
import { PreviewData } from "./types";

/**
 * Regular expression to match email addresses
 */
export const REGEX_EMAIL =
  /([a-zA-Z0-9+._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/g;

/**
 * Regular expression to match image content types
 */
export const REGEX_IMAGE_CONTENT_TYPE = /image\/*/g;

/**
 * Regular expression to extract image source from img tags
 * Considers empty line after img tag and takes only the src field
 * Space before src to avoid matching data-src attributes
 */
export const REGEX_IMAGE_TAG = /<img[\n\r]*.*? src=["'](.*?)["']/g;

/**
 * Regular expression to match URLs (http, https, ftp protocols)
 */
export const REGEX_LINK =
  /((http|ftp|https):\/\/)?([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?/i;

/**
 * Regular expression to extract meta tags
 * Handles both property and name attributes with content
 * Supports both single and double quotes
 */
export const REGEX_META =
  /<meta.*?(property|name)=["'](.*?)["'].*?content=["'](.*?)["'].*?>/g;

/**
 * Regular expression to extract page title
 */
export const REGEX_TITLE = /<title.*?>(.*?)<\/title>/g;

/**
 * Recursively processes and renders special elements based on given filters and properties.
 *
 * @param {React.ReactNode} children - The children elements to be rendered.
 * @param {Object} props - Additional properties to pass to the children elements.
 * @returns {React.ReactNode[]} - The filtered and modified children elements.
 */
export function renderSpecialElementHelper({
  children,
  props = {},
}: {
  children: React.ReactNode;
  props?: { [key: string]: { [key: string]: any } };
}): React.ReactNode[] {
  const renderOnly = Object.keys(props);

  // Recursive function to process each child
  const processChild = (child: React.ReactNode): React.ReactNode => {
    // If child is a valid element with children, recursively process them
    if (
      isValidElement(child) &&
      // @ts-expect-error
      Children.toArray(child.props.children).length > 0
    ) {
      return cloneElement(
        child,
        // @ts-expect-error
        child?.props,
        Children.toArray(
          (child as React.ReactElement<{ children: React.ReactNode }>).props
            .children
        ).map(processChild)
      );
    }

    // If child is a valid React element
    if (isValidElement(child)) {
      // Redundant check - can be removed
      if (!isValidElement(child)) {
        return child;
      }

      // Get the display name of the child element type
      const displayName = (child.type as any).displayName;

      // Check if the element should be included
      if (renderOnly && !renderOnly.includes(displayName)) {
        return null;
      }

      // Apply props to the child element
      return cloneElement(child, props?.[displayName]);
    }

    // Return the original child if it is not a valid React element
    return child;
  };

  // Convert children to an array and process each child
  return Children.toArray(children).map(processChild);
}

/**
 * Resolves relative image URLs to absolute URLs
 *
 * @param {string} baseUrl - The base URL of the page
 * @param {string} imageUrl - The image URL to resolve
 * @returns {string|undefined} - The resolved absolute image URL or undefined
 */
export const getActualImageUrlHelper = (
  baseUrl: string,
  imageUrl?: string
): string | undefined => {
  let actualImageUrl = imageUrl?.trim();
  if (!actualImageUrl || actualImageUrl.startsWith("data")) return;

  // Handle protocol-relative URLs
  if (actualImageUrl.startsWith("//"))
    actualImageUrl = `https:${actualImageUrl}`;

  // Handle relative URLs
  if (!actualImageUrl.startsWith("http")) {
    if (baseUrl.endsWith("/") && actualImageUrl.startsWith("/")) {
      actualImageUrl = `${baseUrl.slice(0, -1)}${actualImageUrl}`;
    } else if (!baseUrl.endsWith("/") && !actualImageUrl.startsWith("/")) {
      actualImageUrl = `${baseUrl}/${actualImageUrl}`;
    } else {
      actualImageUrl = `${baseUrl}${actualImageUrl}`;
    }
  }

  return actualImageUrl;
};

/**
 * Decodes HTML entities in text
 *
 * @param {string} text - The text to decode
 * @returns {string|undefined} - The decoded text or undefined
 */
export const getHtmlEntitiesDecodedTextHelper = (
  text?: string
): string | undefined => {
  const actualText = text?.trim();
  if (!actualText) return;

  return decode(actualText);
};

/**
 * Helper to extract content from meta tags based on property/name type
 *
 * @param {string} left - First string (could be property/name or content)
 * @param {string} right - Second string (could be property/name or content)
 * @param {string} type - The type to look for (e.g., "og:title", "description")
 * @returns {string|undefined} - The extracted content or undefined
 */
export const getContentHelper = (
  left: string,
  right: string,
  type: string
): string | undefined => {
  const contents = {
    [left.trim()]: right,
    [right.trim()]: left,
  };

  return contents[type]?.trim();
};

/**
 * Helper to process image URLs for preview data
 *
 * @param {string} url - The image URL to process
 * @returns {Promise<string|undefined>} - The processed image URL or undefined
 */
/* istanbul ignore next */
export const getPreviewDataImageHelper = async (
  url?: string
): Promise<string | undefined> => {
  if (!url) return;
  return url;
};

/**
 * Extracts preview data (title, description, image) from a URL
 *
 * @param {string} text - The text containing a URL
 * @param {number} requestTimeout - Timeout for the fetch request in milliseconds
 * @returns {Promise<PreviewData>} - The extracted preview data
 */
/* istanbul ignore next */
export const getPreviewDataHelper = async (
  text: string,
  requestTimeout = 5000
): Promise<PreviewData> => {
  // Initialize empty preview data
  const previewData: PreviewData = {
    description: undefined,
    image: undefined,
    link: undefined,
    title: undefined,
  };

  try {
    // Remove email addresses from text
    const textWithoutEmails = text.replace(REGEX_EMAIL, "").trim();

    if (!textWithoutEmails) return previewData;

    // Extract URL from text
    const link = textWithoutEmails.match(REGEX_LINK)?.[0];

    if (!link) return previewData;

    // Ensure URL has protocol
    let url = link;
    if (!url.toLowerCase().startsWith("http")) {
      url = "https://" + url;
    }

    // Set up fetch with timeout
    let abortControllerTimeout: NodeJS.Timeout;
    const abortController = new AbortController();

    const request = fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36",
      },
      signal: abortController.signal,
    });

    abortControllerTimeout = setTimeout(() => {
      abortController.abort();
    }, requestTimeout);

    const response = await request;

    clearTimeout(abortControllerTimeout);

    previewData.link = url;

    // Check if the URL points to an image
    const contentType = response.headers.get("content-type") ?? "";

    if (REGEX_IMAGE_CONTENT_TYPE.test(contentType)) {
      const image = await getPreviewDataImageHelper(url);
      previewData.image = image;
      return previewData;
    }

    // Process HTML content
    const html = await response.text();

    // Some pages return undefined
    if (!html) return previewData;

    // Extract head section
    const head = html.substring(0, html.indexOf("<body"));

    // Get page title
    const title = REGEX_TITLE.exec(head);
    previewData.title = getHtmlEntitiesDecodedTextHelper(title?.[1]);

    // Extract meta tags
    let matches: RegExpMatchArray | null;
    const meta: RegExpMatchArray[] = [];
    while ((matches = REGEX_META.exec(head)) !== null) {
      meta.push(matches);
    }

    // Process meta tags to extract preview data
    const metaPreviewData = meta.reduce<{
      description?: string;
      imageUrl?: string;
      title?: string;
    }>(
      (acc, curr) => {
        // Verify that we have property/name and content
        // Note that if a page will specify property, name and content in the same meta, regex will fail
        if (!curr[2] || !curr[3]) return acc;

        // Extract description, image, and title from meta tags
        const description =
          !acc.description &&
          (getContentHelper(curr[2], curr[3], "og:description") ||
            getContentHelper(curr[2], curr[3], "description"));
        const ogImage =
          !acc.imageUrl && getContentHelper(curr[2], curr[3], "og:image");
        const ogTitle =
          !acc.title && getContentHelper(curr[2], curr[3], "og:title");

        return {
          description: description
            ? getHtmlEntitiesDecodedTextHelper(description)
            : acc.description,
          imageUrl: ogImage
            ? getActualImageUrlHelper(url, ogImage)
            : acc.imageUrl,
          title: ogTitle
            ? getHtmlEntitiesDecodedTextHelper(ogTitle)
            : acc.title,
        };
      },
      { title: previewData.title }
    );

    // Update preview data with meta information
    previewData.description = metaPreviewData.description;
    previewData.image = await getPreviewDataImageHelper(
      metaPreviewData.imageUrl
    );
    previewData.title = metaPreviewData.title;

    // If no image found in meta tags, look for images in the HTML
    if (!previewData.image) {
      let imageMatches: RegExpMatchArray | null;
      const tags: RegExpMatchArray[] = [];
      while ((imageMatches = REGEX_IMAGE_TAG.exec(html)) !== null) {
        tags.push(imageMatches);
      }

      let images: string[] = [];

      // Process up to 5 image tags, skipping data URLs
      for (const tag of tags
        .filter((t) => !t[1].startsWith("data"))
        .slice(0, 5)) {
        const image = getActualImageUrlHelper(url, tag[1]);

        if (!image) continue;

        images = [...images, image];
      }

      previewData.image = images[0];
    }

    return previewData;
  } catch {
    // Return empty preview data on error
    return previewData;
  }
};
