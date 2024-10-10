import React from 'react';
import { Link } from 'react-router-dom'; // Ensure you have react-router-dom installed
import banner from '../assest/offerbanner.png'; // Update the path if needed

// Banner Component
const Banner = () => {
  return (
    <div className="relative mx-auto mt-10 rounded-lg w-11/12 max-w-screen-xl overflow-hidden">
      {/* Banner Image */}
      <img 
        src={banner} 
        alt="Banner" 
        className="w-full h-auto rounded-lg" // Ensures the image fits and retains rounded corners
      />
    </div>
  );
};

// Card Component (each card is different)
const Card = ({ title, offer, link, imgSrc }) => {
  return (
    <Link to={link} className="bg-yellow-300 p-4 rounded-lg text-center shadow-lg transition-transform transform hover:scale-105">
      {/* Placeholder for Image with shadow */}
      <div className="bg-gray-300 h-40 w-full mb-4 rounded-lg overflow-hidden">
        <img src={imgSrc} alt={title} className="w-full h-full object-cover" />
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm mt-2">{offer}</p>
    </Link>
  );
};

// Main Component
const BannerPage = () => {
  return (
    <div className="flex flex-col items-center">
      {/* Banner */}
      <Banner />

      {/* Minimal Space between Banner and Cards */}
      <div className="py-4"></div>

      {/* Cards Section */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mx-auto max-w-screen-xl">
        {/* Each card with unique content */}
        <Card title="Kitchen & Dining" offer="Up to 70% Off" link="/kitchen-and-dining" imgSrc="/path/to/your/kitchen-dining-image.jpg" />
        <Card title="Home Furnishings & Decor" offer="From ₹99" link="/home-furnishings" imgSrc="/path/to/your/home-furnishings-image.jpg" />
        <Card title="Top groceries Items" offer="From ₹7,199" link="/realme-narzo" imgSrc="/path/to/your/realme-narzo-image.jpg" />
        <Card title="Top Electronics" offer="Up to 60% Off" link="/cooking-essentials" imgSrc="/path/to/your/cooking-essentials-image.jpg" />
        <Card title="Latest phones" offer="From ₹6,299" link="/poco-smartphones" imgSrc="/path/to/your/poco-smartphones-image.jpg" />
        <Card title="Now Buy Stationary" offer="From ₹99" link="/mens-footwear" imgSrc="/path/to/your/mens-footwear-image.jpg" />
      </div>
    </div>
  );
};

export default BannerPage;
