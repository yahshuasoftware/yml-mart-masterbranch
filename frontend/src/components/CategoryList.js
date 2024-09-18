import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { Link } from 'react-router-dom';
import productCategory from '../helpers/productCategory'; // Assuming productCategory is an array with subcategories for each category

const CategoryList = () => {
    const [categoryProduct, setCategoryProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hoveredCategory, setHoveredCategory] = useState(null); // To track the hovered category

    const categoryLoading = new Array(13).fill(null);

    const fetchCategoryProduct = async () => {
        setLoading(true);
        try {
            const response = await fetch(SummaryApi.categoryProduct.url);
            const dataResponse = await response.json();
            setCategoryProduct(Array.isArray(dataResponse.data) ? dataResponse.data : []);
            console.log(categoryProduct)
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

    return (
        <div className= " container mx-auto pt-5 pb-8  px-6">
            <div className="flex items-center gap-4 justify-between overflow-scroll scrollbar-none">
                {loading ? (
                    categoryLoading.map((_, index) => (
                        <div
                            className="h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse"
                            key={"categoryLoading" + index}
                        ></div>
                    ))
                ) : (
                    categoryProduct.map((product) => (
                        <div
                            key={product?.category || product?._id} // Use a unique key if possible
                            className="relative group"
                            onMouseEnter={() => setHoveredCategory(product?.category)}
                            onMouseLeave={() => setHoveredCategory(null)}
                        >
                            <Link
                                to={"/product-category?category=" + product?.category}
                                className="cursor-pointer"
                            >
                                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center">
                                    <img
                                        src={product?.productImage[0]}
                                        alt={product?.productName || "Product Image"}
                                        className="h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all"
                                    />
                                </div>
                                <p className="text-center text-sm md:text-base capitalize mt-2">
                                    {product?.category}
                                </p>
                            </Link>

                            {/* Show subcategories on hover */}
                            <div className={` mt-2 bg-white shadow-lg p-2 rounded w-48 border border-gray-300 z-50 ${hoveredCategory === product?.category ? 'block' : 'hidden'}`}>
                                {getSubcategories(product?.category).length > 0 ? (
                                    getSubcategories(product?.category).map((subcategory) => (
                                        <Link
                                            key={subcategory.id}
                                            //http://localhost:3000/product-category?subcategory=furniture
                                            to={"/product-category?"+ "subcategory="+subcategory?.value}
                                            className="block px-4 py-2 text-sm hover:bg-gray-200 whitespace-nowrap"
                                        >
                                            {subcategory.label}
                                        </Link>
                                    ))
                                ) : (
                                    <p className="text-center text-sm text-gray-500">No subcategories</p>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default CategoryList;
