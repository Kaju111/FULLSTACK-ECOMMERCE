import { Request } from "express";
import { TryCatch } from "../middlewares/error.js";
import { NewProductRequestBody, SearchRequestQuery, BaseQuary } from "../types/type.js";
import { Product } from "../models/product.js";
import ErrorHandler from "../utils/utilityClass.js";
import { rm } from "fs";
import { faker } from "@faker-js/faker"

export const newProduct = TryCatch
    (async (req: Request<{}, {}, NewProductRequestBody>, res, next) => {

        const { name, price, category, stock } = req.body
        const photo = req.file

        if (!photo) return next(new ErrorHandler("please add photo", 400))

        if (!name || !price || !category || !stock) {

            rm(photo.path, () => {
                console.log("Deleted")
            })


            return next((new ErrorHandler("please enter all fields", 400)))

        }

        await Product.create({
            name,
            price,
            stock,
            category: category.toLowerCase(),
            photo: photo.path
        })
        return res.status(201).json({
            success: true,
            message: "Product Created Successfully"
        })
    })




export const getlatestProducts = TryCatch(async (req, res, next) => {

    const products = await Product.find({}).sort({ createdAt: -1 }).limit(5)


    return res.status(200).json({
        success: true,
        products,
    })
})


export const getAllCategories = TryCatch(async (req, res, next) => {

    const categories = await Product.distinct("category")


    return res.status(200).json({
        success: true,
        categories,
    })
})


export const getAdminProducts = TryCatch(async (req, res, next) => {

    const products = await Product.find({})

    return res.status(200).json({
        success: true,
        products,
    })
})

export const getSingleProduct = TryCatch(async (req, res, next) => {
    const product = await Product.findById(req.params.id)

    if (!product) return next(new ErrorHandler("Product not found", 404))
    return res.status(200).json({
        success: true,
        product,
    })
})


export const updateProduct = TryCatch
    (async (req, res, next) => {
        const { id } = req.params
        const { name, price, category, stock } = req.body
        const photo = req.file
        const product = await Product.findById(id)

        if (!product) return next(new ErrorHandler("Product not found", 404))


        if (photo) {
            rm(product.photo, () => {
                console.log("Old photo Deleted")
            })
            product.photo = photo.path
        }

        if (name) product.name = name
        if (price) product.price = price
        if (stock) product.stock = stock
        if (category) product.category = category

        await product.save()

        return res.status(200).json({
            success: true,
            message: "Product Updated Successfully"
        })
    })



export const deleteProduct = TryCatch(async (req, res, next) => {
    const product = await Product.findById(req.params.id)
    if (!product) return next(new ErrorHandler("Product not found", 404))

    rm(product.photo, () => {
        console.log("Product photo deleted")
    })

    await Product.deleteOne()

    return res.status(200).json({
        success: true,
        message: "Product deleted Successfully"
    })
})


export const getAllProducts = TryCatch(async (req: Request<{}, {}, {}, SearchRequestQuery>, res, next) => {

    const { search, sort, category, price } = req.query

    const page = Number(req.query.page) || 1

    const limit = Number(process.env.PRODUCT_PER_PAGE) || 8
    const skip = (page - 1) * limit

    const baseQuary: BaseQuary = {};

    if (search) baseQuary.name = {
        $regex: search,
        $option: "i"
    };

    if (price)
        baseQuary.price = {
            $lte: Number(price),
        };

    if (category)
        baseQuary.category = category

    const productsPromise = Product.find(baseQuary)
        .sort(sort && { price: sort === "asc" ? 1 : -1 })
        .limit(limit)
        .skip(skip)

    const [products, filteredOnlyProduct] = await Promise.all([
        productsPromise,
        Product.find(baseQuary)

    ])


    const totalPage = Math.ceil(filteredOnlyProduct.length / limit)

    return res.status(200).json({
        success: true,
        products,
        totalPage,
    })
})

const generateRandomProduct = async (count: Number = 10) => {
    const products = []

    for (let i = 0; i < count; i++) {
        const product = {
            name: faker.commerce.productName(),
            photo: "uploads/193846e8-97d7-4e0e-98aa-2f30fe9441c3.png",
            price: faker.commerce.price({ min: 1500, max: 8000, dec: 0 }),
            stock: faker.commerce.price({ miin: 0, max: 100, dec; 0}),
            category: faker.commerce.department(),
            createdAt: new Data(faker.date.past()),
            updatedAt: new Date(faker.date.recent()),
            _v: 0
        }
        products.push(product)
    }

    await Product.create(products)

    console.log({ success: true })

}




















