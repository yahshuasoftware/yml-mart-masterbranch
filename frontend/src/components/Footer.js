import React from "react";
import { FaInstagram, FaTwitter, FaLinkedin, FaFacebook } from "react-icons/fa";
import { IoIosCall, IoMdMail } from "react-icons/io";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between overflow-hidden">
      {/* Main content would go here */}
      <div className="flex-grow">
        {/* Page content goes here */}
      </div>

      {/* Footer Section */}
      <div className="bg-white-600 text-gray-400 ">
        {/* Top Section */}
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-around mb-8">
            <Link to="/about" className="text-center">
              <div className="w-16 mx-auto">
                <img src="comp1.png" alt="About Company" className="w-full" />
              </div>
              <p className="mt-2 text-black hover:text-gray-300">About Company</p>
            </Link>

            <Link to="/contact" className="text-center">
              <div className="w-16 mx-auto">
                <img src="support.png" alt="Contact Us" className="w-full" />
              </div>
              <p className="mt-2 text-black hover:text-gray-300">Contact Us</p>
            </Link>

            <Link to="/askquestion" className="text-center">
              <div className="w-16 mx-auto">
                <img src="question.png" alt="Ask Question" className="w-full" />
              </div>
              <p className="mt-2 text-black hover:text-gray-300">Ask Question</p>
            </Link>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="bg-gray-700 py-8">
          <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
            {/* Download Section */}
            <div className="text-center">
              <a href="/">
                <img src="logo.png" alt="Logo" className="mx-auto w-20" />
              </a>
              <h2 className="mt-4 text-lg font-bold text-white">Download our app</h2>
              <div className="flex justify-center gap-4 mt-4">
                <a href="https://play.google.com/">
                  <img src="Google-play.png" alt="Google Play" className="w-32" />
                </a>
                <a href="https://www.apple.com/in/app-store/">
                  <img src="App-store.png" alt="App Store" className="w-32" />
                </a>
              </div>
            </div>

            {/* Special Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Special</h3>
              <ul className="space-y-2">
                <li><Link to="#" className="hover:text-gray-300">Top Electronics</Link></li>
                <li><Link to="#" className="hover:text-gray-300">Latest Groceries</Link></li>
                <li><Link to="#" className="hover:text-gray-300">Best Medicines</Link></li>
                <li><Link to="#" className="hover:text-gray-300">Top Personal Care</Link></li>
              </ul>
            </div>

            {/* Account and Shipping Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Account and Shipping</h3>
              <ul className="space-y-2">
                <li><Link to="/businessprofile" className="hover:text-gray-300">Accounts</Link></li>
                <li><Link to="/user-details" className="hover:text-gray-300">Profile</Link></li>
                <li><Link to="/cart" className="hover:text-gray-300">Check your Carts & Discounts</Link></li>
                <li><Link to="/refer" className="hover:text-gray-300">Refer a Friend</Link></li>
              </ul>
            </div>

            {/* Newsletter Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Newsletter</h3>
              <p className="mb-4 text-gray-400">Subscribe to our channel for the latest updates.</p>
              <form action="">
                <input
                  className="w-full px-4 py-2 border border-gray-500 rounded-md mb-4 text-black"
                  type="email"
                  placeholder="Enter Your Email"
                />
                <input
                  className="w-full px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600"
                  type="button"
                  value="Subscribe"
                />
              </form>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gray-900 py-8">
          <div className="container mx-auto px-4 flex flex-col lg:flex-row justify-between items-center">
            <div className="mb-6 lg:mb-0">
              <h4 className="text-lg font-semibold text-white">Start a conversation</h4>
              <p className="text-gray-400">
                Office No 1, Opposite Rajmudra Petrolpump, Murunji Road, Marunji, Mulshi, 411057.
              </p>
              <p className="text-gray-400">Pune, Maharashtra</p>
            </div>

            <div className="space-y-2">
              <p className="flex items-center gap-2 text-white">
                <IoIosCall className="text-lg" />
                +91-8850115960
              </p>
              <p className="flex items-center gap-2 text-white">
                <IoMdMail className="text-lg" />
                info@ymlmart.com
              </p>
            </div>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="bg-gray-800 text-gray-400 py-2">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <p>&copy; 2024 | Yahshua Marketing Limited.</p>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                <FaLinkedin size={20} />
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                <FaFacebook size={20} />
              </a>
            </div>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white">Terms and Conditions</a>
              <a href="#" className="hover:text-white">Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
