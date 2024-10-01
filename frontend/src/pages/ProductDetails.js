import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SummaryApi from '../common';
import { FaStar, FaStarHalf } from "react-icons/fa";
import displayINRCurrency from '../helpers/displayCurrency';
import VerticalCardProduct from '../components/VerticalCardProduct';
import CategroyWiseProductDisplay from '../components/CategoryWiseProductDisplay';
import addToCart from '../helpers/addToCart';
import Context from '../context/index';


const ProductDetails = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    soldBy: '',
    features: '',
    price: "",
    sellingPrice: "",
    ratings: { average: 4.5, count: 120 } // Assuming the average rating and count are included
  });
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const productImageListLoading = new Array(4).fill(null);
  const [activeImage, setActiveImage] = useState("");
  const { authToken } = useContext(Context); // Get the authToken from Context

  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0
  });
  const [zoomImage, setZoomImage] = useState(false);

  // const { fetchUserAddToCart } = useContext(Context);

  const navigate = useNavigate();

  const fetchProductDetails = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.productDetails.url, {
      method: SummaryApi.productDetails.method,
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        productId: params?.id
      })
    });
    setLoading(false);
    const dataResponse = await response.json();
    
    // Fetch persisted ratings
    const ratingsCount = getPersistedRatingsCount(params?.id);

    setData({
      ...dataResponse?.data,
      ratingsCount
    });
    setActiveImage(dataResponse?.data?.productImage[0]);
  };

  const getPersistedRatingsCount = (productId) => {
    const storedRatings = localStorage.getItem(`ratings_${productId}`);
    
    if (storedRatings) {
      // Return the stored ratings count if it exists
      return JSON.parse(storedRatings);
    } else {
      // If no rating is found, generate a random one and store it in localStorage
      const newRatingsCount = generateRandomRatings();
      localStorage.setItem(`ratings_${productId}`, JSON.stringify(newRatingsCount));
      return newRatingsCount;
    }
  };

  // Function to generate a random number of ratings between a range (e.g., 500 to 5000)
  const generateRandomRatings = () => {
    return Math.floor(Math.random() * (5000 - 500 + 1)) + 500; // Generates random number between 500 and 5000
  };

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top

    fetchProductDetails();
  }, [params]);

  const handleMouseEnterProduct = (imageURL) => {
    setActiveImage(imageURL);
  };

  const handleZoomImage = useCallback((e) => {
    setZoomImage(true);
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    setZoomImageCoordinate({
      x,
      y
    });
  }, [zoomImageCoordinate]);

  const handleLeaveImageZoom = () => {
    setZoomImage(false);
  };

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id,authToken);
    // fetchUserAddToCart(authToken);
  };

  const handleBuyProduct = async (e, id) => {
    await addToCart(e, id);
    // fetchUserAddToCart();
    navigate("/cart");
  };

  return (
    <div className='container mx-auto p-4'>
      <div className='min-h-[200px] flex flex-col lg:flex-row gap-4'>
        {/* product Image */}
        <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>
          <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2'>
            <img src={activeImage} className='h-full w-full object-scale-down mix-blend-multiply' onMouseMove={handleZoomImage} onMouseLeave={handleLeaveImageZoom} />
            {zoomImage && (
              <div className='hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0'>
                <div
                  className='w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-150'
                  style={{
                    background: `url(${activeImage})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}%`
                  }}
                >
                </div>
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
                    <img src={imgURL} className='w-full h-full object-scale-down mix-blend-multiply cursor-pointer' onMouseEnter={() => handleMouseEnterProduct(imgURL)} onClick={() => handleMouseEnterProduct(imgURL)} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
  
        {/* product details */}
        {loading ? (
          <div className='grid gap-1 w-full'>
            <p className='bg-slate-200 animate-pulse h-6 lg:h-8 w-full rounded-full inline-block'></p>
            <h2 className='text-2xl lg:text-4xl font-medium h-6 lg:h-8  bg-slate-200 animate-pulse w-full'></h2>
            <p className='capitalize text-slate-400 bg-slate-200 min-w-[100px] animate-pulse h-6 lg:h-8  w-full'></p>
            <div className='text-sky-600 bg-slate-200 h-6 lg:h-8  animate-pulse flex items-center gap-1 w-full'></div>
            <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1 h-6 lg:h-8  animate-pulse w-full'>
              <p className='text-sky-600 bg-slate-200 w-full'></p>
              <p className='text-slate-400 line-through bg-slate-200 w-full'></p>
            </div>
            <div className='flex items-center gap-3 my-2 w-full'>
              <button className='h-6 lg:h-8  bg-slate-200 rounded animate-pulse w-full'></button>
              <button className='h-6 lg:h-8  bg-slate-200 rounded animate-pulse w-full'></button>
            </div>
            <div className='w-full'>
              <p className='text-slate-600 font-medium my-1 h-6 lg:h-8   bg-slate-200 rounded animate-pulse w-full'></p>
              <p className=' bg-slate-200 rounded animate-pulse h-10 lg:h-12  w-full'></p>
            </div>
          </div>
        ) : (
          <div className='flex flex-col gap-1'>
            <p className='bg-sky-200 text-sky-600 px-2 rounded-full inline-block w-fit'>{data?.brandName}</p>
            <h2 className='text-2xl lg:text-4xl font-medium'>{data?.productName}</h2>
            <p className='capitalize text-slate-400'>{data?.category}</p>
            <div className="text-blue-600 flex items-center gap-1">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalf />
              {/* Display the persisted rating count */}
              <span className="ml-2">({data.ratingsCount})</span>
            </div>
            <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1'>
              <p className='text-green-600'>{displayINRCurrency(data.sellingPrice)}</p>
              <p className='text-slate-400 line-through'>{displayINRCurrency(data.price)}</p>
            </div>
            {data?.quantity > 0 ? (
              <button className='border-2 border-sky-600 rounded px-2 py-1 min-w-[80px] font-medium text-white bg-sky-600 hover:text-sky-600 hover:bg-white' onClick={(e) => handleAddToCart(e, data?._id)}>Add To Cart</button>
            ) : (
              <span className="text-red-600 text-2xl font-bold">
                Out of Stock
              </span>
            )}
            <div className='flex flex-col mt-4'>
              <p className='text-slate-600 font-medium my-1'>Description:</p>
              <p>{data?.description}</p>
              <p className='text-slate-600 font-medium my-1'>Sold By:</p>
              <p>{data?.soldBy}</p>
              <p className='text-slate-600 font-medium my-1'>Features:</p>
              <p>{data?.features}</p>
            </div>
          </div>
        )}
      </div>
  
      {data.category && (
        <CategroyWiseProductDisplay category={data?.category} heading={"Recommended Product"} />
      )}
    </div>
  );
  
};

export default ProductDetails;