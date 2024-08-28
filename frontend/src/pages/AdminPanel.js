import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ROLE from '../common/role';

const AdminPanel = () => {
    const user = useSelector(state => state?.user?.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.role !== ROLE.ADMIN) {
            navigate("/");
        }
    }, [user]);

    return (
        <div className='min-h-screen flex'>
            <aside className='bg-white min-h-full w-64 max-w-64 customShadow'>
                <div className='h-32 flex justify-center items-center flex-col'>
                    <div className='text-5xl cursor-pointer relative flex justify-center'>
                        {user?.profilePic ? (
                            <img src={user?.profilePic} className='w-20 h-20 rounded-full' alt={user?.name} />
                        ) : (
                            <FaRegCircleUser />
                        )}
                    </div>
                    <p className='capitalize text-lg font-semibold'>{user?.name}</p>
                    <p className='text-sm'>{user?.role}</p>
                </div>
                <nav className='p-4'>
                    <Link to={"all-products"} className='block px-2 py-1 hover:bg-slate-100'>All Products</Link>
                    <Link to={"order-list"} className='block px-2 py-1 hover:bg-slate-100'>All Orders</Link>
                    <Link to={"all-banners"} className='block px-2 py-1 hover:bg-slate-100'>All Banners</Link>
                </nav>
            </aside>
            <main className='flex-1 p-2'>
                <Outlet />
            </main>
        </div>
    );
};

export default AdminPanel;
