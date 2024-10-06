import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import SummaryApi from '../common'
import AdminProductCard from '../components/AdminProductCard'
import Loader from '../components/Loader'

const AllProducts = () => {
  const [openUploadProduct,setOpenUploadProduct] = useState(false)
  const [allProduct,setAllProduct] = useState([])
  const [loading, setLoading] = useState(true); // State for loading


  const fetchAllProduct = async() =>{
    setLoading(true); // Set loading to true when fetching starts
    try {
      const response = await fetch(SummaryApi.allProduct.url)
    const dataResponse = await response.json()

    console.log("product data",dataResponse)

    setAllProduct(dataResponse?.data || [])
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false); // Set loading to false when fetching ends
    }
    
  }

  useEffect(()=>{
    fetchAllProduct()
  },[])
  
  return (
    <div>
        <div className='bg-white py-2 px-4 flex justify-between items-center'>
            <h2 className='font-bold text-lg'>All Product</h2>
            <button  className='border-2 border-sky-600 text-sky-600 hover:bg-sky-600 hover:text-white transition-all py-1 px-3 rounded-full ' onClick={()=>setOpenUploadProduct(true)}>Upload Product</button>
        </div>

        {/**all product */}
        <div className='flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll'>
          {loading ? (
        <div className='flex justify-center items-center w-full h-full'>
          <Loader></Loader>
        </div>
      ) : (
        allProduct.map((product, index) => (
          <AdminProductCard data={product} key={index + "allProduct"} fetchdata={fetchAllProduct} />
        ))
      )}
        </div>





        {/**upload prouct component */}
        {
          openUploadProduct && (
            <UploadProduct onClose={()=>setOpenUploadProduct(false)} fetchData={fetchAllProduct}/>
          )
        }
      

    </div>
  )
}

export default AllProducts