const mongoose=require("mongoose")

const accountSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:[true,"Account must be associated with the user"]
    },
    status:{
        enum:{
            values:["ACTIVE","FROZEN","CLOSED"],
            message:"Status can be active, frozen or closed"
        }
    },
    currency:{
        type:String,
        required:[true,"Currency is reuired for creating an account"],
        default:"INR"
    },

},{
    timestamps:true
})
const accountModel=mongoose.model("account",accountSchema)
module.exports=accountModel
