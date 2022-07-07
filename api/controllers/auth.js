import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
    try{
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            // username:req.body.username,
            // email:req.body.email,

            ...req.body,          // takes all properties username, email, country, city etc...
            password:hash,
        })

        await newUser.save();
        console.log("user created");
        res.status(200).send("User has been created.")
    }catch(error){
        console.log("user creation error ",error);
        next(error);
    }
}

export const login = async (req, res, next) => {
    try{

        const user = await User.findOne({username:req.body.username});
        if(!user) return next(createError(404, "User Not Found!"));
                                                                    // SECRET_KEY
        const token = jwt.sign({id:user._id, isAdmin:user.is_Admin }, "sfdg464GSg+gqdED68ifgdjs6yzfSDentf3d");

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if(!isPasswordCorrect) return next(createError(404, "Wrong password or username!"));
       
        const {password, isAdmin, ...otherDetails} = user._doc;
        //           cookie_name,      configuration - by putting httpOnly no client will be able to reach here.
        res.cookie("access_token", token, { httpOnly:true })
        .status(200)
        .json({ details: {...otherDetails}, isAdmin });
    }catch(error){
        next(error);
    }
}