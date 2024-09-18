import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { Link } from 'react-router-dom';
import productCategory from '../helpers/productCategory'; // Assuming productCategory is an array with subcategories for each category

const CategoryList = () => {
    const [categoryProduct, setCategoryProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hoveredCategory, setHoveredCategory] = useState(null); // To track the hovered category
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 }); // Position for the dropdown
    const [isDropdownVisible, setIsDropdownVisible] = useState(false); // To manage dropdown visibility

    const categoryLoading = new Array(13).fill(null);

    const fetchCategoryProduct = async () => {
        setLoading(true);
        try {
            const response = await fetch(SummaryApi.categoryProduct.url);
            const dataResponse = await response.json();
            setCategoryProduct(Array.isArray(dataResponse.data) ? dataResponse.data : []);
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

    // Handle mouse leave from category or dropdown
    const handleMouseLeave = () => {
        // Wait a little to ensure the user can interact with the dropdown
        setTimeout(() => {
            if (!dropdownElementHovered && !categoryElementHovered) {
                setIsDropdownVisible(false);
                setHoveredCategory(null);
            }
        }, [100]);
    };

    let dropdownElementHovered = false;
    let categoryElementHovered = false;

    return (
        <div className="container mx-auto pt-5 pb-8 px-6">
            <div className="flex items-center gap-4 justify-between overflow-x-auto bg-white px-6 py-4 rounded-lg shadow-lg">
                {loading ? (
                    categoryLoading.map((_, index) => (
                        <div
                            className="h-16 w-16 md:w-20 md:h-20 rounded-full bg-slate-200 animate-pulse"
                            key={"categoryLoading" + index}
                        ></div>
                    ))
                ) : (
                    categoryProduct.map((product) => (
                        <div
                            key={product?.category || product?._id} // Use a unique key if possible
                            className="relative group"
                            onMouseEnter={(e) => handleMouseEnter(e, product?.category)}
                            onMouseLeave={() => {
                                categoryElementHovered = false;
                                // handleMouseLeave();
                            }}
                        >
                            <Link
                                to={"/product-category?category=" + product?.category}
                                className="cursor-pointer"
                            >
                                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full p-4 flex items-center justify-center">
                                    <img
                                        src={product?.productImage[0]}
                                        alt={product?.productName || "Product Image"}
                                        className="h-full object-scale-down hover:scale-125 transition-transform"
                                    />
                                </div>
                                <p className="text-center text-sm md:text-base capitalize mt-2">
                                    {product?.category}
                                </p>
                            </Link>
                        </div>
                    ))
                )}
            </div>

            {/* The dropdown, fixed to the position of the hovered category */}
            {isDropdownVisible && (
                <div
                    className="fixed z-50 bg-white shadow-lg p-4 rounded-lg w-48 border border-gray-300 overflow-y-auto max-h-64 mt-2"
                    style={{ top: dropdownPosition.top, left: dropdownPosition.left }}
                    onMouseEnter={() => { dropdownElementHovered = true; setIsDropdownVisible(true); }}
                    onMouseLeave={() => { dropdownElementHovered = false; handleMouseLeave(); }}
                >
                    {getSubcategories(hoveredCategory).length > 0 ? (
                        getSubcategories(hoveredCategory).map((subcategory) => (
                            <Link
                                key={subcategory.id}
                                to={"/product-category?" + "subcategory=" + subcategory?.value}
                                className="block px-4 py-2 text-sm hover:bg-gray-200"
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
