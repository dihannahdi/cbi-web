import { formatDate } from "@/utils/formatDate";
import HeroSectionGeneral from "@/components/common/HeroSectionGeneral";
import { ArticleDetail } from "@/types/responseTypes/article/articleDetailTypes";
import { getImageUrl } from "@/utils/getImageUrl";

const HeroSection = ({ data }: { data: ArticleDetail }) => {
  return (
    <HeroSectionGeneral
      imgUrl={getImageUrl(data?.image?.url)}
      category={data.type}
      title={
        <>
          <h1 className="text-center text-3xl font-bold text-white lg:text-5xl xl:text-[56px]">
            {data.title}
          </h1>
          <div className="flex items-center justify-center gap-x-2 pt-6">
            <p className="text-xs font-bold text-white">
              Oleh <span className="font-normal">{data.author?.username ?? 'author'}</span>
            </p>
            <span>•</span>
            <p className="text-xs font-normal text-white">
              {formatDate(data.publishedAt)}
            </p>
          </div>
        </>
      }
    />
  );
};

export default HeroSection;
