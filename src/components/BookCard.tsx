import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

interface Book {
  image: string;
  name: string;
  authors: string[];
  category: { name: string };
  price: number;
  _id: string;
}

interface BookCardProps {
  book: Book;
  type: "small" | "large";
}

const BookCard = ({ book, type }: BookCardProps) => {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = book.image;
    img.onload = () => {
      setIsImageLoading(false);
      setImageError(false);
    };
    img.onerror = () => {
      setIsImageLoading(false);
      setImageError(true);
    };
  }, [book.image]);

  return (
    <>
      {type === "small" ? (
        <div className="card bg-gray-800 shadow-lg w-72 sm:w-60 hover:shadow-xl transition-transform duration-300 hover:scale-105">
          <figure className="px-5 pt-5">
            {isImageLoading ? (
              <div className="h-48 w-full flex items-center justify-center bg-gray-700 rounded-xl">
                <span className="text-gray-400">Loading...</span>
              </div>
            ) : imageError ? (
              <div className="h-48 w-full flex items-center justify-center bg-gray-700 rounded-xl">
                <span className="text-gray-400">Image not available</span>
              </div>
            ) : (
              <img
                src={book.image}
                alt={book.name}
                className="h-48 w-full object-cover rounded-xl"
              />
            )}
          </figure>
          <div className="card-body text-center">
            <h2 className="text-lg font-semibold text-gray-100">{book.name}</h2>
            <p className="text-sm text-gray-300">{book.authors.join(", ")}</p>
            <p className="text-sm text-gray-400">
              Category: {book.category.name}
            </p>
            <p className="font-semibold text-green-500">${book.price}</p>
            <div className="card-actions justify-center">
              <Link
                to={`/products/${book._id}`}
                className="btn border-0 bg-green-600 hover:bg-green-700 text-white btn-sm"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default BookCard;
