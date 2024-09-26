import React, { useState,useContext } from 'react';
import uploadImage from '../helpers/uploadImage';
import SummaryApi from '../common';
import { useUser } from '../context/userContext'; // Import UserContext to get user details
import ROLE from '../common/role'; // Import roles
import Context from "../context/index";



const UploadBannerForm = () => {
  const { user } = useUser(); // Get user details from context
  const [image, setImage] = useState(null);
  const { authToken } = useContext(Context); 
 // Get the authToken from Context


  const handleImageChange = (e) => {
    
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    if (!image) {
      alert('Please select an image');
      return;
    }
    
    if (!user || (user.role !== ROLE.ADMIN && user.role !== ROLE.SUPER_ADMIN)) {
      return <p>You do not have permission to upload banners.</p>;
    }

    try {
      const uploadedImage = await uploadImage(image);
      

      const response = await fetch(SummaryApi.uploadAdBanner.url, {
        method: SummaryApi.uploadAdBanner.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({ imageUrl: uploadedImage.secure_url }),
      });

      if (response.ok) {
        alert('Banner uploaded successfully!');
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Error uploading banner');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error uploading image');
    }
  };

  // Only allow users with ADMIN or SUPER_ADMIN roles to see the form

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button type="submit">Upload Banner</button>
    </form>
  );
};

export default UploadBannerForm;
