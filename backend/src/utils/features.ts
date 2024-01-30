import mongoose from "mongoose"
import { InvalidateCacheProps, OrderItemType } from "../types/type.js"
import { myCache } from "../app.js"
import { Product } from "../models/product.js"


export const connectDB = (uri: string) => {
    mongoose.connect(uri, {
        dbName: "MERN-Ecom"
    }).then(c => console.log(`DB Connected to ${c.connection.host}`)).catch(
        (e) => console.log(e)
    )
}

export const invalidateCache = async ({
    product,
    order,
    admin,
    userId,
    orderId,
    productId,
}: InvalidateCacheProps) => {
    if (product) {
        const productKeys: string[] = [
            "latest-products",
            "categories",
            "all-products",
        ]

        if (typeof productId === "string") productKeys.push(`product-${productId}`)

        if (typeof productId === "object") productId.forEach((i) => { productKeys.push(`product-${i}`) });

        myCache.del(productKeys)

    }
    if (order) {

        const orderskey: string[] = ["all-orders", `my-orders-${userId}`, `order-${orderId}`]


        myCache.del(orderskey)
    }
    if (admin) {
    }

}


export const reduceStock = async (orderItems: OrderItemType[]) => {
    for (let i = 0; i < orderItems.length; i++) {
        const order = orderItems[i];
        const product = await Product.findById(order.productId);
        if (!product) throw new Error("Product Not Found");
        product.stock -= order.quantity;
        await product.save();
    }
};

export const calculatePercentage = (thisMonth: number, lastMonth: number) => {
    if (lastMonth === 0) return thisMonth * 100;
    const percent = (thisMonth / lastMonth) * 100;
    return Number(percent.toFixed(0));
};


export const getInventories = async (
    {
        categories,
        productsCount,
    }
        :
        { categories: string[], productsCount: number }) => {
    const categoriesCountPromise = categories.map(category =>
        Product.countDocuments({ category }))

    const categoriesCount = await Promise.all(categoriesCountPromise)

    const categoryCount: Record<string, number>[] = []

    categories.forEach((category, i) => {
        categoryCount.push({
            [category]: Math.round(categoriesCount[i] / productsCount * 100),
        })
    })

    return categoryCount;
}