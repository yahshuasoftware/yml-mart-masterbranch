import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayINRCurrency from '../helpers/displayCurrency'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addToCart'
import Context from '../context'
import scrollTop from '../helpers/scrollTop'

const CategroyWiseProductDisplay = ({category, heading}) => {
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(true)
    const loadingList = new Array(13).fill(null)

    const { fetchUserAddToCart } = useContext(Context)

    const handleAddToCart = async(e,id)=>{
       await addToCart(e,id)
       fetchUserAddToCart()
    }




    const fetchData = async() =>{
        setLoading(true)
        const categoryProduct = await fetchCategoryWiseProduct(category)
        setLoading(false)

        console.log("horizontal data",categoryProduct.data)
        setData(categoryProduct?.data)
    }

    useEffect(()=>{
        fetchData()
    },[])




  return (
    <div className="container mx-auto px-4 my-6 relative">
    <h2 className="text-2xl font-semibold py-4">{heading}</h2>
  
    {loading ? (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {loadingList.map((_, index) => (
      <div key={index} className="bg-white rounded-lg shadow-lg">
        <div className="bg-slate-200 h-48 p-4 flex justify-center items-center animate-pulse"></div>
        <div className="p-4 space-y-3">
          <div className="h-4 bg-slate-200 rounded-full animate-pulse"></div>
          <div className="h-4 bg-slate-200 rounded-full animate-pulse"></div>
          <div className="h-4 bg-slate-200 rounded-full animate-pulse"></div>
        </div>
      </div>
    ))}
  </div>
) : (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
    {data.map((product, index) => (
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
    ))}
  </div>
)}


                
           <div className='grid grid-cols-[repeat(auto-fit,minmax(300px,320px))] justify-between md:gap-6 overflow-x-scroll scrollbar-none transition-all'>
           {

                loading ? (
                    loadingList.map((product,index)=>{
                        return(
                            <div className='w-full min-w-[280px]  md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow '>
                                <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse'>
                                </div>
                                <div className='p-4 grid gap-3'>
                                    <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-slate-200'></h2>
                                    <p className='capitalize text-slate-500 p-1 animate-pulse rounded-full bg-slate-200  py-2'></p>
                                    <div className='flex gap-3'>
                                        <p className='text-red-600 font-medium p-1 animate-pulse rounded-full bg-slate-200 w-full  py-2'></p>
                                        <p className='text-slate-500 line-through p-1 animate-pulse rounded-full bg-slate-200 w-full  py-2'></p>
                                    </div>
                                    <button className='text-sm  text-white px-3  rounded-full bg-slate-200  py-2 animate-pulse'></button>
                                </div>
                            </div>
                        )
                    })
                ) : (
                    data.map((product,index)=>{
                        return(
                            <Link to={"/product/"+product?._id} className='w-full min-w-[280px]  md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow ' onClick={scrollTop}>
                                <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center'>
                                    <img src={product.productImage[0]} className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply'/>
                                </div>
                                <div className='p-4 grid gap-3'>
                                    <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                                    <p className='capitalize text-slate-500'>{product?.category}</p>
                                    <div className='flex gap-3'>
                                        <p className='text-red-600 font-medium'>{ displayINRCurrency(product?.sellingPrice) }</p>
                                        <p className='text-slate-500 line-through'>{ displayINRCurrency(product?.price)  }</p>
                                    </div>
                                    <button className='text-sm bg-green-600 hover:bg-green-700 text-white px-3 py-0.5 rounded-full'>
                                    Buy Now
                                </button>
                                    <button className='text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full' onClick={(e)=>handleAddToCart(e,product?._id)}>Add to Cart</button>
                                </div>
                            </Link>
                        )
                    })
                )   
            }
           </div>
            

    </div>
  )
}

export default CategroyWiseProductDisplay