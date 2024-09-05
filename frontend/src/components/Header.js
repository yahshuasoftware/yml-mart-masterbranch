import React, { useContext, useState } from "react";
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import ROLE from "../common/role";
import Context from "../context";

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const context = useContext(Context);
  const navigate = useNavigate();
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.getAll("q");
  const [search, setSearch] = useState(searchQuery);

  const { totalPurchasing } = useContext(Context);

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include",
    });

    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/");
    }

    if (data.error) {
      toast.error(data.message);
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);

    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate("/search");
    }
  };

  return (
    <header className="h-16 shadow-md bg-white fixed w-full z-40">
      <div className="h-full container mx-auto flex items-center px-6 justify-between">
        <div>
          <Link to="/">
            <img src="logo.png" alt="Logo" className="w-32" />
          </Link>
        </div>

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

        <div className="flex items-center gap-6">
        {user?._id && (
            <>
                         <Link
        to="/businessprofile"
        className="px-3 py-1 text-sm rounded border
          border-sky-600 text-sky-600 bg-transparent hover:bg-sky-600 hover:text-white transition-colors duration-300'
             border-gray-400 text-gray-400 bg-transparent cursor-not-allowed"
      >
        B Profile
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
      {user?.profilePic ? (
        <img
          src={user?.profilePic}
          className="w-10 h-10 rounded-full object-cover"
          alt={user?.name}
        />
      ) : (
        <FaRegCircleUser className="text-gray-700" />
      )}
    </div>
  )}

  <div
    className={`absolute bg-white left-1/2 transform -translate-x-1/2 mt-2 p-2 shadow-lg rounded z-10 transition-transform duration-300 ease-out origin-top ${
      menuDisplay ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'
    }`}
  >
     
    <nav>
      

      {user?.role === ROLE.SUPER_ADMIN && (
        <Link
          to={"/super-admin-panel/all-users"}
          className="block whitespace-nowrap hover:bg-slate-100 p-2"
          onClick={() => setMenuDisplay(false)}
        >
          Super Admin Panel
        </Link>
      )}
      {user?.role === ROLE.ADMIN && (
        <Link
          to={"/admin-panel/all-products"}
          className="block whitespace-nowrap hover:bg-slate-100 p-2"
          onClick={() => setMenuDisplay(false)}
        >
          Admin Panel
        </Link>
      )}
      {user?.role === ROLE.GENERAL && (
        <Link
          to={"/user-details"}
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
              <div className="bg-red-600 text-white w-5 h-5 rounded-full text-center absolute -top-2 -right-3 flex items-center justify-center">
                <span className="text-xs">{context?.cartProductCount}</span>
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
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
