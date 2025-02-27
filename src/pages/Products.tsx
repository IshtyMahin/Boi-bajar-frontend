/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useGetBooksQuery } from "../redux/features/books/bookApi";
import { SearchAndFilter } from "../components/SearchAndFilter";
import ProductCardSkeleton from "../components/ProductCardSkeleton ";
import BookCard from "../components/BookCard";

export const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  const limit = 4;

  const { data, isLoading, isError } = useGetBooksQuery({
    search: searchTerm,
    ...filters,
    page,
    limit,
  });

  // console.log(data);
  

  const books = data?.data;
  const meta = data?.meta;

  const handleSearch = (term:any) => {
    setSearchTerm(term);
    setFilters({}); 
    setPage(1);
  };

  const handleFilter = (appliedFilters:any) => {
    setFilters(appliedFilters);
    setSearchTerm(""); 
    setPage(1);
  };

  const handlePageChange = (newPage:any) => {
    setPage(newPage);
  };

  if (isError)
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        ❌ Error fetching books. Please try again later.
      </div>
    );

  return (
    <div className="container mx-auto p-4 sm:pb-20">
      <SearchAndFilter onSearch={handleSearch} onFilter={handleFilter} />

      {isLoading ? (
        <div className="container grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 px-10 gap-6 justify-items-center">
          {Array.from({ length: limit }, (_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      ) : books?.length === 0 ? (
        <div className="flex flex-col justify-center items-center text-gray-500 mt-10 px-6 py-8 bg-gray-800 rounded-lg shadow-md">
          <div className="text-gray-400 mb-4">
            <i className="fas fa-book-open text-6xl"></i>
          </div>
          <p className="mt-4 text-xl font-semibold text-gray-200">
            No Books Available
          </p>
          <p className="text-center text-sm md:text-base text-gray-400 mt-2">
            It seems like we don't have any books available at the moment.
            Please check back later.
          </p>
        </div>
      ) : (
        <>
          <div className="  grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-8 lg:grid-cols-4 xl:grid-cols-5 justify-items-center">
            {books?.map((book:any) => (
              <BookCard key={book._id} book={book} type="small" />
            ))}
          </div>

          <div className="flex justify-center items-center mt-8 space-x-3">
            <button
              className={`btn bg-green-600 hover:bg-green-700 text-white px-6 py-3 transition-colors duration-200 border-0 focus:outline-none ${
                page === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            >
              Previous
            </button>

            <div className="join">
              {Array.from({ length: meta?.totalPage || 1 }, (_, index) => (
                <button
                  key={index + 1}
                  className={`join-item btn bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 transition-colors duration-200 border-0 focus:outline-none ${
                    page === index + 1 ? "bg-green-600 hover:bg-green-700" : ""
                  }`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <button
              className={`btn bg-green-600 hover:bg-green-700 text-white px-6 py-3 transition-colors duration-200 border-0 focus:outline-none ${
                page === meta?.totalPage ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => handlePageChange(page + 1)}
              disabled={page === meta?.totalPage}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};
