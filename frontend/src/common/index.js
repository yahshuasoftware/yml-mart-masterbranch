const backendDomin = "http://localhost:8080"

const SummaryApi = {
    signUP : {
        url : `${backendDomin}/api/signup`,
        method : "post"
    },
    signIn : {
        url : `${backendDomin}/api/signin`,
        method : "post"
    },
    current_user : {
        url : `${backendDomin}/api/user-details`,
        method : "get"
    },
    logout_user : {
        url : `${backendDomin}/api/userLogout`,
        method : 'get'
    },
    allUser : {
        url : `${backendDomin}/api/all-user`,
        method : 'get'
    },
    updateUser : {
        url : `${backendDomin}/api/update-user`,
        method : "post"
    },
    uploadProduct : {
        url : `${backendDomin}/api/upload-product`,
        method : 'post'
    },
    uploadAddress : {
        url : `${backendDomin}/api/user-details`,
        method : 'post'
    },
    uploadBanner: {
        url : `${backendDomin}/api/upload-banner`,
        method : 'post'
    },
    uploadAdBanner: {
        url : `${backendDomin}/api/upload-adbanner`,
        method : 'post'
    },
    getOrders : {
        url : `${backendDomin}/api/dashboard`,
        method : 'get'
    },
    allProduct : {
        url : `${backendDomin}/api/get-product`,
        method : 'get'
    },
    allBanner : {
        url : `${backendDomin}/api/all-banner`,
        method : 'get'
    },
    allAdBanner : {
        url : `${backendDomin}/api/all-adbanner`,
        method : 'get'
    },
    updateProduct : {
        url : `${backendDomin}/api/update-product`,
        method  : 'post'
    },
    deleteProduct: {
        url: `${backendDomin}/api/delete-product`,
        method: 'delete' 
      },
    categoryProduct : {
        url : `${backendDomin}/api/get-categoryProduct`,
        method : 'get'
    },
    categoryWiseProduct : {
        url : `${backendDomin}/api/category-product`,
        method : 'post'
    },
    productDetails : {
        url : `${backendDomin}/api/product-details`,
        method : 'post'
    },
    addToCartProduct : {
        url : `${backendDomin}/api/addtocart`,
        method : 'post'
    },
    buyNow : {
        url : `${backendDomin}/api/buyNow`,
        method : "post"
    },
    addToCartProductCount : {
        url : `${backendDomin}/api/countAddToCartProduct`,
        method : 'get'
    },
    addToCartProductView : {
        url : `${backendDomin}/api/view-card-product`,
        method : 'get'
    },
    updateCartProduct : {
        url : `${backendDomin}/api/update-cart-product`,
        method : 'post'
    },
    deleteCartProduct : {
        url : `${backendDomin}/api/delete-cart-product`,
        method : 'post'
    },
    searchProduct : {
        url : `${backendDomin}/api/search`,
        method : 'get'
    },
<<<<<<< HEAD
    filterProduct: {
        url: `${backendDomain}/api/filter-product`,
        method: 'post',
    },
    // KYC Routes
    submitKYC: {
        url: `${backendDomain}/api/kyc`,
        method: 'post',
    },
    requestOtp: {
        url: 'http://localhost:8080/api/send-otp',
        method: 'POST',
      },
      verifyOtp: {
        url: 'http://localhost:8080/api/verify-otp',
        method: 'POST',
      },
      fetchUserDetails: {
        url: 'http://localhost:8080/api/user-details',
        method: 'GET',
      },
      fetchUserAddToCart: {
        url: 'http://localhost:8080/api/user-cart',
        method: 'GET',
      },
};
=======
    filterProduct : {
        url : `${backendDomin}/api/filter-product`,
        method : 'post'
    }
}
>>>>>>> 8884386f3355412c76c0c9a9cc4f862a04d258fa


export default SummaryApi