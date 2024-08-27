import React, { useState } from 'react';

const Header = () => {
  return (
    <div className="flex items-center justify-between p-6 bg-sky-200 text-black rounded-lg shadow-md">
      <div className="profile-pic">
        {/* <img src="path_to_profile_pic.jpg" alt="Profile Picture" className="w-16 h-16 rounded-full" /> */}
      </div>
      <div className="user-info text-left ml-4">
        <p className="text-lg font-semibold">Customer Name: Arjun Hanwate</p>
        <p className="text-sm">Username: Arjun_123</p>
        <p className="text-sm">Joining Date: 1st Dec 2001</p>
      </div>
      <ProgressBar width="80%" />
    </div>
  );
};

const ProgressBar = ({ width }) => {
  return (
    <div className="flex items-center mt-4">
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div className="bg-green-500 h-4 rounded-full" style={{ width }}></div>
      </div>
      <p className="ml-2 text-sm font-medium text-gray-700">{width}</p>
    </div>
  );
};

const AccordionItem = ({ title, isOpen, onClick, children }) => {
  return (
    <div className="border-b border-gray-200">
      <div
        className="accordion-header flex justify-between items-center p-4 cursor-pointer bg-gray-100 hover:bg-gray-200"
        onClick={onClick}
      >
        <h3 className="text-lg font-medium text-gray-800">{title}</h3>
        <span className="text-gray-500">{isOpen ? '▲' : '▼'}</span>
      </div>
      {isOpen && (
        <div className="accordion-content p-4 bg-white">
          {children}
        </div>
      )}
    </div>
  );
};

const ProfileForm = () => {
  const [openAccordion, setOpenAccordion] = useState(null);

  const handleAccordionClick = (id) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <div className="container mx-auto p-6 mt-10">
      <Header />
      <div className="accordion mt-6">
        <AccordionItem
          title="Pan Card"
          isOpen={openAccordion === 'pan-card-details'}
          onClick={() => handleAccordionClick('pan-card-details')}
        >
          <form className="space-y-4">
            <div>
              <label htmlFor="pan-no" className="block text-sm font-medium text-gray-700">Pan No:</label>
              <input
                type="text"
                id="pan-no"
                name="pan-no"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-sky-600 focus:border-sky-600"
              />
            </div>
            <div>
              <label htmlFor="pan-name" className="block text-sm font-medium text-gray-700">Name as per Pan:</label>
              <input
                type="text"
                id="pan-name"
                name="pan-name"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-sky-600 focus:border-sky-600"
              />
            </div>
            <div>
              <label htmlFor="pan-card" className="block text-sm font-medium text-gray-700">Pan Card:</label>
              <input
                type="file"
                id="pan-card"
                name="pan-card"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-sky-600 focus:border-sky-600"
              />
            </div>
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-sky-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </AccordionItem>
        <AccordionItem
          title="Bank Details"
          isOpen={openAccordion === 'bank-details'}
          onClick={() => handleAccordionClick('bank-details')}
        >
          <form className="space-y-4">
            <div>
              <label htmlFor="account-holder" className="block text-sm font-medium text-gray-700">Account Holder Name:</label>
              <input
                type="text"
                id="account-holder"
                name="account-holder"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-sky-600 focus:border-sky-600"
              />
            </div>
            <div>
              <label htmlFor="account-no" className="block text-sm font-medium text-gray-700">Account No:</label>
              <input
                type="number"
                id="account-no"
                name="account-no"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-sky-600 focus:border-sky-600"
              />
            </div>
            <div>
              <label htmlFor="ifsc" className="block text-sm font-medium text-gray-700">IFSC Code:</label>
              <input
                type="text"
                id="ifsc"
                name="ifsc"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-sky-600 focus:border-sky-600"
              />
            </div>
            <div>
              <label htmlFor="passbook" className="block text-sm font-medium text-gray-700">Passbook:</label>
              <input
                type="file"
                id="passbook"
                name="passbook"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-sky-600 focus:border-sky-600"
              />
            </div>
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-sky-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </AccordionItem>

        <AccordionItem
          title="KYC Details"
          isOpen={openAccordion === 'kyc-details'}
          onClick={() => handleAccordionClick('kyc-details')}
        >
          <form className="space-y-4">
            <div>
              <label htmlFor="adhar-no" className="block text-sm font-medium text-gray-700">Aadhaar Card No:</label>
              <input
                type="text"
                id="adhar-no"
                name="adhar-no"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-sky-600 focus:border-sky-600"
              />
            </div>
            <div>
              <label htmlFor="adhar-name" className="block text-sm font-medium text-gray-700">Name as per Aadhaar Card:</label>
              <input
                type="text"
                id="adhar-name"
                name="adhar-name"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-sky-600 focus:border-sky-600"
              />
            </div>
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-sky-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </AccordionItem>

        <AccordionItem
          title="Nominee Details"
          isOpen={openAccordion === 'nominee-details'}
          onClick={() => handleAccordionClick('nominee-details')}
        >
          <form className="space-y-4">
            <div>
              <label htmlFor="nominee-name" className="block text-sm font-medium text-gray-700">Nominee Name:</label>
              <input
                type="text"
                id="nominee-name"
                name="nominee-name"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-sky-600 focus:border-sky-600"
              />
            </div>
            <div>
              <label htmlFor="nominee-mobile" className="block text-sm font-medium text-gray-700">Nominee Mobile No:</label>
              <input
                type="text"
                id="nominee-mobile"
                name="nominee-mobile"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-sky-600 focus:border-sky-600"
              />
            </div>
            <div>
              <label htmlFor="nominee-email" className="block text-sm font-medium text-gray-700">Nominee Email:</label>
              <input
                type="email"
                id="nominee-email"
                name="nominee-email"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-sky-600 focus:border-sky-600"
              />
            </div>
            <div>
              <label htmlFor="nominee-relation" className="block text-sm font-medium text-gray-700">Nominee Relation:</label>
              <input
                type="text"
                id="nominee-relation"
                name="nominee-relation"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-sky-600 focus:border-sky-600"
              />
            </div>
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-sky-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </AccordionItem>
      </div>
    </div>
  );
};

export default ProfileForm;
