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
        paragraph: ({ children }) => (
          <p className="mb-5 text-justify text-base leading-[1.8] text-[#444] lg:text-lg">
            {children}
          </p>
        ),
        heading: ({ children, level }) => {
          const styles: Record<number, string> = {
            1: "text-2xl font-bold text-[#222] mt-10 mb-4 lg:text-3xl leading-tight",
            2: "text-xl font-bold text-[#222] mt-8 mb-4 lg:text-2xl leading-tight",
            3: "text-lg font-bold text-[#222] mt-7 mb-3 lg:text-xl leading-snug",
            4: "text-base font-semibold text-[#222] mt-6 mb-3 lg:text-lg leading-snug",
            5: "text-sm font-semibold text-[#222] mt-5 mb-2 lg:text-base",
            6: "text-sm font-semibold text-[#333] mt-4 mb-2",
          };
          switch (level) {
            case 1:
              return <h1 className={styles[1]}>{children}</h1>;
            case 2:
              return <h2 className={styles[2]}>{children}</h2>;
            case 3:
              return <h3 className={styles[3]}>{children}</h3>;
            case 4:
              return <h4 className={styles[4]}>{children}</h4>;
            case 5:
              return <h5 className={styles[5]}>{children}</h5>;
            case 6:
              return <h6 className={styles[6]}>{children}</h6>;
            default:
              return <h2 className={styles[2]}>{children}</h2>;
          }
        },
        image: ({ image }) => (
          <figure className="my-6">
            <Image
              src={image.url}
              width={image.width}
              height={image.height}
              alt={image?.alternativeText ?? "Blog detail image"}
              className="w-full rounded-lg"
            />
          </figure>
        ),
        list: ({ children, format }) => {
          if (format === "unordered") {
            return (
              <ul className="list-disc ml-6 space-y-2 my-5 text-[#444]">
                {children}
              </ul>
            );
          }
          return (
            <ol className="list-decimal ml-6 space-y-2 my-5 text-[#444]">
              {children}
            </ol>
          );
        },
        "list-item": ({ children }) => (
          <li className="text-base leading-[1.8] text-[#444] pl-1 lg:text-lg">
            {children}
          </li>
        ),
        quote: ({ children }) => (
          <blockquote className="my-6 border-l-4 border-green-500 bg-green-50/50 py-4 pl-6 pr-4 italic text-[#555]">
            {children}
          </blockquote>
        ),
        code: ({ children }) => (
          <pre className="my-5 overflow-x-auto rounded-lg bg-gray-100 p-4">
            <code className="text-sm text-gray-800">{children}</code>
          </pre>
        ),
        link: ({ children, url }) => (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 underline decoration-green-400/50 underline-offset-2 transition-colors hover:text-green-700 hover:decoration-green-600"
          >
            {children}
          </a>
        ),
      }}
      modifiers={{
        bold: ({ children }) => (
          <strong className="font-bold text-[#333]">{children}</strong>
        ),
        code: ({ children }) => (
          <code className="rounded bg-gray-100 px-1.5 py-0.5 text-sm font-mono text-[#333]">
            {children}
          </code>
        ),
      }}
    />
  );
};

export default BlocksRendererClient;