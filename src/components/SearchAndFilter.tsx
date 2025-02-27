/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useGetCategoriesQuery } from "../redux/features/category/categoryApi";

interface SearchAndFilterProps {
  onSearch: (searchTerm: string) => void;
  onFilter: (filters: any) => void;
}

export const SearchAndFilter = ({
  onSearch,
  onFilter,
}: SearchAndFilterProps) => {
  const { data, isLoading: isCategoriesLoading } = useGetCategoriesQuery();
  const categories = data?.data;
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [availability, setAvailability] = useState(false);

  const handleSearch = () => {
    setPriceRange({ min: "", max: "" });
    setAuthor("");
    setCategory("");
    setAvailability(false);
    onFilter({});
    onSearch(searchTerm);
  };

  const handleFilter = () => {
    setSearchTerm("");
    onSearch("");
    const filters = {
      price: { gte: priceRange.min, lte: priceRange.max },
      author,
      categoryId: category,
      quantity: availability ? { gt: 0 } : undefined,
    };
    onFilter(filters);
  };

  const handleReset = () => {
    setSearchTerm("");
    setPriceRange({ min: "", max: "" });
    setAuthor("");
    setCategory("");
    setAvailability(false);
    onFilter({});
  };

  return (
    <div className="mx-auto p-6 m-4 container bg-gray-800 rounded-lg shadow-md text-white">
      <div className="mb-6 flex justify-center gap-4">
        <input
          type="text"
          placeholder="Search by title, author ..."
          className="input input-bordered w-full sm:w-80 max-w-md bg-gray-600 text-white rounded-md focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="btn bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      <div className="grid grid-cols-1 text-xl sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div>
          <label className="label text-white p-1">
            <span className="label-text">Price Range</span>
          </label>
          <div className="flex gap-4">
            <input
              type="number"
              placeholder="Min"
              className="input input-bordered w-full bg-gray-600 text-white rounded-md focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
              value={priceRange.min}
              onChange={(e) =>
                setPriceRange({ ...priceRange, min: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Max"
              className="input input-bordered w-full bg-gray-600 text-white rounded-md focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
              value={priceRange.max}
              onChange={(e) =>
                setPriceRange({ ...priceRange, max: e.target.value })
              }
            />
          </div>
        </div>

        <div>
          <label className="label text-white">
            <span className="label-text  pb-2">Author</span>
          </label>
          <input
            type="text"
            placeholder="Enter author name..."
            className="input input-bordered w-full bg-gray-600 text-white rounded-md focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>

        <div>
          <label className="label text-white">
            <span className="label-text text-xl pb-2">Category</span>
          </label>
          <select
            className="select select-bordered w-full bg-gray-600 text-white rounded-md focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select a category</option>
            {isCategoriesLoading ? (
              <option>Loading categories...</option>
            ) : (
              categories?.map((category: any) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))
            )}
          </select>
        </div>

        <div>
          <label className="label text-white">
            <span className="label-text p-1">Availability</span>
          </label>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={availability}
              onChange={() => setAvailability(!availability)}
              className="checkbox checkbox-success"
            />
            <span className="text-white text-sm">
              {availability ? "In Stock" : "Out of Stock"}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 flex sm:flex-row gap-4">
        <button
          className="btn bg-green-600 hover:bg-green-700 text-white flex-1 px-4 py-2 rounded-md"
          onClick={handleFilter}
        >
          Apply Filters
        </button>
        <button
          className="btn btn-outline text-white border-white flex-1 px-4 py-2 rounded-md hover:bg-gray-600"
          onClick={handleReset}
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};
