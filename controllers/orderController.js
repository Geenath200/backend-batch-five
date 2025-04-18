import Order from "../models/order.js"
import Product from "../models/product.js"



export async function createOrder(req,res){
    if(req.user == null){
        res.status(403).json({
            message : "Please login and try again"
        })
        return
    }
    const orderInfo = req.body

    if(orderInfo.name == null){
        orderInfo.name = req.user.fistName + "" + req.user.lastName
    }

    let orderId = "CBC00001"

    const lastOrder = await Order.find().sort({data : -1}).limit(1)

    if(lastOrder.length > 0){
        const lastOrderId = lastOrder[0].orderTd

        const lastOrderNumberString = lastOrderId.replace("CBC", "")//
        const lastOrderNumber = ParseInt(lastOrderNumberString)
        const newOrderNumber = lastOrderNumber + 1
        const newOrderNumberString = String(newOrderNumber).padStart(5, '0');
        orderId = "CBC" + newOrderNumberString

    }
    
    try{
        let total = 0;
        let labelledTotal = 0;
        const products = []

        for(let i=0; i<orderInfo.products.length; i++){
            const item = await Product.findOne({productId : orderInfo.products[i].productId})
            if(item == null){
                res.status(404).json({
                    message : "Product with productId" + orderInfo.products[i].productId + "not found"
                })
                return
            }
            if(item.isAvailable == false){
                res.status(404).json({
                    message : "Product with productId" + orderInfo.products[i].productId + "is not available right now"
                })
                return
            }
            products[i] = {
                productInfo : {
                    productId : item.productId,
                    name : item.name,
                    altNames : item.altNames,
                    discription : item.discription,
                    images : item.images,
                    labelledPrice : item.labelledPrice,
                    price : item.price
                },
                quanlity : orderInfo.products[i].qty
            }
            total = total + (item.price * orderInfo.products[i].qty)
            labelledTotal = labelledTotal + (item.labelledPrice * orderInfo.products[i].qty)
        }

        const order = new order({
            orderId : orderId,
            email: req.user.email,
            name : orderInfo.name,
            address : orderInfo.address,
            totle : 0,
            products : []
        })

        const createdOrder = await order.save()
        res,json({
            message : "Order created successfully", 
            order : createdOrder
        })
    }catch(err){
        res.status(500).json({
            message : "Failed to create order",
            error : err
        })
    }





}