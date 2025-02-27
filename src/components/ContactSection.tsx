const ContactSection = () => {
  return (
    <div className="mx-auto px-4 sm:px-8 lg:px-14 text-center bg-gray-400 py-12 ">
      <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">
        Contact Us
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="space-y-8 h-full flex flex-col justify-between">
          <div className="bg-gray-800 p-8 rounded-xl shadow-lg flex items-center space-x-6">
            <div className="text-blue-500 text-4xl">📍</div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-100 mb-2">
                Our Address
              </h3>
              <p className="text-gray-300">
                123 Bookshop Street, Reading City, Bookland, 12345
              </p>
            </div>
          </div>

          <div className="bg-gray-800 p-8 rounded-xl shadow-lg flex items-center space-x-6">
            <div className="text-green-500 text-4xl">📞</div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-100 mb-2">
                Call Us
              </h3>
              <p className="text-gray-300">
                <a
                  href="tel:+1234567890"
                  className="text-blue-400 hover:text-blue-300 font-semibold"
                >
                  01843336009
                </a>
              </p>
            </div>
          </div>

          <div className="bg-gray-800 p-8 rounded-xl shadow-lg flex items-center space-x-6">
            <div className="text-purple-500 text-4xl">📧</div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-100 mb-2">
                Email Us
              </h3>
              <p className="text-gray-300">
                <a
                  href="mailto:support@boibajar.com"
                  className="text-blue-400 hover:text-blue-300 font-semibold"
                >
                  support@boibajar.com
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-8 rounded-xl shadow-lg h-full flex flex-col justify-center">
          <h3 className="text-2xl font-semibold text-gray-100 mb-6 text-center">
            Send Us a Message
          </h3>
          <form
            action="#"
            method="POST"
            className="space-y-6 flex-grow flex flex-col"
          >
            <div>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-3 rounded-md bg-gray-700 text-gray-100 placeholder-gray-400 border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-3 rounded-md bg-gray-700 text-gray-100 placeholder-gray-400 border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <textarea
                placeholder="Your Message"
            
                className="w-full p-3 rounded-md bg-gray-700 text-gray-100 placeholder-gray-400 border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              ></textarea>
            </div>

            <div className="text-center mt-auto">
              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition duration-300 w-full"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
