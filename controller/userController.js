import userModel from "../model/userModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import bookingModel from "../model/bookingModel.js";

export async function userSignUp(req,res) {
    try{
        const {name,mobile,email,password}=req.body
        const hashedPassword=await bcrypt.hash(password,10);
       const newUser= new userModel({
         name:name,
         email:email,
         mobile:mobile,
         password:hashedPassword
        })
        await newUser.save()
       res.send({success:true})
    }catch(err){
        console.log(err);
    }
  }

  export async function login(req,res) {
    try{
        const { email, password } = req.body;
        const user =await userModel.findOne({email:email});
        if(user==null){
            res.json({ message: "Invalid user" });
        }
        const hashedPassword=user.password
        const matchPassword=await bcrypt.compare(password,hashedPassword)
        if(matchPassword){
            const data={id:JSON.parse(JSON.stringify(user._id)),name:user.name,email:user.email}

            const token = jwt.sign(data, "mysecretkey", { expiresIn: 86400 });
            res.json({ verify: true, token: token});
        }else{
            res.json({ verify: false, message: "Email or Password Incorrect" });
        }
    }catch(err){
        console.log(err);
    }
  }

  export async function bookFlight(req,res) {
    try{
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
          ) {
            const { flightName, form, to, fromTime, toTime, duration, totalPrice, date, adult, infants, children ,classType}=req.body
            const token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, "mysecretkey");
            if(decoded){
                const newBooking= new  bookingModel({
                  userId:decoded.id,
                  flightName:flightName,
                  from:form,
                  to:to,
                  fromTime:fromTime,
                  toTime:toTime,
                  duration:duration,
                  totalPrice:totalPrice,
                  date:date,
                  adult:adult,
                  infants:infants,
                  children:children,
                  classType:classType
                  })
                  await newBooking.save()
                  res.send({success:true})
            }
          }else{
            res.send({success:false})
          }
    }catch(err){
        console.log(err);
    }
  }


  export async function bookingHistory(req,res) {
    try{
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
          ) {
            const token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, "mysecretkey");
            if(decoded){
                let id=decoded.id
                const history= await bookingModel.find({userId:id})
               res.send({success:true,history:history})
            }
          }else{
            res.send({success:false})
          }
    }catch(err){
        console.log(err);
    }
  }