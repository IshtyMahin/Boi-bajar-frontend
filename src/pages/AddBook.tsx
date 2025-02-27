/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, SubmitHandler } from "react-hook-form";
import { useAddBookMutation } from "../redux/features/books/bookApi";
import { useGetCategoriesQuery } from "../redux/features/category/categoryApi";
import { toast } from "react-toastify";

type TBookInputs = {
  name: string;
  authors: string;
  price: number;
  category: string;
  image: string;
  quantity: number;
};

const AddBook = () => {
  const [addBook, { isLoading }] = useAddBookMutation();
  const { data, isLoading: isCategoriesLoading } = useGetCategoriesQuery();
  const categories = data?.data || [];
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TBookInputs>();

  const onSubmit: SubmitHandler<TBookInputs> = async (data) => {
    try {
      const bookData = {
        ...data,
        price: Number(data.price),
        quantity: Number(data.quantity),
        authors: data.authors.split(","),
      };
      console.log(bookData);

      const response = await addBook(bookData).unwrap();
      console.log(response);

      if (response?.success) {
        toast.success("Book added successfully!", { position: "top-right" });
        reset();
      } else {
        toast.error("Failed to add book. Please try again.", {
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Error adding book:", error);
      toast.error("An error occurred while adding the book.", {
        position: "top-right",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full my-10 max-w-2xl bg-gray-700 p-8 rounded-xl shadow-lg"
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-white">
          Add a New Book
        </h2>

        <div className="mb-6">
          <label className="block text-white text-sm font-semibold mb-2">
            Book Name
          </label>
          <input
            {...register("name", { required: "Book name is required" })}
            type="text"
            placeholder="Enter book name"
            className={`w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 ${
              errors.name ? "border-red-500 focus:ring-red-500" : ""
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-white text-sm font-semibold mb-2">
            Authors (comma-separated)
          </label>
          <input
            {...register("authors", { required: "Authors are required" })}
            type="text"
            placeholder="Enter authors"
            className={`w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 ${
              errors.authors ? "border-red-500 focus:ring-red-500" : ""
            }`}
          />
          {errors.authors && (
            <p className="text-red-500 text-sm mt-1">
              {errors.authors.message}
            </p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-white text-sm font-semibold mb-2">
            Price
          </label>
          <input
            {...register("price", {
              required: "Price is required",
              min: { value: 0, message: "Price must be a positive number" },
            })}
            type="text"
            placeholder="Enter price"
            className={`w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 ${
              errors.price ? "border-red-500 focus:ring-red-500" : ""
            }`}
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-white text-sm font-semibold mb-2">
            Category
          </label>
          <select
            {...register("category", { required: "Category is required" })}
            className={`w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 ${
              errors.category ? "border-red-500 focus:ring-red-500" : ""
            }`}
          >
            <option value="">Select a category</option>
            {isCategoriesLoading ? (
              <option>Loading categories...</option>
            ) : (
              categories.map((category: any) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))
            )}
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">
              {errors.category.message}
            </p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-white text-sm font-semibold mb-2">
            Image URL
          </label>
          <input
            {...register("image", { required: "Image URL is required" })}
            type="text"
            placeholder="Enter image URL"
            className={`w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 ${
              errors.image ? "border-red-500 focus:ring-red-500" : ""
            }`}
          />
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
          )}
        </div>

        <div className="mb-8">
          <label className="block text-white text-sm font-semibold mb-2">
            Quantity
          </label>
          <input
            {...register("quantity", {
              required: "Quantity is required",
              min: { value: 0, message: "Quantity must be a positive number" },
            })}
            type="number"
            placeholder="Enter quantity"
            className={`w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 ${
              errors.quantity ? "border-red-500 focus:ring-red-500" : ""
            }`}
          />
          {errors.quantity && (
            <p className="text-red-500 text-sm mt-1">
              {errors.quantity.message}
            </p>
          )}
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add Book"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBook;
