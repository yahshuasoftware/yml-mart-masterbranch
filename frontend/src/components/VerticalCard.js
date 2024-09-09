import React, { useContext } from 'react';
import scrollTop from '../helpers/scrollTop';
import displayINRCurrency from '../helpers/displayCurrency';
import Context from '../context';
import addToCart from '../helpers/addToCart';
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';

const VerticalCard = ({ loading, data = [] }) => {
    const loadingList = new Array(13).fill(null);
    const { fetchUserAddToCart } = useContext(Context);

    const handleAddToCart = async (e, id) => {
        await addToCart(e, id);
        fetchUserAddToCart();
    };

    return (
        <div className='grid grid-cols-[repeat(auto-fit,minmax(260px,200px))] justify-center md:justify-between md:gap-4 overflow-x-scroll scrollbar-none transition-all pr-3'>
            {
                loading ? (
                    loadingList.map((product, index) => {
                        return (
                            <div key={index} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow'>
                                <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse'>
                                </div>
                                <div className='p-4 grid gap-3'>
                                    <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-slate-200'></h2>
                                    <p className='capitalize text-slate-500 p-1 animate-pulse rounded-full bg-slate-200 py-2'></p>
                                    <div className='flex gap-3'>
                                        <p className='text-red-600 font-medium p-1 animate-pulse rounded-full bg-slate-200 w-full py-2'></p>
                                        <p className='text-slate-500 line-through p-1 animate-pulse rounded-full bg-slate-200 w-full py-2'></p>
                                    </div>
                                    <button className='text-sm text-white px-3 rounded-full bg-slate-200 py-2 animate-pulse'></button>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    data.map((product, index) => {
                        return (
                            <Link
                                key={index}
                                to={`/product/${product?._id}`}
                                className="bg-white rounded-sm shadow hover:shadow-lg transition-shadow"
                            >
                                <div className="bg-slate-200 h-40 p-4 flex justify-center items-center">
                                <img
                                    src={product.productImage[0]}
                                    className="object-contain h-full w-full hover:scale-110 transition-transform"
                                    alt={product?.productName}
                                />
                                </div>
                                <div className="p-4 space-y-2">
                                <h3 className="text-sm md:text-base font-medium text-black truncate">
                                    {product?.productName}
                                </h3>
                                <div className="flex items-center justify-between">
                                    <p className="text-red-600 text-sm font-medium">
                                    {displayINRCurrency(product?.sellingPrice)}
                                    </p>
                                    <p className="text-slate-500 text-xs line-through">
                                    {displayINRCurrency(product?.price)}
                                    </p>
                                </div>
                                <div className="flex justify-center pt-2">
                                    {product?.quantity > 0 ? (
                                    <button
                                        className="text-sm text-black border border-black px-3 py-1 rounded-full transition-colors duration-300 hover:text-green-600 hover:border-green-600"
                                        onClick={(e) => handleAddToCart(e, product?._id)}
                                    >
                                        Add to Cart
                                    </button>
                                    ) : (
                                    <span className="text-red-600 text-lg font-bold ">
                                        Out of Stock
                                    </span>
                                    )}
                                </div>
                                </div>
                            </Link>
                        );
                    })
                )
            }
        </div>
    );
};

export default VerticalCard;
