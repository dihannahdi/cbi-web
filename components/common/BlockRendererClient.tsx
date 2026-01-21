"use client";

import Image from "next/image";
import {
  BlocksRenderer,
  type BlocksContent,
} from "@strapi/blocks-react-renderer";

const BlocksRendererClient = ({
  content,
}: {
  readonly content: BlocksContent;
}) => {
  if (!content) return null;
  return (
    <BlocksRenderer
      content={content}
      blocks={{
        image: ({ image }) => {
          return (
            <Image
              src={image.url}
              width={image.width}
              height={image.height}
              alt={image?.alternativeText ?? "Blog detail image"}
            />
          );
        },
        list: ({ children, format }) => {
          if (format === "unordered") {
            return (
              <ul className="list-disc list-inside ml-4 space-y-2 my-4 ">
                {children}
              </ul>
            );
          }
          return (
            <ol className="list-decimal list-inside ml-4 space-y-2 my-4 ">
              {children}
            </ol>
          );
        },
        "list-item": ({ children }) => {
          return <li className="text-[#666666]">{children}</li>;
        },        
      }}
    />
  );
};

export default BlocksRendererClient;