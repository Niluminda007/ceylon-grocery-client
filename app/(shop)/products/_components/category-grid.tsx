import Link from "next/link";
import { CldImage } from "next-cloudinary";
import { ExtendedCategory } from "@/types/category";
import { usePathname } from "next/navigation";

interface CategoryGridProps {
  categories: ExtendedCategory[];
}

const CategoryGrid = ({ categories }: CategoryGridProps) => {
  const pathName = usePathname();
  return (
    <div className="w-full ml-2 lg:ml-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((category) => (
        <Link
          key={`grid_category_${category.id}`}
          className="group flex flex-col gap-4"
          href={`${pathName}/${category.slug}`}
        >
          <div className="overflow-hidden xs:h-[150px] md:h-[200px] lg:h-[230px] rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-105">
            <CldImage
              className="w-full h-full object-cover"
              width="480"
              height="600"
              format="webp"
              quality="50"
              loading="lazy"
              sizes="(max-width: 480px) 100vw, 50vw"
              src={category.images[0]}
              alt={category.name}
            />
          </div>
          <span className="text-lg font-semibold text-gray-800 opacity-60 transition ease-linear duration-150 group-hover:opacity-100">
            {category.name}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default CategoryGrid;
