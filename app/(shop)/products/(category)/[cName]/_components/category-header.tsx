import { Skeleton } from "@/components/ui/skeleton";
import { CldImage } from "next-cloudinary";

interface CategoryHeaderProps {
  name: string;
  description: string;
  images: string[];
}

export const CategoryHeaderSkeleton = () => {
  return (
    <div className="w-full flex lg:h-[calc(100vh-7.75rem)] mb-6 animate-pulse bg-gray-200 rounded-xl p-6">
      <div className="w-full h-full gap-4 flex flex-col lg:flex-row">
        <div className="lg:flex-[0.4] w-full h-full py-8 flex flex-col justify-center">
          <Skeleton className="w-3/4 h-12 mb-4 rounded" />
          <Skeleton className="w-full h-20 mb-2 rounded" />
          <Skeleton className="w-5/6 h-8 mb-2 rounded" />
          <Skeleton className="w-2/3 h-8 rounded" />
        </div>
        <div className="lg:flex-[0.6] w-full h-full">
          <Skeleton className="w-full h-full rounded-lg" />
        </div>
      </div>
    </div>
  );
};

const CategoryHeader = ({ name, description, images }: CategoryHeaderProps) => {
  return (
    <div className="w-full flex lg:h-[calc(100vh-7.75rem)] mb-6  rounded-xl p-6">
      <div className="w-full h-full gap-4 flex flex-col lg:flex-row">
        <div className="lg:flex-[0.4] w-full h-full py-8 flex flex-col justify-center">
          <h1 className="text-5xl  font-bold uppercase text-left mb-4">
            {name}
          </h1>
          <p className="text-neutral-700 font-light text-lg text-justify">
            {description}
          </p>
        </div>
        <div className="lg:flex-[0.6] w-full h-full">
          <CldImage
            className="w-full h-full rounded-lg object-cover shadow-lg"
            alt={`category_${name}_image`}
            width="1920"
            height="1080"
            src={images[0]}
            quality={50}
            format="webp"
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryHeader;
