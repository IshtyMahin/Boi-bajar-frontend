import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div
      className="relative w-full h-96 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1512820790803-46f2e1065b85?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhY2h8Mnx8Ym9va3MlMjBmb3IlMjBhZ2VzfGVufDB8fHx8fDE2ODU0MTc2Njk&ixlib=rb-1.2.1&q=80&w=1080')",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>{" "}
      <div className="relative container mx-auto h-full flex items-center justify-center text-center text-white">
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold">
            Welcome to Our Book Shop
          </h1>
          <p className="text-lg sm:text-xl">
            Explore a wide range of books for all ages and interests!
          </p>
          <Link
            to="/products"
            className="btn bg-green-600 hover:bg-green-700 text-white text-xl px-6 py-3 mt-4 transition-colors duration-200 border-0 "
          >
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
