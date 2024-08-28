import React, { useEffect, useState } from 'react';
import UploadBanner from '../components/UploadBanner';
import SummaryApi from '../common';
import AdminBannerCard from '../components/AdminBannerCard';

const AllBanners = () => {
    const [openUploadProduct, setOpenUploadProduct] = useState(false);
    const [allProduct, setAllProduct] = useState([]);

    const fetchAllProduct = async () => {
        const response = await fetch(SummaryApi.allBanner.url);
        const dataResponse = await response.json();

        console.log("banner data", dataResponse);

        setAllProduct(dataResponse?.data || []);
    };

    useEffect(() => {
        fetchAllProduct();
    }, []);

    return (
        <div>
            <div className='bg-white py-2 px-4 flex justify-between items-center'>
                <h2 className='font-bold text-lg'>All Banners</h2>
                <button className='border-2 border-sky-600 text-sky-600 hover:bg-sky-600 hover:text-white transition-all py-1 px-3 rounded-full' onClick={() => setOpenUploadProduct(true)}>Upload Banner</button>
            </div>

            <div className='flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll'>
                {allProduct.map((banner, index) => (
                    <AdminBannerCard data={banner} key={index} fetchdata={fetchAllProduct} />
                ))}
            </div>

            {openUploadProduct && (
                <UploadBanner onClose={() => setOpenUploadProduct(false)} fetchData={fetchAllProduct} />
            )}
        </div>
    );
};

export default AllBanners;
