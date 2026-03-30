import mongoose from mongoose

const connectDB =  async()=>{
    await mongoose.connect(process.env.MONGOBB_URI)
    console.log(`Db connecte ${conn.connection.host}`)

}

export default connectDB 