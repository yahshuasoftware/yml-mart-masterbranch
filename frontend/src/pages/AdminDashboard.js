import React, { useEffect, useState } from 'react';

const Dashboard = () => {
    const [orders, setOrders] = useState([]);
    const [totalRevenue, setTotalRevenue] = useState(0);

    useEffect(() => {
        // Fetch orders from the backend
        fetch('/api/orders')
            .then(response => response.json())
            .then(data => {
                setOrders(data.orders);
                setTotalRevenue(data.totalRevenue);
            });
    }, []);

    const totalOrders = orders.length;
    const pendingOrders = orders.filter(order => order.status === 'Pending').length;
    const deliveredOrders = orders.filter(order => order.status === 'Delivered').length;

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white p-4 rounded shadow">
                    <h3 className="text-lg font-semibold">Total Orders</h3>
                    <p>{totalOrders}</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h3 className="text-lg font-semibold">Pending Orders</h3>
                    <p>{pendingOrders}</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h3 className="text-lg font-semibold">Delivered Orders</h3>
                    <p>{deliveredOrders}</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h3 className="text-lg font-semibold">Total Revenue</h3>
                    <p>₹{totalRevenue}</p>
                </div>
            </div>

            <h3 className="text-xl font-semibold mb-4">Order Details</h3>
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

export default Dashboard;
