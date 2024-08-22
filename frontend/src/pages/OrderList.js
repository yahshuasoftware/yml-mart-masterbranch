import React, { useEffect, useState } from 'react';

const OrderList = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        // Fetch orders from the backend
        fetch('/api/orders')
            .then(response => response.json())
            .then(data => setOrders(data.orders));
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Order List</h2>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2">Customer Name</th>
                        <th className="py-2">Items</th>
                        <th className="py-2">Payment Status</th>
                        <th className="py-2">Delivery Status</th>
                        <th className="py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.id}>
                            <td className="py-2">{order.customerName}</td>
                            <td className="py-2">{order.items.join(', ')}</td>
                            <td className="py-2">{order.paymentStatus}</td>
                            <td className="py-2">{order.deliveryStatus}</td>
                            <td className="py-2">
                                <button className="bg-blue-500 text-white px-2 py-1 rounded">
                                    View
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderList;
