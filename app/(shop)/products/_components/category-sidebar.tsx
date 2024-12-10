import { FaArrowRight } from "react-icons/fa6";
import Link from "next/link";
import { ExtendedCategory } from "@/types/category";
import { usePathname } from "next/navigation";

interface CategorySidebarProps {
  categories: ExtendedCategory[];
}

const CategorySidebar = ({ categories }: CategorySidebarProps) => {
  const pathName = usePathname();
  return (
    <div className="flex-[.1] flex flex-col justify-start gap-8 py-4">
      <h2 className="text-lg md:text-xl lg:text-2xl text-gray-900 font-bold">
        Products
      </h2>
      <div className="flex flex-col gap-4">
        {categories.map((category) => (
          <Link
            key={`category_${category.id}`}
            href={`${pathName}/${category.slug}`}
            className="flex group cursor-pointer items-center gap-2 p-2 rounded-md hover:bg-gray-200 transition duration-200"
          >
            <span className="text-sm md:text-lg font-medium text-gray-700 ease-linear duration-150 group-hover:text-gray-900">
              {category.name}
            </span>
            <FaArrowRight
              fontSize="1rem"
              className="transition opacity-0 text-gray-700 ease-linear duration-150 font-semibold -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-gray-900"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategorySidebar;
