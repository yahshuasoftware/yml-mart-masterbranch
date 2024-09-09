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
          <div key={index} className="bg-white rounded-sm shadow">
            <div className="bg-slate-200 h-40 p-4 flex justify-center items-center animate-pulse"></div>
            <div className="p-4 space-y-2">
              <div className="h-4 bg-slate-200 rounded-full animate-pulse"></div>
              <div className="h-4 bg-slate-200 rounded-full animate-pulse"></div>
              <div className="h-4 bg-slate-200 rounded-full animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.map((product, index) => (
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
        ))}
      </div>
    )}
  </div>
  
  )
}

export default CategroyWiseProductDisplay