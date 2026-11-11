import express from "express"
import { configDotenv } from "dotenv";
import router from "./routers/users.js";
import fileUpload from "express-fileupload"
import filesRouter from "./routers/files.js";

configDotenv()

const app = express()

app.use(express.json())
app.use(fileUpload())
app.use(router)
app.use(filesRouter)

app.listen(process.env.PORT,()=>{
    console.log("server is running");
    
})