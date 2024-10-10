import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'
import AdBanner from '../components/AdBannerProduct'
import GroceryCart from '../components/GroceryCard'
import Offer from '../components/Offer'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <CategoryList/>
      <BannerProduct/>
      <Link to={"/refer"}><AdBanner/></Link>
      
      <Offer/>
      
      <GroceryCart category={"groceries"} heading={"Popular's Groceries"}/>

      <GroceryCart category={"medicines"} heading={"Medicines"}/>
      <GroceryCart category={"fruits"} heading={"Fruits & Vegetables"}/>
      <GroceryCart category={"beauty"} heading={"Beauty"}/>
      <GroceryCart category={"stationary"} heading={"Stationary"}/>
      <GroceryCart category={"personal care"} heading={"Personal Care"}/>
      <GroceryCart category={"home decor"} heading={"Home Decor"}/>
      <GroceryCart category={"home care"} heading={"Home Care"}/>
      
    </div>
  )
}

export default Home