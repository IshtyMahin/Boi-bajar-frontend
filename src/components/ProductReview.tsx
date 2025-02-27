/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Star } from "lucide-react";
import {
  useCreateReviewMutation,
  useGetReviewsByBookQuery,
} from "../redux/features/review/reviewApi";
import { useAppSelector } from "../redux/hooks";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCurrentUser } from "../redux/features/auth/authSlice";

interface ProductReviewsProps {
  bookId: string;
  reviews?: Review[];
}

interface Review {
  user: {
    name: string;
  };
  star: number;
  message: string;
}

const ProductReviews = ({ bookId }: ProductReviewsProps) => {
  const user = useAppSelector(useCurrentUser);

  const { data = [], refetch } = useGetReviewsByBookQuery(bookId);
  const reviews = data.data;

  const [createReview] = useCreateReviewMutation();

  const [newReview, setNewReview] = useState({
    star: 5,
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("You must be logged in to submit a review.");
      return;
    }

    if (!newReview.message) {
      toast.error("Please write a review message.");
      return;
    }

    try {
      await createReview({
        book: bookId,
        ...newReview,
      }).unwrap();
      toast.success("Review submitted successfully!");
      setNewReview({ star: 5, message: "" });
      refetch();
    } catch (error) {
      toast.error("Failed to submit review. Please try again.");
      console.error("Failed to submit review:", error);
    }
  };

  return (
    <div className="w-full p-6 rounded-lg shadow bg-gray-800">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 p-4 md:border-r border-gray-600">
          <h3 className="text-xl font-semibold mb-4 text-gray-100">
            Customer Reviews
          </h3>
          <div className="max-h-64 border-1 border-gray-600 rounded-xl p-3 space-y-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300 pr-2">
            {reviews?.length > 0 ? (
              reviews.map((review:any, index:number) => (
                <div
                  key={index}
                  className="border-gray-600 p-4 rounded-lg shadow-sm bg-gray-700"
                >
                  <h3 className="font-semibold text-gray-100">
                    {review?.user?.name}
                  </h3>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        className={`mr-1 ${
                          i < review.star ? "text-yellow-400" : "text-gray-300"
                        }`}
                        fill={i < review.star ? "yellow" : "none"}
                      />
                    ))}
                  </div>
                  <p className="text-gray-300 mt-1">{review?.message}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-400">
                No reviews yet. Be the first to review!
              </p>
            )}
          </div>
        </div>

        <div className="w-full md:w-1/2 p-4 border-t md:border-t-0 md:border-l border-gray-600">
          <h3 className="text-xl font-semibold mb-4 text-gray-100">
            Write a Review
          </h3>
          {user ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <textarea
                placeholder="Your Comment"
                value={newReview.message}
                onChange={(e) =>
                  setNewReview({ ...newReview, message: e.target.value })
                }
                className="textarea textarea-bordered w-full bg-gray-700 text-gray-100 placeholder-gray-400"
                required
              />
              <div className="flex items-center">
                <span className="mr-2 text-gray-100">Rating:</span>
                <div className="rating">
                  {[...Array(5)].map((_, i) => (
                    <input
                      key={i}
                      type="radio"
                      name="rating"
                      className="mask mask-star-2 bg-yellow-400"
                      checked={newReview.star === i + 1}
                      onChange={() =>
                        setNewReview({ ...newReview, star: i + 1 })
                      }
                    />
                  ))}
                </div>
              </div>
              <button
                type="submit"
                className="btn border-0 w-full bg-green-600 hover:bg-green-700 text-white"
              >
                Submit Review
              </button>
            </form>
          ) : (
            <p className="text-gray-400">
              Please{" "}
              <a href="/login" className="text-blue-500 hover:underline">
                log in
              </a>{" "}
              to submit a review.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductReviews;
