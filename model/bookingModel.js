import { model, Types,Schema } from "mongoose";

const bookingSchema=new Schema({
    userId:{type:Types.ObjectId,required:true},
    flightName:{type:String,required:true},
    from:{type:String,required:true},
    to:{type:String,required:true},
    fromTime:{type:String,required:true},
    toTime:{type:String,required:true},
    duration:{type:String,required:true},
    totalPrice:{type:Number,required:true},
    date:{type:Date,required:true},
    adult:{type:Number,required:true},
    infants:{type:Number,required:true},
    children:{type:Number,required:true},
    classType:{type:String,required:true}

})

export default model("booking",bookingSchema)