import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import Login from '../pages/Login'
import ForgotPassowrd from '../pages/ForgotPassowrd'
import SignUp from '../pages/SignUp'
import AdminPanel from '../pages/AdminPanel'
import SuperAdminPanel from '../pages/SupperAdminPanel' 
import AdminDashboard from '../pages/AdminDashboard'
import OrderList from '../pages/OrderList'
import AllProducts from '../pages/AllProducts'
import CategoryProduct from '../pages/CategoryProduct'
import ProductDetails from '../pages/ProductDetails'
import Cart from '../pages/Cart'
import SearchProduct from '../pages/SearchProduct'
import UserProfile from '../pages/UserProfile'
import Refer from '../pages/Refer'
import AboutCompany from '../pages/AboutCompany' 
import AskQuestion from '../pages/AskQuestion'
import ContactUs from '../pages/ContactUs'
import AllUsers from '../pages/AllUsers' // Import the All Users component
import BusinessProfile from '../pages/businessProfile/BusinessProfile'
import AllAdBanners from '../pages/AllAdBanners'
import AllBanners from '../pages/AllBanners'
import BuyNow from "../pages/buyNow"
import AllKyc from '../pages/AllKyc'

const router = createBrowserRouter([
    {
        path : "/",
        element : <App/>,
        children : [
            {
                path : "",
                element : <Home/>
            },
            {
                path : "login",
                element : <Login/>
            },
            {
                path : "about",
                element : <AboutCompany/>
            },
            {
                path : "contact",
                element : <ContactUs/>
            },
            {
                path : "businessprofile",
                element : <BusinessProfile/>
            },
            {
                path : "forgot-password",
                element : <ForgotPassowrd/>
            },
            {
                path : "sign-up",
                element : <SignUp/>
            },
            {
                path : "product-category",
                element : <CategoryProduct/>
            },
            {
                path : "product/:id",
                element : <ProductDetails/>
            },
            {
                path : "buynow",
                element : <BuyNow/>
            },
            {
                path : 'cart',
                element : <Cart/>
            },
            {
                path : "search",
                element : <SearchProduct/>
            },
            {
              path : "refer",
              element : <Refer/>
            },
            {
                path : "askquestion",
                element : <AskQuestion/>
            },
            {
                path : "user-details",
                element : <UserProfile/>
            },
            
            {
                path : "admin-panel",
                element : <AdminPanel/>,
                children : [
                    {
                        path : "all-products",
                        element : <AllProducts/>
                    },
                    {
                        path : "order-list", // Move the All Users route here
                        element : <OrderList/>
                    },
                    {
                        path : "all-banners", // Move the All Users route here
                        element : <AllBanners/>
                    },
                    {
                        path : "all-adbanners", // Move the All Users route here
                        element : <AllAdBanners/>
                    },
                ]
            },
            {
                path : "super-admin-panel", // Add the Super Admin Panel route
                element : <SuperAdminPanel/>,
                children : [
                    {
                        path : "dashboard", // Move the All Users route here
                        element : <AdminDashboard/>
                    },
                    {
                        path : "all-users", // Move the All Users route here
                        element : <AllUsers/>
                    },
                    {
                        path : "order-list", // Move the All Users route here
                        element : <OrderList/>
                    },
                    {
                        path : "all-products",
                        element : <AllProducts/>
                    },
                    {
                        path : "all-kyc",
                        element : <AllKyc/>
                    },
                    {
                        path : "all-banners", // Move the All Users route here
                        element : <AllBanners/>
                    },
                    {
                        path : "all-adbanners", // Move the All Users route here
                        element : <AllAdBanners/>
                    },
                ]
            },
        ]
    }
])

export default router