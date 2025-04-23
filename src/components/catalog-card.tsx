import { Link } from "react-router";

export function CatalogCard({
  title,
  category,
}: {
  title: string;
  category: string;
}) {
  return (
    <Link
      to={`/courses/category?topic=${category}`}
      className="relative w-full rounded-3xl px-5 py-2.5 overflow-hidden group bg-[#E9F3FF] hover:bg-gradient-to-r hover:[#E9F3FF] hover:[#0B2239] text-[#0B2239] hover:ring-2 hover:ring-offset-2 hover:ring-[#0B2239] transition-all ease-out duration-300 flex items-center justify-center h-[48px]"
    >
      <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
      <span className="relative font-medium">{title}</span>
    </Link>
  );
}
