import { model, Schema } from "mongoose";

const userSchema=new Schema({
    name: {type:String,required:true},
    mobile: {type:Number,required:true},
    email: {type:String,required:true},
    password: {type:String,required:true},
    status: {type:Boolean,default:true}
});

export default model("User",userSchema)