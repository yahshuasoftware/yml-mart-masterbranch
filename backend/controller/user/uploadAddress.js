const User = require('../../models/userModel'); // Adjust the path as needed
const axios = require('axios'); // For making requests to Google Maps API

// const HINJEWADI_COORDINATES = { lat: 18.597499, lng: 73.705744 }; // Hinjewadi coordinates

// // Google Maps API key (ensure it's correctly configured)
// const GOOGLE_MAPS_API_KEY = 'AIzaSyBD_WqcrG7t3JJucVDzQqZB0wXUkncGosw';

// Function to geocode the user's postal code (get lat/lng)
// async function geocodeAddress(zipCode) {
//     const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
//         params: {
//             address: zipCode,
//             key: GOOGLE_MAPS_API_KEY
//         }
//     });

//     const geocodeData = response.data;
//     if (geocodeData.status === 'OK') {
//         const location = geocodeData.results[0].geometry.location;
//         return location; // { lat: ..., lng: ... }
//     } else {
//         throw new Error('Error fetching geocode for the given postal code.');
//     }
// }

// // Function to calculate the distance using Google Distance Matrix API
// async function getDistanceFromHinjewadi(lat, lng) {
//     const response = await axios.get('https://maps.googleapis.com/maps/api/distancematrix/json', {
//         params: {
//             origins: `${HINJEWADI_COORDINATES.lat},${HINJEWADI_COORDINATES.lng}`,
//             destinations: `${lat},${lng}`, // Destination lat/lng from geocode
//             key: GOOGLE_MAPS_API_KEY
//         }
//     });

//     const distanceData = response.data;
//     if (distanceData.status === 'OK') {
//         const element = distanceData.rows[0].elements[0];
//         if (element.status === 'OK') {
//             return element.distance.value / 1000; // Distance in kilometers
//         } else {
//             throw new Error('Invalid address.');
//         }
//     } else {
//         throw new Error('Error fetching distance from Google API.');
//     }
// }

async function uploadAddressController(req, res) {
    try {
        const userId = req.userId; // Assuming userId is available in req.userId
        const { address } = req.body; // Expecting address object from request body

        if (!address || !address.name || !address.mobileNo || !address.street || !address.city || !address.state || !address.zip) {
            return res.status(400).json({
                message: 'Incomplete address data provided',
                error: true,
                success: false
            });
        }

        // // Ensure address is from Pune
        // if (address.city.toLowerCase() !== 'pune') {
        //     return res.status(400).json({
        //         message: 'Please enter an address within Pune city.',
        //         error: true,
        //         success: false
        //     });
        // }

        // // Geocode the user's postal code to get lat/lng
        // const { lat, lng } = await geocodeAddress(address.zip);

        // // Calculate distance from Hinjewadi to user's lat/lng
        // const distance = await getDistanceFromHinjewadi(lat, lng);

        // // Check distance and assign delivery fee
        // let deliveryFee = 0;
        // if (distance > 10) {
        //     deliveryFee = 100; // 100 INR if distance is more than 10km
        // }

        // // Add delivery fee to address
        // address.deliveryCharge = deliveryFee;

        // Save the updated address to the user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
                error: true,
                success: false
            });
        }

        // user.address.unshift(address);
        const updatedUser = await user.save();

        res.json({
            message: 'Address updated successfully!',
            data: updatedUser,
            success: true,
            error: false,
            deliveryFee: deliveryFee // Pass delivery fee back in the response
        });

    } catch (err) {
        console.error('Error updating address:', err);
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

module.exports = uploadAddressController;
