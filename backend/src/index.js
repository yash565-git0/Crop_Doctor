import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';

// --- This robustly configures your .env file path ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({
    path: path.resolve(__dirname, '../.env')
});

// --- Now we import the rest of the app, AFTER dotenv is configured ---
import { app } from "./app.js";
import connectDB from "./db/index.js";

// --- Finally, we connect to the DB and start the server ---
connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000 , () => {
        console.log(`✅ Server is running at port: ${process.env.PORT}`);
    });
})
.catch((err) => {
    console.log("❌ MongoDB connection failed !!! ", err);
});