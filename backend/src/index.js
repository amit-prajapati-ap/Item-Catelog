import {connectDB} from './config/db.config.js';
import 'dotenv/config';
import app from './app.js';

// MongoDB connection
connectDB()
.then(()=> {
    app.on("error", (error)=> {
        console.log("Error in Index File: ", error)
        throw error
    })
    app.listen(process.env.PORT || 3001, () => {
        console.log(`http://localhost:${process.env.PORT}`)
    })
})
.catch(error => {
    console.log("MongoDB Connection failed in Index File !!", error)
})