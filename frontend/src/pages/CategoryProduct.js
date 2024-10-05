import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import productCategory from '../helpers/productCategory';
import VerticalCard from '../components/VerticalCard';
import SummaryApi from '../common';
import { FaTimes, FaBars } from "react-icons/fa";

const CategoryProduct = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const [activeCategory, setActiveCategory] = useState(null);
    const prevSearchRef = useRef("");

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    const urlSearch = new URLSearchParams(location.search);
    const urlCategoryListinArray = urlSearch.getAll("category");
    const urlSubcategoryListinArray = urlSearch.getAll("subcategory");

    const [selectCategory, setSelectCategory] = useState({});
    const [selectSubcategory, setSelectSubcategory] = useState({});
    const [filterCategoryList, setFilterCategoryList] = useState([]);
    const [filterSubcategoryList, setFilterSubcategoryList] = useState([]);
    const [sortBy, setSortBy] = useState("");

    // Sync state with URL parameters
    useEffect(() => {
        const urlCategoryListObject = {};
        const urlSubcategoryListObject = {};

        urlCategoryListinArray.forEach(el => {
            urlCategoryListObject[el] = true;
        });

        urlSubcategoryListinArray.forEach(el => {
            urlSubcategoryListObject[el] = true;
        });

        setSelectCategory(urlCategoryListObject);
        setSelectSubcategory(urlSubcategoryListObject);
    }, [location.search]);

    // Fetch data based on filters
    const fetchData = async () => {
        setLoading(true);
        const response = await fetch(SummaryApi.filterProduct.url, {
            method: SummaryApi.filterProduct.method,
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                category: filterCategoryList,
                subcategory: filterSubcategoryList,
                sortBy: sortBy
            })
        });

        const dataResponse = await response.json();
        setData(dataResponse?.data || []);
        setLoading(false);
    };

    // Update filter lists and manage URL
    useEffect(() => {
        const arrayOfCategory = Object.keys(selectCategory).filter(key => selectCategory[key]);
        const arrayOfSubcategory = Object.keys(selectSubcategory).filter(key => selectSubcategory[key]);

        if (JSON.stringify(arrayOfCategory) !== JSON.stringify(filterCategoryList)) {
            setFilterCategoryList(arrayOfCategory);
        }

        if (JSON.stringify(arrayOfSubcategory) !== JSON.stringify(filterSubcategoryList)) {
            setFilterSubcategoryList(arrayOfSubcategory);
        }

        const newSearch = [...arrayOfCategory.map(el => `category=${el}`), ...arrayOfSubcategory.map(el => `subcategory=${el}`)].join("&");

        // Check if the search string is different from the previous one to prevent unnecessary navigation
        if (newSearch !== prevSearchRef.current) {
            navigate("/product-category?" + newSearch);
            prevSearchRef.current = newSearch;
        }
    }, [selectCategory, selectSubcategory, filterCategoryList, filterSubcategoryList, navigate]);

    // Fetch data when filters change
    useEffect(() => {
        if (filterCategoryList.length > 0 || filterSubcategoryList.length > 0) {
            fetchData();
        }
    }, [filterCategoryList, filterSubcategoryList, sortBy]);

    const handleSelectCategory = (e) => {
        const { value, checked } = e.target;
        setSelectCategory(prev => ({
            ...prev,
            [value]: checked
        }));
    };

    const handleSelectSubcategory = (e) => {
        const { value, checked } = e.target;
        setSelectSubcategory(prev => ({
            ...prev,
            [value]: checked
        }));
    };

    const handleOnChangeSortBy = (e) => {
        const { value } = e.target;
        setSortBy(value);
    };

    return (
        <div className='container mx-auto p-4 '>
            <div className='lg:grid grid-cols-[200px,1fr]'>
                <div className='hidden lg:block bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll'>
                    <div>
                        <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Sort by</h3>
                        <form className='text-sm flex flex-col gap-2 py-2'>
                            <div className='flex items-center gap-3'>
                                <input type='radio' name='sortBy' checked={sortBy === 'asc'} onChange={handleOnChangeSortBy} value={"asc"} />
                                <label>Price - Low to High</label>
                            </div>
                            <div className='flex items-center gap-3'>
                                <input type='radio' name='sortBy' checked={sortBy === 'dsc'} onChange={handleOnChangeSortBy} value={"dsc"} />
                                <label>Price - High to Low</label>
                            </div>
                            <div className='flex items-center gap-3'>
                                <input type='radio' name='sortBy' checked={sortBy === 'popularity'} onChange={handleOnChangeSortBy} value={"popularity"} />
                                <label>Popularity</label>
                            </div>
                        </form>
                    </div>

                    <div>
                        <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Category</h3>
                        <form className='text-sm flex flex-col gap-2 py-2'>
{/* For Categories */}
{[
  // Active categories first
  ...productCategory.filter(category => selectCategory[category.value]),

  // Then the remaining categories
  ...productCategory.filter(category => !selectCategory[category.value])
].map((category, index) => (
    <div key={index}>
        <div className='flex items-center gap-3'>
            <input 
                type='checkbox' 
                name='category' 
                checked={selectCategory[category.value] || false} 
                value={category.value} 
                id={category.value} 
                onChange={handleSelectCategory} 
            />
            <label htmlFor={category.value}>{category.label}</label>
        </div>

        {/* Subcategories inside a category */}
        {selectCategory[category.value] && category.subcategories?.map((subcategory, subIndex) => (
            <div className='ml-5' key={subIndex}>
                <div className='flex items-center gap-3'>
                    <input 
                        type='checkbox' 
                        name='subcategory' 
                        checked={selectSubcategory[subcategory.value] || false} 
                        value={subcategory.value} 
                        id={subcategory.value} 
                        onChange={handleSelectSubcategory} 
                    />
                    <label htmlFor={subcategory.value}>{subcategory.label}</label>
                </div>
            </div>
        ))}
    </div>
))}


                        </form>
                    </div>
                </div>

                <div className='px-0 mt-8 lg:px-4'>
                    <p className='font-medium text-slate-800 text-lg my-2'>Search Results: {data.length}</p>
                    <div className='min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]'>
                        {data.length !== 0 && !loading && (
                            <VerticalCard data={data} loading={loading} />
                        )}
                    </div>
                </div>
            </div>

            <button
                onClick={toggleSidebar}
                className='lg:hidden fixed top-16 left-0 bg-white text-sky-500 px-2 py-1 rounded-full z-50'
            >
                {isSidebarVisible ? <FaTimes size={24} /> : <FaBars size={24} />} 
            </button>

            <div className={`lg:hidden fixed pt-8 top-16 left-0 bg-white p-2 h-full min-h-[calc(100vh-120px)] shadow-md z-40 overflow-y-scroll ${isSidebarVisible ? 'translate-x-0' : '-translate-x-[100vw]'} transition-all ease-in-out duration-300`}>
                <div>
                    <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Sort by</h3>
                    <form className='text-sm flex flex-col gap-2 py-2'>
                        <div className='flex items-center gap-3'>
                            <input type='radio' name='sortBy' checked={sortBy === 'asc'} onChange={handleOnChangeSortBy} value={"asc"} />
                            <label>Price - Low to High</label>
                        </div>
                        <div className='flex items-center gap-3'>
                            <input type='radio' name='sortBy' checked={sortBy === 'dsc'} onChange={handleOnChangeSortBy} value={"dsc"} />
                            <label>Price - High to Low</label>
                        </div>
                        <div className='flex items-center gap-3'>
                            <input type='radio' name='sortBy' checked={sortBy === 'popularity'} onChange={handleOnChangeSortBy} value={"popularity"} />
                            <label>Popularity</label>
                        </div>
                    </form>
                </div>

                <div>
                    <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Category</h3>
                    <form className='text-sm flex flex-col gap-2 py-2'>
{/* For Categories */}
{[
  // Active categories first
  ...productCategory.filter(category => selectCategory[category.value]),

  // Then the remaining categories
  ...productCategory.filter(category => !selectCategory[category.value])
].map((category, index) => (
    <div key={index}>
        <div className='flex items-center gap-3'>
            <input 
                type='checkbox' 
                name='category' 
                checked={selectCategory[category.value] || false} 
                value={category.value} 
                id={category.value} 
                onChange={handleSelectCategory} 
            />
            <label htmlFor={category.value}>{category.label}</label>
        </div>

        {/* Subcategories inside a category */}
        {selectCategory[category.value] && category.subcategories?.map((subcategory, subIndex) => (
            <div className='ml-5' key={subIndex}>
                <div className='flex items-center gap-3'>
                    <input 
                        type='checkbox' 
                        name='subcategory' 
                        checked={selectSubcategory[subcategory.value] || false} 
                        value={subcategory.value} 
                        id={subcategory.value} 
                        onChange={handleSelectSubcategory} 
                    />
                    <label htmlFor={subcategory.value}>{subcategory.label}</label>
                </div>
            </div>
        ))}
    </div>
))}


                    </form>
                </div>
            </div>
        </div>
    );
};

export default CategoryProduct;
