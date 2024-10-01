// src/components/Header.js
import React, { useState, useEffect,useContext } from "react";
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import SummaryApi from "../common";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import ROLE from "../common/role";
import { useCart } from "../context/CartContext";
import ProfileIcon from "../assest/loginProfile1.png"
import Context from '../context/index';


const Header = () => {

  const { authToken } = useContext(Context); // Get the authToken from Context

  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // State for mobile menu
  const navigate = useNavigate();
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.getAll("q");
  const [search, setSearch] = useState(searchQuery);
  const [menuDisplay, setMenuDisplay] = useState(false);

  // Use cart context
  const { cartProductCount } = useCart();

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include",
      headers: {
        'Content-Type': 'application/json',
      },
      
    });

    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      localStorage.removeItem("authToken");

      navigate("/");
    } else if (data.error) {
      toast.error(data.message);
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
    navigate(value ? `/search?q=${value}` : "/search");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <header className="h-16 shadow-md bg-white fixed w-full z-40">
      <div className="h-full container mx-auto flex items-center px-6 justify-between">
        <Link to="/">
          <img src="ymllogo.jpg" alt="Logo" className="w-48" />
        </Link>

        {/* Desktop Search Bar */}
        <div className="hidden lg:flex items-center w-full max-w-md border border-gray-300 rounded-md pl-4 focus-within:shadow-md">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full py-2 outline-none text-gray-700 placeholder-gray-500"
            onChange={handleSearch}
            value={search}
          />
          <button className="text-lg h-10 w-10 bg-sky-600 flex items-center justify-center rounded-r text-white hover:bg-sky-700 transition-colors duration-200">
            <GrSearch />
          </button>
        </div>

        {/* Mobile Menu Icon */}
        <div className="lg:hidden flex items-cente gap-3">



<div className="relative">
            {user?._id && (
              <div
                className="text-3xl cursor-pointer flex items-center justify-center"
                onClick={() => setMenuDisplay((prev) => !prev)}
              >
                <img
                  src={ProfileIcon}
                  className="w-10 h-10 rounded-full object-cover"
                  alt={user?.name}
                />
              </div>
            )}

            <div
              className={`absolute bg-white left-1/2 transform -translate-x-1/2 mt-2 p-2 shadow-lg rounded z-10 transition-transform duration-300 ease-out origin-top ${
                menuDisplay ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"
              }`}
            >
              <nav>
                {user?.role === ROLE.SUPER_ADMIN && (
                  <Link
                    to="/super-admin-panel/all-users"
                    className="block whitespace-nowrap hover:bg-slate-100 p-2"
                    onClick={() => setMenuDisplay(false)}
                  >
                    Super Admin Panel
                  </Link>
                )}
                {user?.role === ROLE.ADMIN && (
                  <Link
                    to="/admin-panel/all-products"
                    className="block whitespace-nowrap hover:bg-slate-100 p-2"
                    onClick={() => setMenuDisplay(false)}
                  >
                    Admin Panel
                  </Link>
                )}
                {user?.role === ROLE.GENERAL && (
                  <Link
                    to="/user-details"
                    className="block whitespace-nowrap hover:bg-slate-100 p-2"
                    onClick={() => setMenuDisplay(false)}
                  >
                    Profile
                  </Link>
                )}
              </nav>
            </div>
          </div>
            {user?._id && (
              <Link to="/cart" className="text-3xl relative">
                <FaShoppingCart className="text-gray-700 hover:text-sky-600 transition-colors duration-200" />
                <div className="bg-red-600 text-white w-5 h-5 text-xs rounded-full absolute -top-2 -right-2 flex items-center justify-center">
                  {cartProductCount}
                </div>
              </Link>
            )}
          <button onClick={toggleMobileMenu} className="text-3xl">
            ☰
          </button>

          
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed top-16 left-0 w-full bg-white shadow-lg z-50">
            <nav className="flex flex-col p-4">
              {user?._id && (
                <>
                  <Link
                    to="/businessprofile"
                    className="py-2 text-lg text-sky-600 hover:bg-sky-600 hover:text-white transition-colors duration-300"
                    onClick={toggleMobileMenu}
                  >
                    Account
                  </Link>
                  <Link
                    to="/refer"
                    className="py-2 text-lg text-sky-600 hover:bg-sky-600 hover:text-white transition-colors duration-300"
                    onClick={toggleMobileMenu}
                  >
                    Refer
                  </Link>
                </>
              )}
              {user?._id ? (
                <button
                  onClick={handleLogout}
                  className="py-2 text-lg text-white bg-sky-600 hover:bg-sky-700 transition-colors duration-300"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="py-2 text-lg text-white bg-red-600 hover:bg-red-700 transition-colors duration-300"
                  onClick={toggleMobileMenu}
                >
                   please Login 
                </Link>
              )}
              
            </nav>
            
          </div>
          


        )}

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-6">
          {user?._id && (
            <>
              <Link
                to="/businessprofile"
                className="px-3 py-1 text-sm rounded border border-sky-600 text-sky-600 bg-transparent hover:bg-sky-600 hover:text-white transition-colors duration-300"
              >
                Account
              </Link>
              <Link
                to="/refer"
                className="px-3 py-1 text-sm rounded border border-sky-600 text-sky-600 bg-transparent hover:bg-sky-600 hover:text-white transition-colors duration-300"
              >
                Refer
              </Link>
            </>
          )}

          <div className="relative">
            {user?._id && (
              <div
                className="text-3xl cursor-pointer flex items-center justify-center"
                onClick={() => setMenuDisplay((prev) => !prev)}
              >
                <img
                  src={ProfileIcon}
                  className="w-10 h-10 rounded-full object-cover"
                  alt={user?.name}
                />
              </div>
            )}

            <div
              className={`absolute bg-white left-1/2 transform -translate-x-1/2 mt-2 p-2 shadow-lg rounded z-10 transition-transform duration-300 ease-out origin-top ${
                menuDisplay ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"
              }`}
            >
              <nav>
                {user?.role === ROLE.SUPER_ADMIN && (
                  <Link
                    to="/super-admin-panel/all-users"
                    className="block whitespace-nowrap hover:bg-slate-100 p-2"
                    onClick={() => setMenuDisplay(false)}
                  >
                    Super Admin Panel
                  </Link>
                )}
                {user?.role === ROLE.ADMIN && (
                  <Link
                    to="/admin-panel/all-products"
                    className="block whitespace-nowrap hover:bg-slate-100 p-2"
                    onClick={() => setMenuDisplay(false)}
                  >
                    Admin Panel
                  </Link>
                )}
                {user?.role === ROLE.GENERAL && (
                  <Link
                    to="/user-details"
                    className="block whitespace-nowrap hover:bg-slate-100 p-2"
                    onClick={() => setMenuDisplay(false)}
                  >
                    Profile
                  </Link>
                )}
              </nav>
            </div>
          </div>

          {user?._id && (
            <Link to="/cart" className="text-2xl relative">
              <FaShoppingCart className="text-gray-700 hover:text-sky-600 transition-colors duration-200" />
              <div className="bg-red-600 text-white w-5 h-5 text-xs rounded-full absolute -top-2 -right-2 flex items-center justify-center">
                {cartProductCount}
              </div>
            </Link>
          )}

          <div>
            {user?._id ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-full text-sm text-white bg-sky-600 hover:bg-sky-700 transition-colors duration-200"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 rounded-full text-sm text-white bg-red-600 hover:bg-red-700 transition-colors duration-200"
              >
                please Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
