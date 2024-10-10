import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import productCategory from "../helpers/productCategory";
import VerticalCard from "../components/VerticalCard";
import Loader from "../components/Loader";
import SummaryApi from "../common";
import { FaTimes, FaBars } from "react-icons/fa";

const CategoryProduct = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const [isSidebarVisible, setIsSidebarVisible] = useState(true); // Sidebar visible by default
  const [selectCategory, setSelectCategory] = useState({});
  const [selectSubcategory, setSelectSubcategory] = useState({});
  const [filterCategoryList, setFilterCategoryList] = useState([]);
  const [filterSubcategoryList, setFilterSubcategoryList] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const prevSearchRef = useRef("");

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  const urlSearch = new URLSearchParams(location.search);
  const urlCategoryListinArray = urlSearch.getAll("category");
  const urlSubcategoryListinArray = urlSearch.getAll("subcategory");

  // Sync state with URL parameters and open sidebar by default
  useEffect(() => {
    const urlCategoryListObject = {};
    const urlSubcategoryListObject = {};

    urlCategoryListinArray.forEach((el) => {
      urlCategoryListObject[el] = true;
    });

    urlSubcategoryListinArray.forEach((el) => {
      urlSubcategoryListObject[el] = true;
    });

    // Set selected categories and subcategories from URL
    setSelectCategory(urlCategoryListObject);
    setSelectSubcategory(urlSubcategoryListObject);

    // Check each subcategory's parent category
    urlSubcategoryListinArray.forEach((subcat) => {
      const parentCategory = productCategory.find(category =>
        category.subcategories.some(s => s.value === subcat)
      );
      if (parentCategory) {
        urlCategoryListObject[parentCategory.value] = true; // Select the parent category
      }
    });

    setSelectCategory(urlCategoryListObject);
    setIsSidebarVisible(true); // Open sidebar when the page loads
  }, [location.search]);

  // Fetch data based on filters
  const fetchData = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.filterProduct.url, {
      method: SummaryApi.filterProduct.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category: filterCategoryList,
        subcategory: filterSubcategoryList,
        sortBy: sortBy,
      }),
    });

    const dataResponse = await response.json();
    setData(dataResponse?.data || []);
    setLoading(false);
  };

  // Update filter lists and manage URL
  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory).filter(
      (key) => selectCategory[key]
    );
    const arrayOfSubcategory = Object.keys(selectSubcategory).filter(
      (key) => selectSubcategory[key]
    );

    if (JSON.stringify(arrayOfCategory) !== JSON.stringify(filterCategoryList)) {
      setFilterCategoryList(arrayOfCategory);
    }

    if (JSON.stringify(arrayOfSubcategory) !== JSON.stringify(filterSubcategoryList)) {
      setFilterSubcategoryList(arrayOfSubcategory);
    }

    const newSearch = [
      ...arrayOfCategory.map((el) => `category=${el}`),
      ...arrayOfSubcategory.map((el) => `subcategory=${el}`),
    ].join("&");

    // Check if the search string is different from the previous one to prevent unnecessary navigation
    if (newSearch !== prevSearchRef.current) {
      navigate("/product-category?" + newSearch);
      prevSearchRef.current = newSearch;
    }
  }, [
    selectCategory,
    selectSubcategory,
    filterCategoryList,
    filterSubcategoryList,
    navigate,
  ]);

  // Fetch data when filters change
  useEffect(() => {
    if (filterCategoryList.length > 0 || filterSubcategoryList.length > 0) {
      fetchData();
    }
  }, [filterCategoryList, filterSubcategoryList, sortBy]);

  const handleSelectCategory = (e) => {
    const { value, checked } = e.target;
    setSelectCategory((prev) => ({
      ...prev,
      [value]: checked,
    }));

    // Uncheck all subcategories if the main category is unchecked
    if (!checked) {
      const category = productCategory.find(cat => cat.value === value);
      category.subcategories.forEach(sub => {
        setSelectSubcategory(prev => ({
          ...prev,
          [sub.value]: false,
        }));
      });
    } else {
      // Check all subcategories if the main category is checked
      const category = productCategory.find(cat => cat.value === value);
      category.subcategories.forEach(sub => {
        setSelectSubcategory(prev => ({
          ...prev,
          [sub.value]: true,
        }));
      });
    }
  };

  // Handle subcategory selection and ensure its parent category is checked
  const handleSelectSubcategory = (e) => {
    const { value, checked } = e.target;

    // Update subcategory selection
    setSelectSubcategory((prev) => ({
      ...prev,
      [value]: checked,
    }));

    // Check the parent category of the selected subcategory
    const parentCategory = productCategory.find(category =>
      category.subcategories.some(subcat => subcat.value === value)
    );

    if (parentCategory) {
      setSelectCategory((prev) => ({
        ...prev,
        [parentCategory.value]: true, // Ensure parent category is selected
      }));
    }
  };

  const handleOnChangeSortBy = (e) => {
    const { value } = e.target;
    setSortBy(value);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="lg:grid grid-cols-[200px,1fr]">
        {/* Sidebar */}
        <div className={`hidden lg:block bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll ${isSidebarVisible ? '' : 'hidden'}`}>
          <div>
            <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">Sort by</h3>
            <form className="text-sm flex flex-col gap-2 py-2">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortBy === "asc"}
                  onChange={handleOnChangeSortBy}
                  value={"asc"}
                />
                <label>Price - Low to High</label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortBy === "dsc"}
                  onChange={handleOnChangeSortBy}
                  value={"dsc"}
                />
                <label>Price - High to Low</label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortBy === "popularity"}
                  onChange={handleOnChangeSortBy}
                  value={"popularity"}
                />
                <label>Popularity</label>
              </div>
            </form>
          </div>

          <div>
            <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">Category</h3>
            <form className="text-sm flex flex-col gap-2 py-2">
              {productCategory.map((category, index) => (
                <div key={index}>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      name="category"
                      checked={selectCategory[category.value] || false}
                      value={category.value}
                      id={category.value}
                      onChange={handleSelectCategory}
                    />
                    <label htmlFor={category.value}>{category.label}</label>
                  </div>

                  {/* Expand and select subcategory */}
                  {selectCategory[category.value] || Object.keys(selectSubcategory).some(sub => category.subcategories.some(s => s.value === sub)) ? (
                    category.subcategories?.map((subcategory, subIndex) => (
                      <div className="ml-5" key={subIndex}>
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            name="subcategory"
                            checked={selectSubcategory[subcategory.value] || false}
                            value={subcategory.value}
                            id={subcategory.value}
                            onChange={handleSelectSubcategory}
                          />
                          <label htmlFor={subcategory.value}>{subcategory.label}</label>
                        </div>
                      </div>
                    ))
                  ) : null}
                </div>
              ))}
            </form>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-0 mt-8 lg:px-4">
          <p className="font-medium text-slate-800 text-lg my-2">Showing Results: {data.length}</p>
          <div className="min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]">
            {loading ? (
              <Loader /> // Show Loader when loading is true
            ) : (
              data.length !== 0 && <VerticalCard data={data} loading={loading} />
            )}
          </div>
        </div>
      </div>

      {/* Toggle Sidebar Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-16 left-0 bg-white text-sky-500 px-2 py-1 rounded-full z-50"
      >
        {isSidebarVisible ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Mobile Sidebar */}
      <div
        className={`lg:hidden fixed pt-8 top-16 left-0 bg-white p-2 h-full min-h-[calc(100vh-120px)] shadow-md z-40 overflow-y-scroll ${isSidebarVisible ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}
      >
        <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">Category</h3>
        <form className="text-sm flex flex-col gap-2 py-2">
          {productCategory.map((category, index) => (
            <div key={index}>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="category"
                  checked={selectCategory[category.value] || false}
                  value={category.value}
                  id={category.value}
                  onChange={handleSelectCategory}
                />
                <label htmlFor={category.value}>{category.label}</label>
              </div>

              {/* Expand and select subcategory */}
              {selectCategory[category.value] || Object.keys(selectSubcategory).some(sub => category.subcategories.some(s => s.value === sub)) ? (
                category.subcategories?.map((subcategory, subIndex) => (
                  <div className="ml-5" key={subIndex}>
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        name="subcategory"
                        checked={selectSubcategory[subcategory.value] || false}
                        value={subcategory.value}
                        id={subcategory.value}
                        onChange={handleSelectSubcategory}
                      />
                      <label htmlFor={subcategory.value}>{subcategory.label}</label>
                    </div>
                  </div>
                ))
              ) : null}
            </div>
          ))}
        </form>
      </div>
    </div>
  );
};

export default CategoryProduct;
