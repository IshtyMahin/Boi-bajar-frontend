const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="container mx-auto px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h4 className="font-semibold text-xl mb-4">Boi Bajar (বই বাজার)</h4>
            <ul>
              <li>
                <a href="/" className="hover:text-gray-400">
                  Home
                </a>
              </li>
              <li>
                <a href="/shop" className="hover:text-gray-400">
                  Shop
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-gray-400">
                  About
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-gray-400">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-xl mb-4">Support</h4>
            <ul>
              <li>
                <a href="/faq" className="hover:text-gray-400">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/returns" className="hover:text-gray-400">
                  Returns
                </a>
              </li>
              <li>
                <a href="/shipping" className="hover:text-gray-400">
                  Shipping Information
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-xl mb-4">Follow Us</h4>
            <ul>
              <li>
                <a href="https://facebook.com" className="hover:text-gray-400">
                  Facebook
                </a>
              </li>
              <li>
                <a href="https://twitter.com" className="hover:text-gray-400">
                  Twitter
                </a>
              </li>
              <li>
                <a href="https://instagram.com" className="hover:text-gray-400">
                  Instagram
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-xl mb-4">Contact</h4>
            <p className="text-gray-400">Fatikchari,Chittagong</p>
            <p className="text-gray-400">Email: support@boibajar.com</p>
            <p className="text-gray-400">Phone: 01843336009</p>
          </div>
        </div>

        <div className="text-center mt-8 text-gray-400">
          <p>&copy; 2025 Boi Bajar (বই বাজার). All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
