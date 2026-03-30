const mongoose=require('mongoose')

function connectToDB(){
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("DB connected 🥹")
    })
    .catch(err=>{
        console.log("Error Occured",err)
        process.exit(1)
    })
}
module.exports=connectToDB