import React, { useState } from 'react';
import loginIcons from '../assest/signin.gif';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    refferredbycode: "",
    confirmPassword: "",
    profilePic: "", // Store file directly
    
  });
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUploadPic = (e) => {
    const file = e.target.files[0]; // Missing semicolon was here
    setData((prev) => ({
      ...prev,
      profilePic: file // Store the file object directly
    }))
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password === data.confirmPassword) {
      // Create a FormData object to handle file and text data
      const formData = new FormData();
      formData.append('email', data.email);
      formData.append('password', data.password);
      formData.append('name', data.name);
      formData.append('refferredbycode', data.refferredbycode);
      formData.append('mobileNo', data.mobileNo);
      formData.append('profilePic', data.profilePic); // Append the file

      const dataResponse = await fetch(SummaryApi.signUP.url, {
        method: SummaryApi.signUP.method,
        body: formData // Send as FormData
      });

      const dataApi = await dataResponse.json();
      console.log(dataApi.message);

      if (dataApi.success) {
        toast.success(dataApi.message);
        navigate("/login");
      } else if (dataApi.error) {
        toast.error(dataApi.message);
      }

    } else {
      toast.error("Please check password and confirm password");
    }
  };

  return (
    <section id='signup'>
      <div className='mx-auto container p-4'>
        <div className='bg-white p-5 w-full max-w-sm mx-auto'>
          <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
            <div>
              <img src={data.profilePic ? URL.createObjectURL(data.profilePic) : loginIcons} alt='login icons' />
            </div>
            <form>
              <label>
                <div className='text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full'>
                  Upload Photo
                </div>
                <input type='file' className='hidden' onChange={handleUploadPic} />
              </label>
            </form>
          </div>

          <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
            <div className='grid'>
              <label>Name :</label>
              <div className='bg-slate-100 p-2'>
                <input 
                  type='text' 
                  placeholder='Enter Your Name' 
                  name='name'
                  value={data.name}
                  onChange={handleOnChange}
                  required
                  className='w-full h-full outline-none bg-transparent' />
              </div>
            </div>

            <div className='grid'>
              <label>Email :</label>
              <div className='bg-slate-100 p-2'>
                <input 
                  type='email' 
                  placeholder='Enter Email' 
                  name='email'
                  value={data.email}
                  onChange={handleOnChange}
                  required
                  className='w-full h-full outline-none bg-transparent' />
              </div>
            </div>

            <div className='grid'>
              <label>Mobile No :</label>
              <div className='bg-slate-100 p-2'>
                <input 
                  type='number' 
                  placeholder='Enter Mobile No' 
                  name='mobileNo'
                  value={data.mobileNo}
                  onChange={handleOnChange}
                  required
                  className='w-full h-full outline-none bg-transparent' />
              </div>
            </div>

            <div className='grid'>
              <label>Refferal Code :</label>
              <div className='bg-slate-100 p-2'>
                <input 
                  type='text' 
                  placeholder='Enter Refferal Code' 
                  name='refferredbycode'
                  value={data.refferredbycode}
                  onChange={handleOnChange}
                  className='w-full h-full outline-none bg-transparent' />
              </div>
            </div>

            <div>
              <label>Password :</label>
              <div className='bg-slate-100 p-2 flex'>
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder='Enter Password'
                  value={data.password}
                  name='password' 
                  onChange={handleOnChange}
                  required
                  className='w-full h-full outline-none bg-transparent' />
                <div className='cursor-pointer text-xl' onClick={() => setShowPassword((prev) => !prev)}>
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
            </div>

            <div>
              <label>Confirm Password :</label>
              <div className='bg-slate-100 p-2 flex'>
                <input 
                  type={showConfirmPassword ? "text" : "password"} 
                  placeholder='Enter Confirm password'
                  value={data.confirmPassword}
                  name='confirmPassword'
                  onChange={handleOnChange}
                  required
                  className='w-full h-full outline-none bg-transparent' />
                <div className='cursor-pointer text-xl' onClick={() => setShowConfirmPassword((prev) => !prev)}>
                  <span>{showConfirmPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
            </div>

            <button className='bg-sky-600 hover:bg-sky-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>
              Sign Up
            </button>
          </form>

          <p className='my-5'>Already have account ? <Link to={"/login"} className=' text-sky-600 hover:text-sky-700 hover:underline'>Login</Link></p>
        </div>
      </div>
    </section>
  );
}

export default SignUp;