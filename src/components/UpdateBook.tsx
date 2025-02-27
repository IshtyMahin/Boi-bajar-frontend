/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, SubmitHandler } from "react-hook-form";
import {
  useGetBookByIdQuery,
  useUpdateBookMutation,
} from "../redux/features/books/bookApi";
import { useGetCategoriesQuery } from "../redux/features/category/categoryApi";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { X } from "lucide-react";
type TBookInputs = {
  name: string;
  authors: string;
  price: string;
  category: string;
  image: string;
  quantity: number;
};

const UpdateBook = ({ id, onClose }: { id: string; onClose: () => void }) => {
  const { data: bookData } = useGetBookByIdQuery(id);
  const book = bookData?.data;
  const [updateBook, { isLoading }] = useUpdateBookMutation();

  const { data: categoryData } = useGetCategoriesQuery();
  const categories = categoryData?.data || [];

  
  const {
    register,
    handleSubmit,
   
    reset,
  } = useForm<TBookInputs>();
 

  useEffect(() => {
    if (book) {
      reset({
        name: book.name,
        authors: book?.authors?.join(","),
        price:book.price,
        category: book.category._id,
        image: book.image,
        quantity: book.quantity,
      });
    }
  }, [book, reset]);

  const onSubmit: SubmitHandler<TBookInputs> = async (data) => {
    try {
      const updatedBook = {
        ...data,
        id: book._id,
        price: Number(data.price),
        quantity: Number(data.quantity),
        authors: data.authors.split(","),
      };
      console.log(updatedBook);
      
      const response = await updateBook(updatedBook).unwrap();

      if (response?.success) {
        toast.success("Book updated successfully!", { position: "top-right" });
        onClose(); // Close modal only if successful
      } else {
        toast.error("Failed to update book. Please try again.", {
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Error updating book:", error);
      toast.error("An error occurred while updating the book.", {
        position: "top-right",
      });
    }
  };

  return (
    <div className=" flex justify-center items-center bg-gray-400 p-4">
      <div className="w-full my-10 max-w-2xl bg-gray-800 p-8 rounded-xl shadow-lg">
        <button
          onClick={onClose}
          className="p-2 rounded-full bg-red-700  text-lg font-bold transition-all duration-200 hover:text-red-700 hover:bg-gray-200 hover:scale-110"
        >
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-3xl font-bold mb-8 text-center text-white">
          Update Book
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <label className="block text-white text-sm font-semibold mb-2">
              Book Name
            </label>
            <input
              {...register("name", { required: "Book name is required" })}
              type="text"
              className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white rounded-lg"
            />
          </div>

          <div className="mb-6">
            <label className="block text-white text-sm font-semibold mb-2">
              Authors (comma-separated)
            </label>
            <input
              {...register("authors", { required: "Authors are required" })}
              type="text"
              className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white rounded-lg"
            />
          </div>

          <div className="mb-6">
            <label className="block text-white text-sm font-semibold mb-2">
              Price
            </label>
            <input
              {...register("price", { required: "Price is required" })}
              type="text"
              className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white rounded-lg"
            />
          </div>

          <div className="mb-6">
            <label className="block text-white text-sm font-semibold mb-2">
              Category
            </label>
            <select
              {...register("category", { required: "Category is required" })}
              className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white rounded-lg"
            >
              {categories.map((category:any) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-white text-sm font-semibold mb-2">
              Image URL
            </label>
            <input
              {...register("image", { required: "Image URL is required" })}
              type="text"
              className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white rounded-lg"
            />
          </div>

          <div className="mb-8">
            <label className="block text-white text-sm font-semibold mb-2">
              Quantity
            </label>
            <input
              {...register("quantity", { required: "Quantity is required" })}
              type="number"
              className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white rounded-lg"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update Book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBook;
