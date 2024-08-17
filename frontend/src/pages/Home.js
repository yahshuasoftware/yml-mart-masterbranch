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

      <HorizontalCardProduct category={"electronics"} heading={"Top's Electronics"}/>
      <HorizontalCardProduct category={"groceries"} heading={"Popular's Groceries"}/>

      <VerticalCardProduct category={"medicines"} heading={"Medicines"}/>
      <VerticalCardProduct category={"fruits and vegetables"} heading={"Fruits and Vegetables"}/>
      <VerticalCardProduct category={"beauty"} heading={"Beauty"}/>
      <VerticalCardProduct category={"stationary"} heading={"Stationary"}/>
      <VerticalCardProduct category={"personal care"} heading={"Personal Care"}/>
      <VerticalCardProduct category={"home and kitchen"} heading={"Home and Kitchen"}/>
      <VerticalCardProduct category={"home care"} heading={"Home Care"}/>
      
    </div>
  )
}

export default Home