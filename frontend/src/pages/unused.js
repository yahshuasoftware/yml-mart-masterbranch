import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa'; // Icons for the toggle button on smaller screens

const CategoryProduct = ({ productCategory, selectCategory, selectSubcategory, handleSelectCategory, handleSelectSubcategory, isSidebarVisible, toggleSidebar }) => {
    const [activeCategory, setActiveCategory] = useState(null); // State to track which category is active

    // Toggle the active category and collapse others
    const toggleActiveCategory = (categoryValue) => {
        setActiveCategory((prev) => prev === categoryValue ? null : categoryValue); // Toggle the current active category
    };

    return (
        <div className='container mx-auto p-4 '>
            <div className='lg:grid grid-cols-[200px,1fr]'>
                {/* Sidebar for larger screens */}
                <div className='hidden lg:block bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll'>
                    {/* Sort by section */}
                    <div>
                        <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Sort by</h3>
                        <form className='text-sm flex flex-col gap-2 py-2'>
                            {/* Example: Sort by Price or Name */}
                            <div>
                                <input type='radio' name='sort' value='price' id='price' />
                                <label htmlFor='price'>Price</label>
                            </div>
                            <div>
                                <input type='radio' name='sort' value='name' id='name' />
                                <label htmlFor='name'>Name</label>
                            </div>
                        </form>
                    </div>

                    {/* Category section */}
                    <div>
                        <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Category</h3>
                        <form className='text-sm flex flex-col gap-2 py-2'>
                            {productCategory.map((category, index) => (
                                <div key={index}>
                                    <div className='flex items-center gap-3'>
                                        {/* Category Checkbox */}
                                        <input 
                                            type='checkbox' 
                                            name='category' 
                                            checked={selectCategory[category.value]} 
                                            value={category.value} 
                                            id={category.value} 
                                            onChange={handleSelectCategory} 
                                            onClick={() => toggleActiveCategory(category.value)} // Toggle active category
                                        />
                                        <label htmlFor={category.value}>{category.label}</label>
                                    </div>

                                    {/* Conditionally render subcategories if the category is active */}
                                    {activeCategory === category.value && (
                                        <div className='ml-5'>
                                            {category.subcategories?.map((subcategory, subIndex) => (
                                                <div className='flex items-center gap-3' key={subIndex}>
                                                    <input 
                                                        type='checkbox' 
                                                        name='subcategory' 
                                                        checked={selectSubcategory[subcategory.value]} 
                                                        value={subcategory.value} 
                                                        id={subcategory.value} 
                                                        onChange={handleSelectSubcategory} 
                                                    />
                                                    <label htmlFor={subcategory.value}>{subcategory.label}</label>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </form>
                    </div>
                </div>

                {/* Display Products */}
                <div className='px-0 mt-8 lg:px-4'>
                    {/* Add the component to display products here */}
                    <h2>Products List</h2>
                    {/* Render your product list here */}
                </div>
            </div>

            {/* Toggle Button for smaller screens */}
            <button
                onClick={toggleSidebar}
                className='lg:hidden fixed top-16 left-0 bg-white text-sky-500 px-2 py-1 rounded-full z-50'
            >
                {isSidebarVisible ? <FaTimes size={24} /> : <FaBars size={24} />} 
            </button>

            {/* Sidebar for smaller screens */}
            <div className={`lg:hidden fixed pt-8 top-16 left-0 bg-white p-2 h-full min-h-[100vh] overflow-y-scroll z-40 sidebar ${isSidebarVisible ? 'active' : ''}`}>
                <div>
                    <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Sort by</h3>
                    <form className='text-sm flex flex-col gap-2 py-2'>
                        {/* Example: Sort by Price or Name */}
                        <div>
                            <input type='radio' name='sort' value='price' id='price' />
                            <label htmlFor='price'>Price</label>
                        </div>
                        <div>
                            <input type='radio' name='sort' value='name' id='name' />
                            <label htmlFor='name'>Name</label>
                        </div>
                    </form>
                </div>

                {/* Category Section for smaller screens */}
                <div>
                    <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Category</h3>
                    <form className='text-sm flex flex-col gap-2 py-2'>
                        {productCategory.map((category, index) => (
                            <div key={index}>
                                <div className='flex items-center gap-3'>
                                    {/* Category Checkbox */}
                                    <input 
                                        type='checkbox' 
                                        name='category' 
                                        checked={selectCategory[category.value]} 
                                        value={category.value} 
                                        id={category.value} 
                                        onChange={handleSelectCategory} 
                                        onClick={() => toggleActiveCategory(category.value)} // Toggle active category
                                    />
                                    <label htmlFor={category.value}>{category.label}</label>
                                </div>

                                {/* Conditionally render subcategories if the category is active */}
                                {activeCategory === category.value && (
                                    <div className='ml-5'>
                                        {category.subcategories?.map((subcategory, subIndex) => (
                                            <div className='flex items-center gap-3' key={subIndex}>
                                                <input 
                                                    type='checkbox' 
                                                    name='subcategory' 
                                                    checked={selectSubcategory[subcategory.value]} 
                                                    value={subcategory.value} 
                                                    id={subcategory.value} 
                                                    onChange={handleSelectSubcategory} 
                                                />
                                                <label htmlFor={subcategory.value}>{subcategory.label}</label>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CategoryProduct;
