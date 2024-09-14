import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import productCategory from '../helpers/productCategory'
import VerticalCard from '../components/VerticalCard'
import SummaryApi from '../common'

const CategoryProduct = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()

    const urlSearch = new URLSearchParams(location.search)
    const urlCategoryListinArray = urlSearch.getAll("category")

    const urlCategoryListObject = {}
    urlCategoryListinArray.forEach(el => {
        urlCategoryListObject[el] = true
    })

    const [selectCategory, setSelectCategory] = useState(urlCategoryListObject)
    const [filterCategoryList, setFilterCategoryList] = useState([])

    const [sortBy, setSortBy] = useState("")

    // Fetch data based on selected categories and sortBy
    const fetchData = async () => {
        setLoading(true)
        const response = await fetch(SummaryApi.filterProduct.url, {
            method: SummaryApi.filterProduct.method,
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                category: filterCategoryList,
                sortBy: sortBy
            })
        })

        const dataResponse = await response.json()
        setData(dataResponse?.data || [])
        setLoading(false)
    }

    const handleSelectCategory = (e) => {
        const { value, checked } = e.target

        setSelectCategory((prev) => ({
            ...prev,
            [value]: checked
        }))
    }

    // Update filterCategoryList and URL based on selected categories
    useEffect(() => {
        const arrayOfCategory = Object.keys(selectCategory).map(categoryKeyName => {
            if (selectCategory[categoryKeyName]) {
                return categoryKeyName
            }
            return null
        }).filter(el => el)

        setFilterCategoryList(arrayOfCategory)

        const urlFormat = arrayOfCategory.map((el, index) => {
            if ((arrayOfCategory.length - 1) === index) {
                return `category=${el}`
            }
            return `category=${el}&&`
        })

        navigate("/product-category?" + urlFormat.join(""))
    }, [selectCategory, navigate])

    // Fetch data when filterCategoryList or sortBy changes
    useEffect(() => {
        fetchData()
    }, [filterCategoryList, sortBy])

    const handleOnChangeSortBy = (e) => {
        const { value } = e.target
        setSortBy(value)
    }

    return (
        <div className='container mx-auto p-4'>
            {/***desktop version */}
            <div className='hidden lg:grid grid-cols-[200px,1fr]'>
                {/***left side */}
                <div className='bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll'>
                    {/**sort by */}
                    <div className=''>
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

                    {/**filter by */}
                    <div className=''>
                        <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Category</h3>

                        <form className='text-sm flex flex-col gap-2 py-2'>
                            {
                                productCategory.map((categoryName, index) => (
                                    <div className='flex items-center gap-3' key={index}>
                                        <input type='checkbox' name={"category"} checked={selectCategory[categoryName?.value]} value={categoryName?.value} id={categoryName?.value} onChange={handleSelectCategory} />
                                        <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                                    </div>
                                ))
                            }
                        </form>
                    </div>
                </div>

                {/***right side (product) */}
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
    )
}

export default CategoryProduct
