import React, { useEffect } from "react";
import { FaInstagram, FaTwitter, FaLinkedin, FaFacebook } from "react-icons/fa";
import { IoIosCall, IoMdMail } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import yml from '../assest/banner/yml.png';

// Scroll to top component with smooth scroll
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
};

const Footer = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div className="flex-grow">
        {/* Page content goes here */}
      </div>

      {/* Footer Section */}
      <div className="bg-gray-100 text-gray-700">
        {/* Top Section */}
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <Link to="/about" className="flex flex-col items-center">
              <img src="comp1.png" alt="About Company" className="w-12" />
              <p className="mt-2 text-black hover:text-gray-500">About Company</p>
            </Link>
            <Link to="/contact" className="flex flex-col items-center">
              <img src="support.png" alt="Contact Us" className="w-12" />
              <p className="mt-2 text-black hover:text-gray-500">Contact Us</p>
            </Link>
            <Link to="/askquestion" className="flex flex-col items-center">
              <img src="question.png" alt="Ask Question" className="w-12" />
              <p className="mt-2 text-black hover:text-gray-500">Ask Question</p>
            </Link>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="bg-sky-600 py-6">
          <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
            {/* Download Section */}
            <div className="text-center">
              <a href="/">
                <img src={yml} alt="Logo" className="mx-auto w-24 rounded-full" />
              </a>
              <h2 className="mt-3 text-lg font-bold text-white">Download our app</h2>
              <div className="flex justify-center gap-3 mt-3">
                <a href="https://play.google.com/">
                  <img src="Google-play.png" alt="Google Play" className="w-28" />
                </a>
                <a href="https://www.apple.com/in/app-store/">
                  <img src="App-store.png" alt="App Store" className="w-28" />
                </a>
              </div>
            </div>

            {/* Special Section */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-white">Special</h3>
              <ul className="space-y-1 text-white">
                <li><Link to="/" className="hover:text-gray-300">Top Electronics</Link></li>
                <li><Link to="/" className="hover:text-gray-300">Latest Groceries</Link></li>
                <li><Link to="/" className="hover:text-gray-300">Best Medicines</Link></li>
                <li><Link to="/" className="hover:text-gray-300">Top Personal Care</Link></li>
              </ul>
            </div>

            {/* Account and Shipping Information */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-white">Account and Shipping</h3>
              <ul className="space-y-1 text-white">
                <li><Link to="/businessprofile" className="hover:text-gray-300">Accounts</Link></li>
                <li><Link to="/user-details" className="hover:text-gray-300">Profile</Link></li>
                <li><Link to="/cart" className="hover:text-gray-300">Check your Carts & Discounts</Link></li>
                <li><Link to="/refer" className="hover:text-gray-300">Refer a Friend</Link></li>
              </ul>
            </div>

            {/* Newsletter Section */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-white">Newsletter</h3>
              <p className="mb-3 text-gray-200">Subscribe to our channel for the latest updates.</p>
              <form action="">
                <input
                  className="w-full px-3 py-1 border border-gray-500 rounded-md mb-3 text-gray-700"
                  type="email"
                  placeholder="Enter Your Email"
                />
                <input
                  className="w-full px-3 py-1 bg-green-500 text-white rounded-md cursor-pointer hover:bg-green-700"
                  type="button"
                  value="Subscribe"
                />
              </form>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-sky-900 py-6">
          <div className="container mx-auto px-4 flex flex-col lg:flex-row justify-between items-center">
            <div className="mb-4 lg:mb-0">
              <h4 className="text-lg font-semibold text-white">Start a conversation</h4>
              <p className="text-gray-400">
                Office No 1, Opposite Rajmudra Petrolpump, Murunji Road, Marunji, Mulshi, 411057.
              </p>
              <p className="text-gray-400">Pune, Maharashtra</p>
            </div>

            <div className="space-y-1 text-white">
              <p className="flex items-center gap-2">
                <IoIosCall className="text-lg" />
                +91-8850115960
              </p>
              <p className="flex items-center gap-2">
                <IoMdMail className="text-lg" />
                info@ymlmart.com
              </p>
            </div>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="bg-gray-800 text-gray-400 py-2">
          <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
            <p className="text-center md:text-left">&copy; 2024 | Yahshua Marketing Limited.</p>
            <div className="flex gap-3 justify-center md:justify-end mt-2 md:mt-0">
              <a href="https://www.instagram.com/yml.mart?igsh=Y3dzeGt3MzIxM2Zl" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                <FaInstagram size={18} />
              </a>
              <a href="https://www.linkedin.com/company/yahshua-marketing-limited/" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                <FaLinkedin size={18} />
              </a>
              <a href="https://www.facebook.com/search/top?q=yahshua%20marketing%20limited" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                <FaFacebook size={18} />
              </a>
            </div>
            <div className="flex gap-3 justify-center md:justify-end mt-2 md:mt-0">
              <a href="#" className="hover:text-white">Terms and Conditions</a>
              <a href="#" className="hover:text-white">Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Footer />
    </>
  );
}
