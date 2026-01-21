import Image from "next/image";

import ShareButtons from "@/components/media/ShareButtons";
import BreadcrumbBlogDetail from "./BreadcrumbBlogDetail";

const ArticleDetailContent = () => {
  return (
    <div>
      <div className="flex flex-col gap-y-3 lg:flex-row lg:items-center lg:justify-between">
        <BreadcrumbBlogDetail />
        <ShareButtons
          title="Blog"
          url="https://ui.shadcn.com/docs/components/breadcrumb"
        />
      </div>

      {/* Blog Detail Content */}
      <div className="mt-8">
        <h3>Introduction</h3>
        <p>
          Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam
          suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis
          montes, sit sit. Tellus aliquam enim urna, etiam. Mauris posuere
          vulputate arcu amet, vitae nisi, tellus tincidunt. At feugiat sapien
          varius id.
        </p>
        <br />
        <p>
          Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam
          suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis
          montes, sit sit. Tellus aliquam enim urna, etiam. Mauris posuere
          vulputate arcu amet, vitae nisi, tellus tincidunt. At feugiat sapien
          varius id.
        </p>

        <br />
        <br />

        <Image
          src={"/blog-detail.jpeg"}
          alt="blog detail image"
          width={768}
          height={400}
          className="rounded-3xl"
        />

        <br />
        <br />

        <p>
          Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam
          suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis
          montes, sit sit. Tellus aliquam enim urna, etiam. Mauris posuere
          vulputate arcu amet, vitae nisi, tellus tincidunt. At feugiat sapien
          varius id.
        </p>
        <p>
          Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam
          suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis
          montes, sit sit. Tellus aliquam enim urna, etiam. Mauris posuere
          vulputate arcu amet, vitae nisi, tellus tincidunt. At feugiat sapien
          varius id.
        </p>
      </div>

      <div className="mt-16 flex flex-col items-center justify-center">
        <p className="text-base font-semibold text-[#222222]">
          Bagikan melalui
        </p>
        <ShareButtons
          title="Blog"
          url="https://ui.shadcn.com/docs/components/breadcrumb"
        />
      </div>

      <div className="mt-12 border-t-2 border-[#222222]" />
    </div>
  );
};

export default ArticleDetailContent;
