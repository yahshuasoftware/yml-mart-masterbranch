import React, { useCallback, useContext, useEffect, useState } from 'react'
import  { useNavigate, useParams } from 'react-router-dom'
import SummaryApi from '../common'
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import displayINRCurrency from '../helpers/displayCurrency';
import VerticalCardProduct from '../components/VerticalCardProduct';
import CategroyWiseProductDisplay from '../components/CategoryWiseProductDisplay';
import addToCart from '../helpers/addToCart';
import Context from '../context';

const ProductDetails = () => {
  const [data,setData] = useState({
    productName : "",
    brandName : "",
    category : "",
    productImage : [],
    description : "",
    price : "",
    sellingPrice : ""
  })
  const params = useParams()
  const [loading,setLoading] = useState(true)
  const productImageListLoading = new Array(4).fill(null)
  const [activeImage,setActiveImage] = useState("")

  const [zoomImageCoordinate,setZoomImageCoordinate] = useState({
    x : 0,
    y : 0
  })
  const [zoomImage,setZoomImage] = useState(false)

  const { fetchUserAddToCart } = useContext(Context)

  const navigate = useNavigate()

  const fetchProductDetails = async()=>{
    setLoading(true)
    const response = await fetch(SummaryApi.productDetails.url,{
      method : SummaryApi.productDetails.method,
      headers : {
        "content-type" : "application/json"
      },
      body : JSON.stringify({
        productId : params?.id
      })
    })
    setLoading(false)
    const dataReponse = await response.json()

    setData(dataReponse?.data)
    setActiveImage(dataReponse?.data?.productImage[0])

  }

  console.log("data",data)

  useEffect(()=>{
    fetchProductDetails()
  },[params])

  const handleMouseEnterProduct = (imageURL)=>{
    setActiveImage(imageURL)
  }

  const handleZoomImage = useCallback((e) =>{
    setZoomImage(true)
    const { left , top, width , height } = e.target.getBoundingClientRect()
    console.log("coordinate", left, top , width , height)

    const x = (e.clientX - left) / width
    const y = (e.clientY - top) / height

    setZoomImageCoordinate({
      x,
      y
    })
  },[zoomImageCoordinate])

  const handleLeaveImageZoom = ()=>{
    setZoomImage(false)
  }


  const handleAddToCart = async(e,id) =>{
    await addToCart(e,id)
    fetchUserAddToCart()
  }

  const handleBuyProduct = async(e,id)=>{
    await addToCart(e,id)
    fetchUserAddToCart()
    navigate("/cart")

  }

  return (
    <div className='container mx-auto p-4'>
  
      <div className='min-h-[200px] flex flex-col lg:flex-row gap-4'>
          {/***product Image */}
          <div className='flex flex-col items-center lg:flex-row-reverse gap-4'>
            <div className='h-64 w-64 sm:h-[250px] sm:w-[250px] md:h-72 md:w-72 lg:h-96 lg:w-96 bg-slate-200 relative p-2 mx-auto'>
              <img
                src={activeImage}
                className='h-full w-full object-scale-down mix-blend-multiply'
                onMouseMove={handleZoomImage}
                onMouseLeave={handleLeaveImageZoom}
              />
  
              {/**product zoom */}
              {zoomImage && (
                <div className='hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0'>
                  <div
                    className='w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-150'
                    style={{
                      background: `url(${activeImage})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}%`,
                    }}
                  ></div>
                </div>
              )}
            </div>
  
            <div className='h-full'>
              {loading ? (
                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                  {productImageListLoading.map((el, index) => (
                    <div className='h-20 w-20 bg-slate-200 rounded animate-pulse' key={"loadingImage" + index}></div>
                  ))}
                </div>
              ) : (
                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                  {data?.productImage?.map((imgURL, index) => (
                    <div className='h-20 w-20 bg-slate-200 rounded p-1' key={imgURL}>
                      <img
                        src={imgURL}
                        className='w-full h-full object-scale-down mix-blend-multiply cursor-pointer'
                        onMouseEnter={() => handleMouseEnterProduct(imgURL)}
                        onClick={() => handleMouseEnterProduct(imgURL)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
  
          {/***product details */}
          {loading ? (
            <div className='grid gap-1 w-full'>
              {/* Loading skeleton */}
            </div>
          ) : (
            <div className='flex flex-col gap-1'>
              <p className='bg-sky-200 text-sky-600 px-2 rounded-full inline-block w-fit text-sm md:text-base lg:text-lg'>{data?.brandName}</p>
              <h2 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium'>{data?.productName}</h2>
              <p className='capitalize text-slate-400 text-sm md:text-base'>{data?.category}</p>
  
              <div className='text-sky-600 flex items-center gap-1'>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalf />
              </div>
  
              <div className='flex items-center gap-2 text-xl md:text-2xl lg:text-3xl font-medium my-1'>
                <p className='text-green-600'>{displayINRCurrency(data.sellingPrice)}</p>
                <p className='text-slate-400 line-through'>{displayINRCurrency(data.price)}</p>
              </div>
  
              {data?.quantity > 0 ? (
                <button className='border-2 border-sky-600 rounded px-3 py-1 min-w-[120px] font-medium text-white bg-sky-600 hover:text-sky-600 hover:bg-white'>
                  Add To Cart
                </button>
              ) : (
                <span className="text-red-600 text-xl sm:text-2xl font-bold">Out of Stock</span>
              )}
  
              <div>
                <p className='text-slate-600 font-medium my-1'>Description: </p>
                <p className='text-sm sm:text-base md:text-lg'>{data?.description}</p>
              </div>
            </div>
          )}
      </div>
  
      {data.category && <CategroyWiseProductDisplay category={data?.category} heading={"Recommended Product"} />}
    </div>
  )
  
}

export default ProductDetails