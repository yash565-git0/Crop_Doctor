import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
const app = express()
app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}))
app.use(express.json({limit: "80kb"}))
app.use(express.urlencoded({extended: true,limit:"80kb"}))
app.use(express.static("public"))
app.use(cookieParser())

import userRouter from "./routes/user.routes.js"
import imageRouter from "./routes/image.routes.js"
import demoRouter from "./routes/demo.routes.js"

console.log("Mounting /api/v1/users");
app.use("/api/v1/users",userRouter)

console.log("Mounting /api/v1/images");
app.use("/api/v1/images",imageRouter)

console.log("Mounting /api/v1/demo");
app.use("/api/v1/demo",demoRouter)

console.log("User routes mounted at /api/v1/users");
console.log("Image routes mounted at /api/v1/images");
console.log("Demo routes mounted at /api/v1/demo");

export { app }
