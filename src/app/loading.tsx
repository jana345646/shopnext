import ProductSkeleton from "@/components/ProductSkeleton";

export default function Loading() {
  return (
    <div className="pt-3 pb-6 bg-[#E9E9E9] px-[4.5rem]">
      <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-5 items-start justify-center">
        {[...Array(8)].map((_, key) => (
          <ProductSkeleton key={key} />
        ))}
      </div>
    </div>
  );
}
