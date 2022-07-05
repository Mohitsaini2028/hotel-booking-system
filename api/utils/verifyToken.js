import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if(!token){
        return next(createError(401, "You are not authenticated!"));
    }
                      //SECRET KEY                            it will return either a error or information of user
    jwt.verify(token, "sfdg464GSg+gqdED68ifgdjs6yzfSDentf3d", (err, user)=>{

        if(err) return next(createError(401, "Token is not valid!"));
        req.user = user;
        next(); // if everything is ok then it will run to next middleware
        
    }
)

};

export const verifyUser = (req, res, next)=>{
    verifyToken(req, res, next, ()=>{
        // if user id inside JWT is equal to id send by client
        if(req.user.id === req.params.id || req.user.isAmin){
            next();
        }
        else{
            if(err) return next(createError(403, "You are not authorized!"));
        }
    })
} 


export const verifyAdmin = (req, res, next)=>{
    verifyToken(req, res, next, ()=>{
        // if user id inside JWT is equal to id send by client
        if(req.user.isAmin){
            next();
        }
        else{
            if(err) return next(createError(403, "You are not authorized!"));
        }
    })
} 