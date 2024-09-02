import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/effect-coverflow';
import { Pagination, Autoplay } from 'swiper/modules';
import SummaryApi from '../common';

const BannerProduct = () => {
    const [bannerImages, setBannerImages] = useState([]);

    useEffect(() => {
        fetch(SummaryApi.allAdBanner.url)
            .then(response => response.json())
            .then(data => {
                if (data.success && data.data) {
                    const bannersArray = Object.values(data.data);
                    setBannerImages(bannersArray);
                } else {
                    console.error('Unexpected data format:', data);
                }
            })
            .catch(error => console.error('Error fetching banner images:', error));
    }, []);

    return (
        <div className="container mx-auto px-4 rounded relative">
            <div className="h-56 md:h-72 w-full relative" style={{ height: '250px' }}>
                
                {/* Desktop and tablet version */}
                <div className="hidden md:block h-full w-full relative mt-10">
                    <Swiper
                        slidesPerView={1}
                        loop={true}
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 3000, disableOnInteraction: false }} // Adjust delay as needed
                        modules={[Pagination, Autoplay]}
                        className="h-full"
                        effect="coverflow"
                    >
                        {bannerImages.map((banner, index) => (
                            <SwiperSlide key={banner._id || index} className="flex justify-center items-center relative">
                                <div className="w-full h-full relative">
                                    <img src={banner.imageUrl} className="w-full h-full object-cover rounded-md" alt={`Banner ${index}`} />
                                    <span className="absolute top-2 right-2 bg-white bg-opacity-50 text-black text-xs px-2 py-1 rounded">
                                    Ad
                                    </span>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* Mobile version */}
                <div className="md:hidden h-full w-full relative">
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={10}
                        loop={true}
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 3000, disableOnInteraction: false }} // Adjust delay as needed
                        modules={[Pagination, Autoplay]}
                        className="h-full"
                    >
                        {bannerImages.map((banner, index) => (
                            <SwiperSlide key={banner._id || index} className="flex justify-center items-center relative">
                                <div className="w-full h-full relative">
                                    <img src={banner.imageUrl} className="w-full h-full object-cover rounded-md" alt={`Banner ${index}`} />
                                    <span className="absolute top-2 right-2 bg-black text-white text-xs px-2 py-1 rounded">
                                        Ad
                                    </span>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default BannerProduct;
