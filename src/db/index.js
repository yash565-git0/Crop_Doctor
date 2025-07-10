import mongoose from "mongoose";
import { DB_Name } from "../constants.js";
const connectDB = async() =>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_Name}`)
        console.log("MONGODB Connected successfuly");
        
        
    } catch (error) {
        console.log("ERROR : " , error);
        process.exit(1)
        
    }
}
export default connectDB