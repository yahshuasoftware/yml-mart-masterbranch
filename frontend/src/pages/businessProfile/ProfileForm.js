import React, { useState } from 'react';
import SummaryApi from '../../common'; // Adjust the import path if necessary

const KYCPage = () => {
  const [kycDetails, setKycDetails] = useState({
    panNumber: '',
    panName: '',
    panCardFile: null,
    aadharNumber: '',
    aadharName: '',
    aadharFile: null,
    accountHolderName: '',
    accountNumber: '',
    ifscCode: '',
    passbookFile: null,
    nomineeName: '',
    nomineeRelation: '',
    nomineeMobile: '',
    nomineeEmail: '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      setKycDetails((prevDetails) => ({
        ...prevDetails,
        [name]: files[0], // Store the file object
      }));
    } else {
      setKycDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(kycDetails).forEach(([key, value]) => {
      if (value !== null && value !== '') {
        formData.append(key, value);
      }
    });

    try {
      const response = await fetch(SummaryApi.submitKYC.url, {
        method: SummaryApi.submitKYC.method,
        body: formData,
        // No need to set 'Content-Type' header for FormData
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      alert('KYC details submitted successfully!');
      console.log(result);
    } catch (error) {
      console.error('Error submitting KYC details:', error);
      alert('Failed to submit KYC details.');
    }
  };

  return (
    <div className="container mx-auto p-6 mt-10 bg-white shadow-md rounded-md max-w-md">
      <h2 className="text-2xl font-bold mb-6">KYC Information</h2>
      <div className="max-h-96 overflow-y-auto p-4 border border-gray-300 rounded-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Pan Card Details */}
          <div>
            <h3 className="text-lg font-semibold">Pan Card Details</h3>
            <div className="mt-2">
              <label className="block text-sm font-medium text-gray-700">Pan No:</label>
              <input
                type="text"
                name="panNumber"
                value={kycDetails.panNumber}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-sky-600 focus:border-sky-600"
              />
            </div>
            <div className="mt-2">
              <label className="block text-sm font-medium text-gray-700">Name as per Pan:</label>
              <input
                type="text"
                name="panName"
                value={kycDetails.panName}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-sky-600 focus:border-sky-600"
              />
            </div>
            <div className="mt-2">
              <label className="block text-sm font-medium text-gray-700">Pan Card:</label>
              <input
                type="file"
                name="panCardFile"
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-sky-600 focus:border-sky-600"
              />
            </div>
          </div>

          {/* Aadhar Card Details */}
          <div>
            <h3 className="text-lg font-semibold">Aadhar Card Details</h3>
            <div className="mt-2">
              <label className="block text-sm font-medium text-gray-700">Aadhaar Card No:</label>
              <input
                type="text"
                name="aadharNumber"
                value={kycDetails.aadharNumber}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-sky-600 focus:border-sky-600"
              />
            </div>
            <div className="mt-2">
              <label className="block text-sm font-medium text-gray-700">Name as per Aadhaar Card:</label>
              <input
                type="text"
                name="aadharName"
                value={kycDetails.aadharName}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-sky-600 focus:border-sky-600"
              />
            </div>
            <div className="mt-2">
              <label className="block text-sm font-medium text-gray-700">Aadhar Card:</label>
              <input
                type="file"
                name="aadharFile"
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-sky-600 focus:border-sky-600"
              />
            </div>
          </div>

          {/* Bank Details */}
          <div>
            <h3 className="text-lg font-semibold">Bank Details</h3>
            <div className="mt-2">
              <label className="block text-sm font-medium text-gray-700">Account Holder Name:</label>
              <input
                type="text"
                name="accountHolderName"
                value={kycDetails.accountHolderName}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-sky-600 focus:border-sky-600"
              />
            </div>
            <div className="mt-2">
              <label className="block text-sm font-medium text-gray-700">Account Number:</label>
              <input
                type="text"
                name="accountNumber"
                value={kycDetails.accountNumber}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-sky-600 focus:border-sky-600"
              />
            </div>
            <div className="mt-2">
              <label className="block text-sm font-medium text-gray-700">IFSC Code:</label>
              <input
                type="text"
                name="ifscCode"
                value={kycDetails.ifscCode}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-sky-600 focus:border-sky-600"
              />
            </div>
            <div className="mt-2">
              <label className="block text-sm font-medium text-gray-700">Passbook:</label>
              <input
                type="file"
                name="passbookFile"
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-sky-600 focus:border-sky-600"
              />
            </div>
          </div>

          {/* Nominee Details */}
          <div>
            <h3 className="text-lg font-semibold">Nominee Details</h3>
            <div className="mt-2">
              <label className="block text-sm font-medium text-gray-700">Nominee Name:</label>
              <input
                type="text"
                name="nomineeName"
                value={kycDetails.nomineeName}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-sky-600 focus:border-sky-600"
              />
            </div>
            <div className="mt-2">
              <label className="block text-sm font-medium text-gray-700">Relation:</label>
              <input
                type="text"
                name="nomineeRelation"
                value={kycDetails.nomineeRelation}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-sky-600 focus:border-sky-600"
              />
            </div>
            <div className="mt-2">
              <label className="block text-sm font-medium text-gray-700">Nominee Mobile:</label>
              <input
                type="text"
                name="nomineeMobile"
                value={kycDetails.nomineeMobile}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-sky-600 focus:border-sky-600"
              />
            </div>
            <div className="mt-2">
              <label className="block text-sm font-medium text-gray-700">Nominee Email:</label>
              <input
                type="email"
                name="nomineeEmail"
                value={kycDetails.nomineeEmail}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-sky-600 focus:border-sky-600"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-sky-600 text-white font-semibold rounded-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
          >
            Submit KYC
          </button>
        </form>
      </div>
    </div>
  );
};

export default KYCPage;
