import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import productCategory from '../helpers/productCategory';
import VerticalCard from '../components/VerticalCard';
import SummaryApi from '../common';

const CategoryProduct = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const urlSearch = new URLSearchParams(location.search);
    const urlCategoryListinArray = urlSearch.getAll("category");
    const urlSubcategoryListinArray = urlSearch.getAll("subcategory");

    const urlCategoryListObject = {};
    urlCategoryListinArray.forEach(el => {
        urlCategoryListObject[el] = true;
    });

    const urlSubcategoryListObject = {};
    urlSubcategoryListinArray.forEach(el => {
        urlSubcategoryListObject[el] = true;
    });

    const [selectCategory, setSelectCategory] = useState(urlCategoryListObject);
    const [selectSubcategory, setSelectSubcategory] = useState(urlSubcategoryListObject);
    const [filterCategoryList, setFilterCategoryList] = useState([]);
    const [filterSubcategoryList, setFilterSubcategoryList] = useState([]);
    const [sortBy, setSortBy] = useState("");

    // Fetch data based on selected categories, subcategories, and sortBy
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

    // Category selection handler
    const handleSelectCategory = (e) => {
        const { value, checked } = e.target;
        setSelectCategory((prev) => ({
            ...prev,
            [value]: checked
        }));
    };

    // Subcategory selection handler
    const handleSelectSubcategory = (e) => {
        const { value, checked } = e.target;
        setSelectSubcategory((prev) => ({
            ...prev,
            [value]: checked
        }));
    };

    // Update filterCategoryList and URL based on selected categories and subcategories
    useEffect(() => {
        const arrayOfCategory = Object.keys(selectCategory).filter(key => selectCategory[key]);
        const arrayOfSubcategory = Object.keys(selectSubcategory).filter(key => selectSubcategory[key]);

        setFilterCategoryList(arrayOfCategory);
        setFilterSubcategoryList(arrayOfSubcategory);

        const urlFormat = [...arrayOfCategory.map(el => `category=${el}`), ...arrayOfSubcategory.map(el => `subcategory=${el}`)];
        navigate("/product-category?" + urlFormat.join("&"));
    }, [selectCategory, selectSubcategory, navigate]);

    // Fetch data when filterCategoryList, filterSubcategoryList, or sortBy changes
    useEffect(() => {
        fetchData();
    }, [filterCategoryList, filterSubcategoryList, sortBy]);

    const handleOnChangeSortBy = (e) => {
        const { value } = e.target;
        setSortBy(value);
    };

    return (
        <div className='container mx-auto p-4'>
            <div className='hidden lg:grid grid-cols-[200px,1fr]'>
                <div className='bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll'>
                    {/* Sort by section */}
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

                    {/* Category section */}
                    <div>
                        <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Category</h3>
                        <form className='text-sm flex flex-col gap-2 py-2'>
                            {productCategory.map((category, index) => (
                                <div key={index}>
                                    <div className='flex items-center gap-3'>
                                        <input type='checkbox' name={"category"} checked={selectCategory[category.value]} value={category.value} id={category.value} onChange={handleSelectCategory} />
                                        <label htmlFor={category.value}>{category.label}</label>
                                    </div>
                                    <div className='ml-5'>
                                        {category.subcategories?.map((subcategory, subIndex) => (
                                            <div className='flex items-center gap-3' key={subIndex}>
                                                <input type='checkbox' name={"subcategory"} checked={selectSubcategory[subcategory.value]} value={subcategory.value} id={subcategory.value} onChange={handleSelectSubcategory} />
                                                <label htmlFor={subcategory.value}>{subcategory.label}</label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </form>
                    </div>
                </div>

                {/* Display Products */}
                <div className='px-4'>
                    <p className='font-medium text-slate-800 text-lg my-2'>Search Results: {data.length}</p>
                    <div className='min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]'>
                        {
                            data.length !== 0 && !loading && (
                                <VerticalCard data={data} loading={loading} />
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CategoryProduct;
