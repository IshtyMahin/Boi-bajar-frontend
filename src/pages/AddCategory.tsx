import { useForm, SubmitHandler } from "react-hook-form";
import { useAddCategoryMutation } from "../redux/features/category/categoryApi";

type TCategoryInputs = {
  name: string;
};

const AddCategory = () => {
  const [addCategory, { isLoading }] = useAddCategoryMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TCategoryInputs>();

  const onSubmit: SubmitHandler<TCategoryInputs> = async (data) => {
    await addCategory(data);
    reset();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-gray-700 p-8 rounded-xl shadow-lg"
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-white">
          Add a New Category
        </h2>

        <div className="mb-6">
          <label className="block text-white text-sm font-semibold mb-2">
            Category Name
          </label>
          <input
            {...register("name", { required: "Category name is required" })}
            type="text"
            placeholder="Enter category name"
            className={`w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 ${
              errors.name ? "border-red-500 focus:ring-red-500" : ""
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add Category"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;
