import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { Link } from 'react-router-dom';
import productCategory from '../helpers/productCategory'; // Assuming productCategory is an array with subcategories for each category

const categoryImages = {
    "personal care": require('../assest/Images/Personal Care/8.jpeg'),
    "toys, games": require('../assest/Images/Home Care/1.jpg'),
    "gifts, hampers": require('../assest/Images/Home Care/5.jpeg'),
    "kitchenware": require('../assest/Images/Kitchen/1.webp'),
    "beauty": require('../assest/Images/Beauty/1.jpeg'),
    "stationary": require('../assest/Images/Stationary/10.jpeg'),
    "electronics": require('../assest/Images/Electronics/2.jpeg'),
    "home decor": require('../assest/Images/Kitchen/11.jpeg'),
    "groceries": require('../assest/Images/Groceries/4.png'),
    // "default": require('../assets/default-image.png') // Default image if no specific category image is found
};
const CategoryList = () => {
    const [categoryProduct, setCategoryProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hoveredCategory, setHoveredCategory] = useState(null); // To track the hovered category
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 }); // Position for the dropdown
    const [isDropdownVisible, setIsDropdownVisible] = useState(false); // To manage dropdown visibility
    const [lastScrollY, setLastScrollY] = useState(0); // Track the last scroll position

    const categoryLoading = new Array(13).fill(null);

    const fetchCategoryProduct = async () => {
        setLoading(true);
        try {
            const response = await fetch(SummaryApi.categoryProduct.url);
            const dataResponse = await response.json();
            setCategoryProduct(Array.isArray(dataResponse.data) ? dataResponse.data : []);
            console.log(Array.isArray(dataResponse.data) ? dataResponse.data : [])
        } catch (error) {
            console.error("Failed to fetch category products:", error);
            setCategoryProduct([]); // Set an empty array on error to prevent map errors
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategoryProduct();
    }, []);

    // Helper to get subcategories for a product category from productCategory.js
    const getSubcategories = (category) => {
        const categoryData = productCategory.find(
            (cat) => cat.value.toLowerCase() === category?.toLowerCase() // Ensure both values are compared in lowercase
        );
        return categoryData ? categoryData.subcategories : [];
    };

    // Handle setting the position of the dropdown relative to the hovered category
    const handleMouseEnter = (event, category) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const dropdownWidth = 256; // Width of the dropdown
        const dropdownHeight = 256; // Height of the dropdown
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // Calculate default positions
        let top = rect.bottom + window.scrollY;
        let left = rect.left + window.scrollX;

        // Adjust position if dropdown goes out of viewport
        if (left + dropdownWidth > viewportWidth) {
            left = viewportWidth - dropdownWidth;
        }
        if (top + dropdownHeight > viewportHeight) {
            top = rect.top + window.scrollY - dropdownHeight;
        }

        setDropdownPosition({ top, left });
        setHoveredCategory(category);
        setIsDropdownVisible(true);
    };

    // Handle hiding dropdown when mouse leaves category or dropdown
    const handleMouseLeave = () => {
        setTimeout(() => {
            if (!dropdownElementHovered && !categoryElementHovered) {
                setIsDropdownVisible(false);
                setHoveredCategory(null);
            }
        }, 100);
    };

    let dropdownElementHovered = false;
    let categoryElementHovered = false;

    // Scroll event listener to show/hide the dropdown based on scroll direction
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // If scrolling down, hide the dropdown
            if (currentScrollY > lastScrollY) {
                setIsDropdownVisible(false);
            }

            // Save the current scroll position
            setLastScrollY(currentScrollY);
        };

        // Add the scroll event listener
        window.addEventListener('scroll', handleScroll);

        // Clean up the scroll event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);

    // Close dropdown when the mouse is not over the dropdown or the category
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.category-item') && !event.target.closest('.dropdown-item')) {
                setIsDropdownVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="container mx-auto pt-5 pb-8 px-4">
        {/* Category Wrapper */}
        <div className="flex items-center gap-6 justify-between overflow-x-auto p-4 rounded-lg shadow-lg">
          {loading ? (
            categoryLoading.map((_, index) => (
              <div
                className="h-20 w-20 md:w-24 md:h-24 rounded-full bg-slate-200 animate-pulse"
                key={"categoryLoading" + index}
              ></div>
            ))
          ) : (
            categoryProduct.map((product) => (
              <div
                key={product?.category || product?._id}
                className="relative group category-item"
                onMouseEnter={(e) => { handleMouseEnter(e, product?.category); }}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  to={"/product-category?category=" + product?.category}
                  className="cursor-pointer"
                >
                  <div className="w-20 h-20 md:w-20 md:h-20 rounded-full p-4 flex items-center justify-center bg-white shadow-md transition-all transform hover:scale-110 hover:shadow-lg">
                    <img
                      src={categoryImages[product?.category.toLowerCase()] || categoryImages["default"]}
                      alt={product?.productName || "Product Image"}
                      className="h-full object-contain transition-transform duration-300"
                    />
                  </div>
                  <p className="text-center text-base  capitalize mt-2 text-gray-700 group-hover:text-sky-600 transition-colors">
                    {product?.category}
                  </p>
                </Link>
              </div>
            ))
          )}
        </div>
      
        {/* Dropdown for subcategories */}
        {isDropdownVisible && (
          <div
            className="fixed z-50 bg-white shadow-lg p-4 rounded-lg w-52 border border-gray-300 overflow-y-auto max-h-64 mt-2 dropdown-item"
            style={{ top: dropdownPosition.top, left: dropdownPosition.left }}
            onMouseEnter={() => setIsDropdownVisible(true)}
            onMouseLeave={handleMouseLeave}
          >
            {getSubcategories(hoveredCategory).length > 0 ? (
              getSubcategories(hoveredCategory).map((subcategory) => (
                <Link
                  key={subcategory.id}
                  to={"/product-category?" + "subcategory=" + subcategory?.value}
                  className="block px-4 py-2 text-sm hover:bg-gray-100 rounded-md transition"
                >
                  {subcategory.label}
                </Link>
              ))
            ) : (
              <p className="text-center text-sm text-gray-500">No subcategories</p>
            )}
          </div>
        )}
      </div>
      
      
    );
};

export default CategoryList;