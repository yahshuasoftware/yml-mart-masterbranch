import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';

const OrderList = () => {

    const [orderData, setOrderData] = useState([])


    useEffect(() => {
            const fetchAllOrders = async () => {
                try {
                    const response = await fetch(SummaryApi.getOrders.url);
        
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
        
                    const data = await response.json();
                    
                    // Assuming `orders` is the key in the response object
                    // console.log(data.orders); // Log the orders data to the console
                    // alert((orderData[6].products[0].name)); // Display the orders data as an alert (if small) or use console.log
                    setOrderData(data.orders); // Use this to set the orders data in state for further usage
                    console.log("Arjun" +orderData[0].name)
    
                } catch (error) {
                    console.error('Error fetching orders:', error);
                }
            };
        
            fetchAllOrders();
        }, []);
    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Order List</h2>
             <table className="min-w-full bg-white">
                <thead>
                    <tr className='bg-red-200 border-2 border-gray-400'>
                        <th className="py-2">Customer Name</th>
                        <th className="py-2">Items</th>
                        <th className="py-2">Payment Status</th>
                        <th className="py-2">Delivery Status</th>
                        <th className="py-2">Actions</th>
                    </tr>
                </thead>
                
                {orderData.map((order, orderIndex) => (
    <tbody key={orderIndex} className='border-2 border-gray-400 '>
        {order.products.map((product, productIndex) => (
            <tr className='bg-sky-100 ' key={`${orderIndex}-${productIndex}`}>
                {productIndex === 0 && ( // Only show user info for the first product row
                    <td rowSpan={order.products.length} className="py-2  align-middle text-center border-gray-400">{order.user}</td>
                )}
                                <td className="py-2 text-center align-middle border-gray-400">{product.name || 'No name available'}</td>
                    <td className="py-2 text-center align-middle border-gray-400">{order.status || 'No status available'}</td>
                    <td className="py-2 text-center align-middle  border-gray-400">Ordered</td>

                <td className="py-2 text-center align-middle">
                    <button className="bg-blue-500 text-white  px-2 py-1 rounded">
                        View
                    </button>
                </td>
            </tr>
        ))}
    </tbody>
))}

                
            </table>
        </div>
    );
};

export default OrderList;
