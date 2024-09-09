const addToCartModel = require("../../models/cartProduct")
const productModel = require("../../models/productModel")

const updateAddToCartProduct = async(req,res)=>{
    try{
        const currentUserId = req.userId 
        const addToCartProductId = req?.body?._id
        const productId = req?.body?.productId
        const qty = req.body.quantity



        const product = await productModel.findById(productId);

        if (!product) {
          return res.json({
            message: "Product not found",
            error: true,
            success: false,
          });
        }
    
        // Check if the requested quantity is available
        if (qty > product.quantity) {
          return res.json({
            message: `Only ${product.quantity} item(s) left in stock`,
            availableStock: product.quantity, // Send stock data to frontend
            error: true,
            success: false,
          });
        }

        const updateProduct = await addToCartModel.updateOne({_id : addToCartProductId},{
            ...(qty && {quantity : qty})
        })

        res.json({
            message : "Product Updated",
            data : updateProduct,
            error : false,
            success : true
        })

    }catch(err){
        res.json({
            message : err?.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = updateAddToCartProduct