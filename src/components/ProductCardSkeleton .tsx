const ProductCardSkeleton = () => {
  return (
    <div className="card bg-base-100 shadow-md w-72 hover:shadow-lg transition animate-pulse">
      <figure className="px-5 pt-5">
        <div className="h-40 w-full bg-gray-300 rounded-xl"></div>
      </figure>
      <div className="card-body text-center">
        <div className="h-5 w-3/4 bg-gray-300 mb-2"></div>
        <div className="h-4 w-1/2 bg-gray-300 mb-2"></div>
        <div className="h-4 w-1/3 bg-gray-300 mb-2"></div>
        <div className="h-6 w-1/2 bg-gray-300 mb-2"></div>
        <div className="h-6 w-1/2 bg-gray-300 mb-2"></div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
