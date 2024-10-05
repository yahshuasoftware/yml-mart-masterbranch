// Frontend/components/UploadBannerForm.js

import React, { useState } from 'react';
import uploadImage from '../helpers/uploadImage';
import SummaryApi from '../common';
import { useDispatch, useSelector } from "react-redux";
import { useUser } from '../context/userContext'; // Import UserContext to get user details



    
const UploadBannerForm = ({authToken }) => { // Assuming userId is passed as a prop
    const [image, setImage] = useState(null);
    const { user } = useUser(); // Get user details from context
    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    
    
const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
        alert('Please select an image');
        return;
    }

    try {
        const uploadedImage = await uploadImage(image);

        // Assuming you have access to the user's ID from context or props  // Replace with actual user ID
        const response = await fetch(SummaryApi.uploadAdBanner.url,{
            method : SummaryApi.uploadAdBanner.method,
            credentials : 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`, 
            },
            body: JSON.stringify({
                userId : user._id,
                imageUrl: uploadedImage.secure_url
             }),
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



    return (
        <form onSubmit={handleSubmit}>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <button type="submit">Upload Banner</button>
        </form>
    );
};

export default UploadBannerForm;
