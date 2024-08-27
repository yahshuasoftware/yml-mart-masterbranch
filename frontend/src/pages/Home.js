import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'


const Home = () => {
  return (
    <div>
      <CategoryList/>
      <BannerProduct/>
      <HorizontalCardProduct category={"groceries"} heading={"Popular's Groceries"}/>

      <HorizontalCardProduct category={"medicines"} heading={"Medicines"}/>
      <HorizontalCardProduct category={"fruits"} heading={"Fruits"}/>
      <HorizontalCardProduct category={"beauty"} heading={"Beauty"}/>
      <HorizontalCardProduct category={"stationary"} heading={"Stationary"}/>
      <HorizontalCardProduct category={"personal care"} heading={"Personal Care"}/>
      <HorizontalCardProduct category={"home decor"} heading={"Home Decor"}/>
      <HorizontalCardProduct category={"home care"} heading={"Home Care"}/>
      
    </div>
  )
}

export default Home