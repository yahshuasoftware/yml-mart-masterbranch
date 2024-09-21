// Frontend/components/UploadBannerForm.js

import React, { useState } from 'react';
import uploadImage from '../helpers/uploadImage';
import SummaryApi from '../common';

const UploadBannerForm = ({ authToken }) => {
    const [image, setImage] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState(null);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
        setUploadedImageUrl(null); // Reset uploaded image URL if a new image is selected
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!image) {
            alert('Please select an image');
            return;
        }

        try {
            const uploadedImage = await uploadImage(image);

            // Assuming you have access to the user's ID from context or props
            const userId = "66d42c2761d50fc1400a33ec";  // Replace with actual user ID

            const response = await fetch(SummaryApi.uploadBanner.url, {
                method: SummaryApi.uploadBanner.method,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`, 
                },
                body: JSON.stringify({ userId, imageUrl: uploadedImage.secure_url }),
            });

            if (response.ok) {
                setUploadedImageUrl(uploadedImage.secure_url); // Update state with uploaded image URL
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
        <div className="flex flex-col items-center justify-center space-y-6 p-4">
            <form 
                onSubmit={handleSubmit} 
                className="flex flex-col items-center space-y-4 p-4 border border-gray-300 rounded-lg shadow-md bg-white"
            >
                <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageChange} 
                    className="block w-full text-sm text-gray-500 
                               file:mr-4 file:py-2 file:px-4 
                               file:rounded-full file:border-0 
                               file:text-sm file:font-semibold 
                               file:bg-blue-50 file:text-blue-700 
                               hover:file:bg-blue-100"
                />
                <button 
                    type="submit" 
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Upload Banner
                </button>
            </form>
            {uploadedImageUrl && (
                <div className="mt-6">
                    <img 
                        src={uploadedImageUrl} 
                        alt="Uploaded Banner" 
                        className="w-full max-w-lg rounded-lg shadow-lg"
                    />
                </div>
            )}
        </div>
    );
};

export default UploadBannerForm;
