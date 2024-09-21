const backendDomin = "http://localhost:8000";
// const backendDomin = process.env.SERVER_URI ;

const SummaryApi = {
    signUP: {
        url: `${backendDomin}/api/signup`,
        method: "post"
    },
    signIn: {
        url: `${backendDomin}/api/signin`,
        method: "post"
    },
    current_user: {
        url: `${backendDomin}/api/user-details`,
        method: "get"
    },
    logout_user: {
        url: `${backendDomin}/api/userLogout`,
        method: 'get'
    },
    allUser: {
        url: `${backendDomin}/api/all-user`,
        method: 'get'
    },
    referralOrders: {
        url: `${backendDomin}/api/referralOrders`,
        method: 'get'
    },
    updateUser: {
        url: `${backendDomin}/api/update-user`,
        method: "post"
    },
    uploadProduct: {
        url: `${backendDomin}/api/upload-product`,
        method: 'post'
    },
    uploadAddress: {
        url: `${backendDomin}/api/user-details`,
        method: 'post'
    },
    uploadBanner: {
        url: `${backendDomin}/api/upload-banner`,
        method: 'post'
    },
    uploadAdBanner: {
        url: `${backendDomin}/api/upload-adbanner`,
        method: 'post'
    },
    getOrders: {
        url: `${backendDomin}/api/dashboard`,
        method: 'get'
    },
    allProduct: {
        url: `${backendDomin}/api/get-product`,
        method: 'get'
    },
    allBanner: {
        url: `${backendDomin}/api/all-banner`,
        method: 'get'
    },
    allAdBanner: {
        url: `${backendDomin}/api/all-adbanner`,
        method: 'get'
    },
    updateProduct: {
        url: `${backendDomin}/api/update-product`,
        method: 'post'
    },
    deleteProduct: {
        url: `${backendDomin}/api/delete-product`,
        method: 'delete'
    },
    deleteAddress: {
        url: `${backendDomin}/api/delete-address`,
        method: 'delete'
    },
    categoryProduct: {
        url: `${backendDomin}/api/get-categoryProduct`,
        method: 'get'
    },
    categoryWiseProduct: {
        url: `${backendDomin}/api/category-product`,
        method: 'post'
    },
    productDetails: {
        url: `${backendDomin}/api/product-details`,
        method: 'post'
    },
    addToCartProduct: {
        url: `${backendDomin}/api/addtocart`,
        method: 'post'
    },
    buyNow: {
        url: `${backendDomin}/api/buyNow`,
        method: "post"
    },
    addToCartProductCount: {
        url: `${backendDomin}/api/countAddToCartProduct`,
        method: 'get'
    },
    addToCartProductView: {
        url: `${backendDomin}/api/view-card-product`,
        method: 'get'
    },
    updateCartProduct: {
        url: `${backendDomin}/api/update-cart-product`,
        method: 'post'
    },
    deleteCartProduct: {
        url: `${backendDomin}/api/delete-cart-product`,
        method: 'post'
    },
    searchProduct: {
        url: `${backendDomin}/api/search`,
        method: 'get'
    },
    filterProduct: {
        url: `${backendDomin}/api/filter-product`,
        method: 'post'
    },
    uploadKYC: {
        url: `${backendDomin}/api/upload-kyc`,
        method: 'post'
    },
    getKYC: {
        url: `${backendDomin}/api/users-with-kyc`,
        method: 'get'
    },
    // Rating Routes
    saveRating: {
        url: `${backendDomin}/api/rating/saveRating`, 
        method: 'post'
    },
    getRating: {
        url: `${backendDomin}/api/rating/:itemId`,
        method: 'get'
    },
    createOrder : {
        url : `${backendDomin}/api/payment/create-order`,
        method : 'post'
    },
  
    payment_Success : {
        url : `${backendDomin}/api/payment/payment-success`,
        method : 'post'
    },
    pushAllPricesInDb : {
        url : `${backendDomin}/api/businessPrices`,
        method : 'post'
    },
    // getmyKyc: {
    //     url: `${backendDomin}/api/user-kyc/:userId`,
    //     method : 'get'
    // },
};

export default SummaryApi;
