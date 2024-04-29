const mongoose = require("mongoose")

module.exports.connectDb=async ()=>{try {
    await mongoose.connect('mongodb+srv://karan:karan12345@cluster0.kbisa1e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=>{
        console.log("database connected successfully");
    })

} catch (error) {
    console.log(error)
}
} 

