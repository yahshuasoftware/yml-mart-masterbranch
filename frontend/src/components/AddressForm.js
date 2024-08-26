import React from 'react';

import { FaMapMarkerAlt, FaCity, FaRegAddressCard, FaEnvelope } from 'react-icons/fa';

const AddressForm = ({ address, setAddress }) => {
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setAddress({
      ...address,
      [name]: value,
    });
  };

  return (
    <>
      <div className="grid gap-6">
        <div className="flex gap-4">
          <div className="w-1/2">
            <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-2">Street:</label>
            <div className="relative">
              <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text"
                id="street"
                name="street"
                value={address.street}
                onChange={handleOnChange}
                className="p-3 pl-10 border border-gray-300 rounded-md w-full focus:outline-none focus:border-sky-600"
                required
              />
            </div>
          </div>

          <div className="w-1/2">
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">City:</label>
            <div className="relative">
              <FaCity className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text"
                id="city"
                name="city"
                value={address.city}
                onChange={handleOnChange}
                className="p-3 pl-10 border border-gray-300 rounded-md w-full focus:outline-none focus:border-sky-600"
                required
              />
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-1/2">
            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">State:</label>
            <div className="relative">
              <FaRegAddressCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text"
                id="state"
                name="state"
                value={address.state}
                onChange={handleOnChange}
                className="p-3 pl-10 border border-gray-300 rounded-md w-full focus:outline-none focus:border-sky-600"
                required
              />
            </div>
          </div>

          <div className="w-1/2">
            <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-2">ZIP Code:</label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text"
                id="zip"
                name="zip"
                value={address.zip}
                onChange={handleOnChange}
                className="p-3 pl-10 border border-gray-300 rounded-md w-full focus:outline-none focus:border-sky-600"
                required
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddressForm;



