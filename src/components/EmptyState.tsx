function EmptyState() {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-20">
      <img src="/empty-box.png" alt="No products" className="w-40 h-40 mb-4" />

      <h2 className="text-xl font-bold text-gray-700">No products found</h2>

      <p className="text-gray-500">Try another category</p>
    </div>
  );
}
export default EmptyState;
