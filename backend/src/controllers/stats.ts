import { myCache } from "../app.js";
import { TryCatch } from "../middlewares/error.js";


export const getDashboardStats = TryCatch(async (req, res, next) => {

    let stats = {}

    if (myCache.has("admin-stats"))
        stats = JSON.parse(myCache.get("admin-stats") as string)
    else {

        const today = new Date()

        const startOfThisMonth = new Date(today.getFullYear(), today.getMonth(), 1)

        const startOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1)

    }

    return res.status(200).json({
        success: true,
        stats
    })
})

export const getPieCharts = TryCatch(async () => { })

export const getBarCharts = TryCatch(async () => { })

export const getLineCharts = TryCatch(async () => { })
