import React from 'react';

const AdminBannerCard = ({ data }) => {
  return (
    <div className='bg-white p-4 rounded'>
      <div className='w-40'>
        <div className='w-32 h-32 flex justify-center items-center'>
          {/* Assuming data.imageUrl is a string */}
          <img src={data?.imageUrl} className='mx-auto object-fill h-full' alt="Banner" />
        </div>
      </div>
    </div>
  );
};

export default AdminBannerCard;
