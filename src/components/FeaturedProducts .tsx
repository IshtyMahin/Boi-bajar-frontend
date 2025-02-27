/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import BookCard from "./BookCard";
import { useGetBooksQuery } from "../redux/features/books/bookApi";
import ProductCardSkeleton from "./ProductCardSkeleton ";


const FeaturedProducts = () => {
  const { data, isLoading, isError, error } = useGetBooksQuery([]);
  const books = data?.data;

  const shuffleArray = (array: any[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const randomProducts = books ? shuffleArray(books).slice(0, 4) : [];

  if (isLoading) {
    return (
      <div className="my-20 container mx-auto px-4">
        <h2 className="text-3xl font-semibold mb-6 text-center">
          Featured Products
        </h2>

        <div className="mx-2 sm:mx-10 grid grid-cols-1 sm:grid-cols-4  gap-3">
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center my-20">
        <p className="text-xl text-red-500">
          Error fetching products:
          {isError && "status" in error
            ? `Status: ${error.status}`
            : "message" in error
            ? error.message
            : "An unknown error occurred"}
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto px-4 text-center bg-gray-400 py-12 rounded-b-xl shadow-md mb-12">
      <h2 className="text-4xl font-bold text-gray-800 mb-8">
        Featured Products
      </h2>

      <div className=" grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-8 lg:grid-cols-4 xl:grid-cols-5 justify-items-center">
        {randomProducts.length === 0 ? (
          <div className="text-center col-span-3">
            <p className="text-xl">No featured products available.</p>
          </div>
        ) : (
          randomProducts.map((book) => (
            <BookCard key={book._id} book={book} type="small" />
          ))
        )}
      </div>

      <div className="text-center mt-6">
        <Link
          to="/products"
          className="btn bg-green-600 hover:bg-green-700 text-white text-xl px-6 py-3 mt-4 transition-colors duration-200 border-0 "
        >
          View All Products
        </Link>
      </div>
    </div>
  );
};

export default FeaturedProducts;
