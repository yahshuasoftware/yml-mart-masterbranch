import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import ChangeDeliveryStatus from '../components/ChangeDeliveryStatus';
import * as XLSX from 'xlsx'; // Import xlsx for Excel manipulation
import Loader from '../components/Loader';

const OrderList = () => {
    const [orderData, setOrderData] = useState([]);
    const [openDropdown, setOpenDropdown] = useState(false);
    const [loading, setLoading] = useState(true); // State for loading

    const [updateDeliveryDetails, setUpdateDeliveryDetails] = useState({
        _id: "",
        deliveryStatus: ""
    });

    // Function to export data to Excel
    const exportToExcel = (orders) => {
        const worksheetData = [];

        // Prepare data for Excel
        orders.forEach((order, orderIndex) => {
            order.products.forEach((product, productIndex) => {
                worksheetData.push({
                    'Sr. No.': orderIndex + 1,
                    'Customer Name': order.userId?.name || 'No name available',
                    'Product Name': product.name || 'No name available',
                    'Amount': `${order.amount} ₹`,
                    'Payment Status': order.status || 'No status available',
                    'Delivery Status': order.deliveryStatus || 'Ordered',
                });
            });
        });

        // Create a new workbook and worksheet
        const ws = XLSX.utils.json_to_sheet(worksheetData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Orders");

        // Generate Excel file and trigger download
        XLSX.writeFile(wb, "order_list.xlsx");
    };

    const fetchAllOrders = async () => {
        setLoading(true); // Set loading to true when fetching starts

        try {
            
            const response = await fetch(SummaryApi.getOrders.url);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setOrderData(data.orders);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }finally{
            setLoading(false); // Set loading to false when fetching ends

        }
    };

    useEffect(() => {
        fetchAllOrders();
    }, []);

    const handleStatusChangeClick = (order) => {
        setUpdateDeliveryDetails(order);
        setOpenDropdown(true);
    };

    return (
        <div className="p-4 bg-white">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Order List</h2>
                <button
                    className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-200"
                    onClick={() => exportToExcel(orderData)}
                >
                    Get Excel Sheet
                </button>
            </div>
            {loading ? ( // Conditionally render Loader when loading is true
                <div className="flex justify-center items-center w-full h-64">
                    <Loader /> {/* Display Loader */}
                </div>
            ) : (
            <table className="min-w-full bg-white">
                <thead>
                    <tr className="bg-black text-white">
                        <th className="py-2">Sr. No.</th>
                        <th className="py-2">Customer Name</th>
                        <th className="py-2">Items</th>
                        <th className="py-2">Amount</th>
                        <th className="py-2">Payment Status</th>
                        <th className="py-2">Delivery Status</th>
                        <th className="py-2">Actions</th>
                    </tr>
                </thead>
                {orderData.map((order, orderIndex) => (
                    <tbody key={orderIndex} className="border border-gray-400">
                        {order.products.map((product, productIndex) => (
                            <tr className="bg-white" key={`${orderIndex}-${productIndex}`}>
                                {productIndex === 0 && (
                                    <>
                                        <td
                                            rowSpan={order.products.length}
                                            className="py-4 align-middle text-center border-gray-400 font-semibold text-black"
                                        >
                                            {orderIndex + 1}
                                        </td>
                                        <td
                                            rowSpan={order.products.length}
                                            className="py-4 align-middle text-center border-gray-400 font-semibold text-black"
                                        >
                                            {order.userId?.name || 'No name available'}
                                        </td>
                                    </>
                                )}
                                <td className="text-center align-middle border-gray-400 font-medium text-black">
                                    {product.name || 'No name available'}
                                </td>
                                {productIndex === 0 && (
                                    <>
                                    <td  rowSpan={order.products.length} className=" text-center align-middle border-gray-400 font-medium text-black">
                                    {order.amount+"₹"}
                                </td> 
                                        <td
                                            rowSpan={order.products.length}
                                            className="py-4 text-center align-middle border-gray-400 font-medium text-black"
                                        >
                                            {order.status || 'No status available'}
                                        </td>
                                        <td
                                            rowSpan={order.products.length}
                                            className="py-4 text-center align-middle border-gray-400 font-medium text-black"
                                        >
                                            {order.deliveryStatus || 'Ordered'}
                                        </td>
                                        <td
                                            rowSpan={order.products.length}
                                            className="py-4 text-center align-middle border-gray-400"
                                        >
                                            <button
                                                className="bg-sky-600 text-white px-2 py-1 rounded-lg shadow hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:ring-opacity-50 transition duration-200"
                                                onClick={() => handleStatusChangeClick(order)}
                                            >
                                                Change Status
                                            </button>
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                ))}
            </table>
            )}

            {openDropdown && (
                <ChangeDeliveryStatus
                    onClose={() => setOpenDropdown(false)}
                    _id={updateDeliveryDetails._id}
                    deliveryStatus={updateDeliveryDetails.deliveryStatus}
                    callFunc={fetchAllOrders}
                />
            )}
        </div>
    );
};

export default OrderList;
