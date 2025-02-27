const AboutSection = () => {
  return (
    <div className=" mx-auto px-4 sm:px-8 lg:px-14 text-center bg-gray-400 py-12 rounded-b-xl shadow-md mb-12">
      <h2 className="text-4xl font-bold text-gray-800 mb-8">
        About Boi Bajar (বই বাজার)
      </h2>

  
      <div className=" mx-auto">
        <div className="bg-gray-800 p-8 rounded-xl shadow-lg mb-12">
          <p className="text-xl text-gray-200 mb-8 leading-relaxed">
            Welcome to{" "}
            <span className="font-semibold text-gray-50">
              Boi Bajar (বই বাজার)
            </span>
            ! We are passionate about connecting readers with the books they
            love. Our shop offers a vast selection of books across various
            genres, catering to every reader’s taste. Whether you’re a fan of
            the latest bestsellers, timeless classics, or niche genres, we’ve
            got something special for you.
          </p>
          <p className="text-xl text-gray-200 mb-8 leading-relaxed">
            At{" "}
            <span className="font-semibold text-gray-50">
              Boi Bajar (বই বাজার)
            </span>
            , we believe that books have the power to inspire, educate, and
            entertain. That’s why we’re committed to providing readers with the
            best selection of books at great prices, along with top-notch
            customer service. Our mission is to make reading accessible and
            enjoyable for everyone.
          </p>
          <p className="text-xl text-gray-200 leading-relaxed">
            Join us on this literary journey and discover your next favorite
            book today!
          </p>
        </div>
      </div>

  
      <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
 
        <div className="bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105">
          <div className="mb-6">
            <svg
              className="w-12 h-12 mx-auto text-orange-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              ></path>
            </svg>
          </div>
          <h3 className="text-2xl font-semibold mb-4 text-gray-100">
            Wide Selection of Books
          </h3>
          <p className="text-gray-300">
            Explore an extensive collection of books in every genre. From
            fiction to non-fiction, we have it all!
          </p>
        </div>

        <div className="bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105">
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
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <h3 className="text-2xl font-semibold mb-4 text-gray-100">
            Affordable Prices
          </h3>
          <p className="text-gray-300">
            Get the best books at prices that suit your budget. We offer
            discounts and deals regularly.
          </p>
        </div>

        <div className="bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105">
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
            Fast & Free Shipping
          </h3>
          <p className="text-gray-300">
            Enjoy fast and free shipping on all orders, so your books arrive
            quickly and safely at your doorstep.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
