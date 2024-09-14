
import logo from './logo.svg';
import './App.css';
import 'animate.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import SummaryApi from './common';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';
import 'animate.css';
<<<<<<< HEAD
import { ContextProvider } from './context'; 
=======


>>>>>>> 443c980903f9467bf57a51ab19d5e9c48f8791ec
function App() {
  const dispatch = useDispatch()
 
  const [totalPurchasing, setTotalPurchasing] = useState(0);

  
  const fetchUserDetails = async()=>{
      const dataResponse = await fetch(SummaryApi.current_user.url,{
        method : SummaryApi.current_user.method,
        credentials : 'include'
      })

      const dataApi = await dataResponse.json()

      if(dataApi.success){
        dispatch(setUserDetails(dataApi.data))
      }
  }







  





  useEffect(()=>{
    /**user Details */
    fetchUserDetails()
    /**user Details cart product */
    // fetchUserAddToCart()
    // fetchTotalPurchasing();


  },[])
  return (
    <>
      <ContextProvider value={{
         
          // totalPurchasing
      }}>
        <ToastContainer 
          position='top-center'
        />
        
        <Header/>
        <main className='min-h-[calc(100vh-120px)] pt-16'>
          <Outlet/>
        </main>
        <Footer/>
      </ContextProvider>
    </>
  );
}

export default App;