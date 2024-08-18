const orderDetail = require("../../models/order")

const orderDetail = new Order({
    userId: 'some_user_id',
    products: [
        {
            productId: 'some_product_id',
            productName: 'Sample Product',
            brandName: 'Sample Brand',
            category: 'Sample Category',
            productImage: ['image1.png'],
            description: 'Sample description',
            price: 100,
            sellingPrice: 80,
            quantity: 1
        }
    ],
    amount: 80,
    status: 'Pending',
    paymentId: 'payment_id',
    orderId: 'order_id'
});

orderDetail.save()
    .then(() => console.log('Order saved successfully!'))
    .catch(err => console.error('Error saving order:', err));