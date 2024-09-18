import React, { useContext, useEffect, useRef, useState } from 'react';
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct';
import displayINRCurrency from '../helpers/displayCurrency';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import addToCart from '../helpers/addToCart';
import Context from '../context';

const VerticalCardProduct = ({ category, heading }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [scrollPosition, setScrollPosition] = useState(0);
    const loadingList = new Array(13).fill(null);

    const scrollElement = useRef();

    const { fetchUserAddToCart } = useContext(Context);

    const handleAddToCart = async (e, id) => {
        e.stopPropagation();  // Stop event propagation to prevent Link navigation
        await addToCart(e, id);
        if (fetchUserAddToCart) {
          fetchUserAddToCart(); // Call fetchUserAddToCart after adding the product to the cart
        } else {
          console.error('fetchUserAddToCart is not available in context');
        }
      };

    const fetchData = async () => {
        setLoading(true);
        try {
            const categoryProduct = await fetchCategoryWiseProduct(category);
            setData(Array.isArray(categoryProduct?.data) ? categoryProduct.data : []);
        } catch (error) {
            console.error('Failed to fetch category-wise products:', error);
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [category]);

    // Handle right scroll
    const scrollRight = () => {
        const scrollAmount = 300;
        scrollElement.current.scrollLeft += scrollAmount;
        setScrollPosition(scrollElement.current.scrollLeft + scrollAmount); // Update the scroll position
    };

    // Handle left scroll
    const scrollLeft = () => {
        const scrollAmount = 300;
        scrollElement.current.scrollLeft -= scrollAmount;
        setScrollPosition(scrollElement.current.scrollLeft - scrollAmount); // Update the scroll position
    };

    return (
        <div className='container mx-auto px-10 my-6 relative'>
            <h2 className='text-2xl font-semibold py-4'>{heading}</h2>

            {/* Scroll buttons */}
            <button
                className='bg-white shadow-md rounded-full p-2 absolute left-2 top-1/2 transform -translate-y-1/2 text-lg md:flex justify-center items-center z-10'
                onClick={scrollLeft}
            >
                <FaAngleLeft />
            </button>
            <button
                className='bg-white shadow-md rounded-full p-2 absolute right-2 top-1/2 transform -translate-y-1/2 text-lg md:flex justify-center items-center z-10'
                onClick={scrollRight}
            >
                <FaAngleRight />
            </button>

            {/* Products Slider */}
            <div
                ref={scrollElement}
                className='flex gap-4 overflow-x-auto scrollbar-none'
                style={{
                    scrollBehavior: 'smooth', // Ensure smooth scrolling behavior
                }}
            >
                {loading ? (
    loadingList.map((_, index) => (
        <div key={index} className="bg-white rounded-lg shadow-lg">
            <div className="bg-slate-200 h-48 p-4 flex justify-center items-center animate-pulse"></div>
            <div className="p-4 space-y-3">
                <div className="h-4 bg-slate-200 rounded-full animate-pulse"></div>
                <div className="h-4 bg-slate-200 rounded-full animate-pulse"></div>
                <div className="h-4 bg-slate-200 rounded-full animate-pulse"></div>
            </div>
        </div>
    ))
) : (
    data.map((product, index) => (
        <Link
            key={index}
            to={`/product/${product?._id}`}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            style={{ minWidth: '220px', maxWidth: '220px' }} // Consistent width for each product
        >
            <div className="bg-slate-100 h-48 p-4 flex justify-center items-center">
                <img
                    src={product.productImage[0]}
                    className="object-contain h-full w-full transition-transform duration-300 hover:scale-105"
                    alt={product?.productName}
                />
            </div>
            <div className="p-4 space-y-2">
                <h3 className="text-sm md:text-base font-semibold text-gray-800 truncate">
                    {product?.productName}
                </h3>
                <div className="flex items-center justify-between">
                    <p className="text-green-700 text-sm font-semibold">
                        {displayINRCurrency(product?.sellingPrice)}
                    </p>
                    <p className="text-slate-400 text-xs line-through">
                        {displayINRCurrency(product?.price)}
                    </p>
                </div>
                <div className="flex justify-center pt-2">
                    {product?.quantity > 0 ? (
                        <button
                            className="text-sm text-white bg-green-600 border border-green-600 px-4 py-2 rounded-full transition-colors duration-300 hover:bg-white hover:text-green-600"
                            onClick={(e) => handleAddToCart(e, product?._id)}
                        >
                            Add to Cart
                        </button>
                    ) : (
                        <span className="text-sm text-red-500 bg-red-100 px-4 py-2 rounded-full border border-red-500 font-semibold">
                            Out of Stock
                        </span>
                    )}
                </div>
            </div>
        </Link>
    ))
)}

            </div>
        </div>
    );
};

export default VerticalCardProduct;