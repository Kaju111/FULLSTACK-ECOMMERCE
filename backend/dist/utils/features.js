import mongoose from "mongoose";
export const connectDB = () => {
    mongoose.connect("mongodb://localhost:27019/test", {
        dbName: "Ecommerce"
    }).then(c => console.log(`DB Connected to ${c.connection.host}`)).catch((e) => console.log(e));
};
