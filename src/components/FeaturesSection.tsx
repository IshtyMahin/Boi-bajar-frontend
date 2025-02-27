const FeaturesSection = () => {
  return (
    <div className="mx-auto px-4 sm:px-8 lg:px-14 text-center bg-gray-400 py-12 rounded-b-xl shadow-md  mb-12">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
        Our Features
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-gray-800 p-8 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105">
          <div className="mb-6">
            <svg
              className="w-12 h-12 mx-auto text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <h3 className="text-2xl font-semibold mb-4 text-gray-100">
            Free Shipping
          </h3>
          <p className="text-lg text-gray-300">
            Enjoy free shipping on all orders, no matter the size.
          </p>
        </div>

        <div className="bg-gray-800 p-8 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105">
          <div className="mb-6">
            <svg
              className="w-12 h-12 mx-auto text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          <h3 className="text-2xl font-semibold mb-4 text-gray-100">
            Exclusive Collections
          </h3>
          <p className="text-lg text-gray-300">
            Access our curated collections featuring the latest bestsellers and
            classic favorites.
          </p>
        </div>

        <div className="bg-gray-800 p-8 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105">
          <div className="mb-6">
            <svg
              className="w-12 h-12 mx-auto text-purple-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              ></path>
            </svg>
          </div>
          <h3 className="text-2xl font-semibold mb-4 text-gray-100">
            24/7 Customer Support
          </h3>
          <p className="text-lg text-gray-300">
            We're always here to help with your book purchases and inquiries.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
