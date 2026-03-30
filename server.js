require("dotenv").config()
const app=require('./src/app')
const connectToDB=require('./src/config/db.js')


connectToDB()

app.listen(3000,()=>{
    console.log("Server is working 🥹")
})

// mongodb+srv://tijit7088_db_user:<db_password>@cluster0.7rh25rf.mongodb.net/?appName=Cluster0