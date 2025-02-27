import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppSelector } from "../redux/hooks";
import { toast } from "react-toastify";
import { useCurrentUser } from "../redux/features/auth/authSlice";
import { useCreateOrderMutation } from "../redux/features/order/orderApi";
import {
  useDeleteBookMutation,
  useGetBookByIdQuery,
} from "../redux/features/books/bookApi";
import ProductReviews from "../components/ProductReview";
import UpdateBook from "../components/UpdateBook";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

const ProductDetail = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const { data, isLoading, isError } = useGetBookByIdQuery(bookId!);
  const book = data?.data;
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const user = useAppSelector(useCurrentUser) as { role: string } | null;
  const isAdmin = user?.role === "admin";
  const isAvailable = book?.quantity > 0;

  const [deleteBookMutation, { isLoading: deleteLoading }] =
    useDeleteBookMutation();
  const [createOrder, { isLoading: isCreatingOrder }] =
    useCreateOrderMutation(); 
  const navigate = useNavigate();

  useEffect(() => {
    const img = new Image();
    img.src = book?.image;
    img.onload = () => {
      setIsImageLoading(false);
      setImageError(false);
    };
    img.onerror = () => {
      setIsImageLoading(false);
      setImageError(true);
    };
  }, [book?.image]);

  const handleDelete = async () => {
    try {
      await deleteBookMutation(book._id).unwrap();
      toast.success("Book deleted successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });

      setShowDeleteModal(false);
      navigate(-1);
    } catch (error) {
      console.log(error);

      toast.error("Failed to delete book!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    }
  };

  const handleBuyNow = async () => {
    if (!user) {
      toast.error("Please login to place an order", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
      return;
    }

    if (quantity > book.quantity) {
      toast.error("Requested quantity exceeds available stock", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
      return;
    }

    try {
      const orderPayload = {
        product: bookId,
        quantity,
      };
      console.log(orderPayload);
      
      const response = await createOrder(orderPayload).unwrap(); 
      console.log(response);
      
      window.location.href = response.data;
    } catch (error) {
      console.log(error);
      
      toast.error("Failed to create order", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  if (isError) return <div>Error fetching book details</div>;

  if (!book && !isLoading) return <div>Book not found</div>;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-10">
      <div className="w-full max-w-6xl mx-auto">
        {isLoading ? (
          <div className="my-10 card shadow-lg animate-pulse bg-gray-200 rounded-lg p-4">
            <div className="flex flex-col sm:flex-row items-center">
              <div className="w-full sm:w-2/5 p-5">
                <div className="h-96 sm:h-80 bg-gray-300 rounded-xl"></div>
              </div>
              <div className="w-full sm:w-3/5 p-5">
                <div className="h-8 bg-gray-300 rounded mb-4"></div>
                <div className="h-6 bg-gray-300 rounded mb-2"></div>
                <div className="h-6 bg-gray-300 rounded mb-2"></div>
                <div className="h-6 bg-gray-300 rounded mb-2"></div>
                <div className="h-6 bg-gray-300 rounded mb-4"></div>
                <div className="h-10 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="card bg-gray-800 shadow-lg w-full">
            <div className="flex flex-col sm:flex-row items-center">
              <figure className="p-5 w-full sm:w-2/5">
                {isImageLoading ? (
                  <div className="w-full h-96 sm:h-80 flex items-center justify-center bg-gray-700 rounded-xl">
                    <span className="text-gray-400">Loading...</span>
                  </div>
                ) : imageError ? (
                  <div className="w-full h-96 sm:h-80 flex items-center justify-center bg-gray-700 rounded-xl">
                    <span className="text-gray-400">Image not available</span>
                  </div>
                ) : (
                  <img
                    src={book.image}
                    alt={book.name}
                    className="rounded-xl w-full h-96 sm:h-80 object-cover"
                  />
                )}
              </figure>
              <div className="card-body w-full sm:w-3/5 p-5">
                <h2 className="card-title text-2xl font-semibold text-gray-100">
                  {book.name}
                </h2>
                <p className="text-gray-300 text-lg">
                  {book.authors.join(", ")}
                </p>
                <p className="text-gray-400">Category: {book.category.name}</p>
                <p className="text-xl font-bold text-green-500">
                  ${book.price}
                </p>
                <p
                  className={`text-lg ${
                    isAvailable ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {isAvailable
                    ? `Available (${book.quantity} in stock)`
                    : "Out of Stock"}
                </p>
                <div className="card-actions mt-4 flex gap-3">
                  <button
                    className={`btn border-0 ${
                      isAvailable
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-gray-600 cursor-not-allowed"
                    } text-white`}
                    onClick={() => setShowBuyModal(true)}
                    disabled={!isAvailable}
                  >
                    {isAvailable ? "Buy Now" : "Unavailable"}
                  </button>
                  {isAdmin && (
                    <>
                      <button
                        className="btn bg-yellow-500 hover:bg-yellow-600 text-white"
                        onClick={() => setShowEditModal(true)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn bg-red-600 hover:bg-red-700 text-white"
                        onClick={() => setShowDeleteModal(true)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
            {showBuyModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
                  <h2 className="text-xl font-semibold mb-4">Enter Quantity</h2>
                  <input
                    type="number"
                    min="1"
                    max={book.quantity}
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full p-2 mb-4 bg-gray-700 rounded text-white"
                  />
                  <div className="flex justify-end gap-3">
                    <button
                      className="btn bg-gray-600 hover:bg-gray-700 text-white"
                      onClick={() => setShowBuyModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn bg-green-600 hover:bg-green-700 text-white"
                      onClick={handleBuyNow}
                      disabled={isCreatingOrder}
                    >
                      {isCreatingOrder ? "Processing..." : "Confirm"}
                    </button>
                  </div>
                </div>
              </div>
            )}
            {showEditModal && (
              <UpdateBook
                id={book._id}
                onClose={() => setShowEditModal(false)}
              />
            )}
            {showDeleteModal && (
              <ConfirmDeleteModal
                onConfirm={handleDelete}
                onCancel={() => setShowDeleteModal(false)}
                isLoading={deleteLoading}
              />
            )}
          </div>
        )}
      </div>

      <div className="w-full max-w-6xl mx-auto mt-10">
        {bookId && <ProductReviews bookId={bookId} />}
      </div>
    </div>
  );
};

export default ProductDetail;
