import express from "express"
import { adminOnly } from "../middlewares/auth.js"
import { getAllCategories, getlatestProducts, newProduct } from "../controllers/products.js"
import { singleUpload } from "../middlewares/multer.js"

const app = express.Router()

app.post("/new", adminOnly, singleUpload, newProduct)

app.get("/latest", getlatestProducts)

app.get("/categories", getAllCategories)

export default app
