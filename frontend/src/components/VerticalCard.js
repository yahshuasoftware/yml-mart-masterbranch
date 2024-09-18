import React, { useContext } from 'react';
import scrollTop from '../helpers/scrollTop';
import displayINRCurrency from '../helpers/displayCurrency';
import Context from '../context';
import addToCart from '../helpers/addToCart';
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';

const VerticalCard = ({ loading, data = [] }) => {
    const loadingList = new Array(13).fill(null);
    // const { fetchUserAddToCart } = useContext(Context);

    const handleAddToCart = async (e, id) => {
        await addToCart(e, id);
        // fetchUserAddToCart();
    };

    return (
<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center md:justify-between overflow-x-auto scrollbar-none transition-all pr-4'>
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
    );
};

export default VerticalCard;