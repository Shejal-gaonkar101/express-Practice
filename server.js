import "dotenv/config"
import app from "./src/app.js"
import connectDB from "./src/common/config/db.js"

const PORT = process.env.PORT || 5000 

const start = async()=>{
    //connect to db (Approach Mongoose)

    await connectDB()
    app.listen(PORT,()=>{
        console.log(`Server running on ${PORT}`)
    })
}

start().catch((err)=>{
    console.error("Failed to start")
    process.exit(1)
})





