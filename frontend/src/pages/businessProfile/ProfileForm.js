import React, { useState, useEffect } from 'react';
import SummaryApi from '../../common/index'; // Adjust the import path if necessary

const KYCPage = () => {
  const [selectedPanCard, setSelectedPanCard] = useState(false);
  const [selectedAadharCard, setSelectedAadharCard] = useState(false);
  const [selectedAccountDetails, setSelectedAccountDetails] = useState(false);
  const [user, setUser] = useState(null); // Change initial value to null
  const [userId, setUserId] = useState(''); // Initialize userId with an empty string
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
  });
  const [submissionStatus, setSubmissionStatus] = useState('');
  const [formVisible, setFormVisible] = useState(true);

  useEffect(() => {
    const fetchUserData = async (authToken) => {
      try {
        const response = await fetch(SummaryApi.current_user.url, {
          method: SummaryApi.current_user.method,
          credentials: "include",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`, 
        },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setUser(data.data);
        setUserId(data.data._id); // Set the user ID

      } catch (error) {
        console.error("Error:", error);
      }
    };

    const fetchKYCStatus = async () => {
      if (!userId) return; // Ensure userId is set before making the request

      try {
        const response = await fetch(SummaryApi.getKYC.url(userId), { // Dynamic URL with userId
          method: SummaryApi.getKYC.method,
          headers: { 'Content-Type': 'application/json' },
        });

        const result = await response.json();

        if (response.ok && result.success) {
          setKycDetails(result.data);
          setFormVisible(false); // Hide form if KYC is already filled
          setSubmissionStatus('Your KYC is already submitted and verification is pending.');
        } else {
          setSubmissionStatus(result.message || 'Error fetching KYC details.');
        }
      } catch (error) {
        console.error('Error fetching KYC status:', error);
        setSubmissionStatus('Error fetching KYC details.');
      }
    };

    fetchUserData(); // Fetch user data first to get userId
    fetchKYCStatus(); // Fetch KYC status after fetching user data

  }, [userId]); // Re-run useEffect whenever userId changes

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      setKycDetails((prevDetails) => ({
        ...prevDetails,
        [name]: files[0],
      }));
    } else {
      setKycDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
    }
  };

  const validateForm = () => {
    if (selectedPanCard && (!kycDetails.panNumber || !kycDetails.panName || !kycDetails.panCardFile)) {
      return 'Please fill all PAN Card details.';
    }
    if (selectedAadharCard && (!kycDetails.aadharNumber || !kycDetails.aadharName || !kycDetails.aadharFile)) {
      return 'Please fill all Aadhar Card details.';
    }
    if (selectedAccountDetails && (!kycDetails.accountHolderName || !kycDetails.accountNumber || !kycDetails.ifscCode || !kycDetails.passbookFile)) {
      return 'Please fill all Account Details.';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      alert(validationError);
      return;
    }

    const formData = new FormData();
    formData.append('userId', userId);

    if (selectedPanCard) {
      formData.append('panNumber', kycDetails.panNumber);
      formData.append('panName', kycDetails.panName);
      formData.append('panCardFile', kycDetails.panCardFile);
    }

    if (selectedAadharCard) {
      formData.append('aadharNumber', kycDetails.aadharNumber);
      formData.append('aadharName', kycDetails.aadharName);
      formData.append('aadharFile', kycDetails.aadharFile);
    }

    if (selectedAccountDetails) {
      formData.append('accountHolderName', kycDetails.accountHolderName);
      formData.append('accountNumber', kycDetails.accountNumber);
      formData.append('ifscCode', kycDetails.ifscCode);
      formData.append('passbookFile', kycDetails.passbookFile);
    }

    try {
      const response = await fetch(SummaryApi.uploadKYC.url, {
        method: SummaryApi.uploadKYC.method,
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        setSubmissionStatus('Verification is pending.');
        setFormVisible(false);
      } else {
        alert('Submission failed: ' + result.message);
        setSubmissionStatus('Submission failed.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Submission failed');
      setSubmissionStatus('Submission failed.');
    }
  };
  
  return (
    <div className="relative container mx-auto p-6 mt-3 bg-white shadow-md rounded-md max-w-3xl">
      {submissionStatus && !formVisible && (
        <div className="absolute top-0 left-0 w-full bg-green-100 text-green-800 p-4 rounded-md shadow-md flex items-center justify-center">
          <div className="flex items-center">
            <svg className="w-16 h-16 text-green-500 mr-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 16.172l-4.95-4.95a1 1 0 0 1 1.415-1.415L9 13.343l8.535-8.535a1 1 0 0 1 1.415 1.415L10.414 15.172a1 1 0 0 1-1.415 0z" />
            </svg>
            <span className="text-xl font-semibold">{submissionStatus}</span>
          </div>
        </div>
      )}

      {formVisible && (
        <div className="pt-16">
          <h2 className="text-2xl font-bold mb-6">KYC Information</h2>
          <div className="overflow-y-scroll max-h-[70vh]">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Pan Card Dropdown */}
              <div className="mb-4">
                <input
                  type="checkbox"
                  id="panCard"
                  checked={selectedPanCard}
                  onChange={(e) => setSelectedPanCard(e.target.checked)}
                />
                <label htmlFor="panCard" className="ml-2 text-sm font-medium text-gray-700">Pan Card Details</label>
              </div>
              {selectedPanCard && (
                <div>
                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700">Pan No:</label>
                    <input
                      type="text"
                      name="panNumber"
                      value={kycDetails.panNumber}
                      onChange={handleChange}
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
                    />
                  </div>
                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700">Name as per Pan:</label>
                    <input
                      type="text"
                      name="panName"
                      value={kycDetails.panName}
                      onChange={handleChange}
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
                    />
                  </div>
                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700">Upload Pan Card:</label>
                    <input
                      type="file"
                      name="panCardFile"
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                    />
                  </div>
                </div>
              )}

              {/* Aadhar Card Dropdown */}
              <div className="mb-4">
                <input
                  type="checkbox"
                  id="aadharCard"
                  checked={selectedAadharCard}
                  onChange={(e) => setSelectedAadharCard(e.target.checked)}
                />
                <label htmlFor="aadharCard" className="ml-2 text-sm font-medium text-gray-700">Aadhar Card Details</label>
              </div>
              {selectedAadharCard && (
                <div>
                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700">Aadhar Card No:</label>
                    <input
                      type="text"
                      name="aadharNumber"
                      value={kycDetails.aadharNumber}
                      onChange={handleChange}
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
                    />
                  </div>
                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700">Name as per Aadhar:</label>
                    <input
                      type="text"
                      name="aadharName"
                      value={kycDetails.aadharName}
                      onChange={handleChange}
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
                    />
                  </div>
                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700">Upload Aadhar Card:</label>
                    <input
                      type="file"
                      name="aadharFile"
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                    />
                  </div>
                </div>
              )}

              {/* Bank Account Details Dropdown */}
              <div className="mb-4">
                <input
                  type="checkbox"
                  id="accountDetails"
                  checked={selectedAccountDetails}
                  onChange={(e) => setSelectedAccountDetails(e.target.checked)}
                />
                <label htmlFor="accountDetails" className="ml-2 text-sm font-medium text-gray-700">Bank Account Details</label>
              </div>
              {selectedAccountDetails && (
                <div>
                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700">Account Holder Name:</label>
                    <input
                      type="text"
                      name="accountHolderName"
                      value={kycDetails.accountHolderName}
                      onChange={handleChange}
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
                    />
                  </div>
                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700">Account Number:</label>
                    <input
                      type="text"
                      name="accountNumber"
                      value={kycDetails.accountNumber}
                      onChange={handleChange}
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
                    />
                  </div>
                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700">IFSC Code:</label>
                    <input
                      type="text"
                      name="ifscCode"
                      value={kycDetails.ifscCode}
                      onChange={handleChange}
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
                    />
                  </div>
                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700">Upload Passbook:</label>
                    <input
                      type="file"
                      name="passbookFile"
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                    />
                  </div>
                </div>
              )}
              <button
                type="submit"
                className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default KYCPage;