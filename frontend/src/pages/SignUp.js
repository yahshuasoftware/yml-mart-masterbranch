import React, { useState, useEffect } from 'react';
import loginIcons from '../assest/signin.gif' // Corrected asset path
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import imageTobase64 from '../helpers/imageTobase64';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
    profilePic: '',
    mobileNo: '',
    referralCode: '' // Referral code field
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Parse referral code from URL query params
    const queryParams = new URLSearchParams(location.search);
    const referralCode = queryParams.get('referralCode');
    if (referralCode) {
      setData((prev) => ({
        ...prev,
        referralCode
      }));
    }
  }, [location.search]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imagePic = await imageTobase64(file);
      setData((prev) => ({
        ...prev,
        profilePic: imagePic
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.password === data.confirmPassword) {
      try {
        const response = await fetch(SummaryApi.signUP.url, {
          method: SummaryApi.signUP.method,
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        const result = await response.json();
        if (result.success) {
          toast.success(result.message);
          navigate('/login');
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        toast.error('An error occurred. Please try again.');
      }
    } else {
      toast.error('Passwords do not match.');
    }
  };

  return (
    <section id='signup'>
      <div className='mx-auto container p-4'>
        <div className='bg-white p-5 w-full max-w-sm mx-auto rounded-lg shadow-md'>
          <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
            <div>
              <img src={data.profilePic || loginIcons} alt='Profile' />
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

          <form className='pt-6 flex flex-col gap-4' onSubmit={handleSubmit}>
            <div className='grid'>
              <label htmlFor='name'>Name: </label>
              <div className='bg-slate-100 p-2'>
                <input
                  type='text'
                  id='name'
                  placeholder='Enter Your Name'
                  name='name'
                  value={data.name}
                  onChange={handleOnChange}
                  required
                  className='w-full h-full outline-none bg-transparent'
                />
              </div>
            </div>
            <div className='grid'>
              <label htmlFor='email'>Email: </label>
              <div className='bg-slate-100 p-2'>
                <input
                  type='email'
                  id='email'
                  placeholder='Enter Email'
                  name='email'
                  value={data.email}
                  onChange={handleOnChange}
                  required
                  className='w-full h-full outline-none bg-transparent'
                />
              </div>
            </div>
            <div className='grid'>
              <label htmlFor='mobileNo'>Mobile No: </label>
              <div className='bg-slate-100 p-2'>
                <input
                  type='number'
                  id='mobileNo'
                  placeholder='Enter Mobile No'
                  name='mobileNo'
                  value={data.mobileNo}
                  onChange={handleOnChange}
                  required
                  className='w-full h-full outline-none bg-transparent'
                />
              </div>
            </div>
            <div className='grid'>
              <label htmlFor='referralCode'>Referral Code (optional): </label>
              <div className='bg-slate-100 p-2'>
                <input
                  type='text'
                  id='referralCode'
                  placeholder='Referral Code'
                  name='referralCode'
                  value={data.referralCode}
                  onChange={handleOnChange}
                  className='w-full h-full outline-none bg-transparent'
                />
              </div>
            </div>
            <div className='grid'>
              <label htmlFor='password'>Password: </label>
              <div className='bg-slate-100 p-2 flex items-center'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id='password'
                  placeholder='Enter Password'
                  value={data.password}
                  name='password'
                  onChange={handleOnChange}
                  required
                  className='w-full h-full outline-none bg-transparent'
                />
                <div className='cursor-pointer text-xl ml-2' onClick={() => setShowPassword((prev) => !prev)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>
            <div className='grid'>
              <label htmlFor='confirmPassword'>Confirm Password: </label>
              <div className='bg-slate-100 p-2 flex items-center'>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id='confirmPassword'
                  placeholder='Confirm Password'
                  value={data.confirmPassword}
                  name='confirmPassword'
                  onChange={handleOnChange}
                  required
                  className='w-full h-full outline-none bg-transparent'
                />
                <div className='cursor-pointer text-xl ml-2' onClick={() => setShowConfirmPassword((prev) => !prev)}>
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>
            <button
              type='submit'
              className='bg-sky-600 hover:bg-sky-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'
            >
              Sign Up
            </button>
          </form>

          <p className='my-5 text-center'>
            Already have an account?{' '}
            <Link to={"/login"} className='text-sky-600 hover:text-sky-700 hover:underline'>
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
