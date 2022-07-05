import express from "express";
import { updateUser, deleteUser, getUser, getUsers } from "../controllers/User.js";
import { verifyToken, verifyUser, verifyAdmin } from "../utils/verifyToken.js";

// const { User } = require("../models/User");

const router = express.Router();

/*

                                   // first get executed          // executed after verifyToken    
router.get("/checkauthentication", verifyToken, (req, res, next)=>{
    res.send("You are logged in");     // after verfication this part will get run
})

router.get("/checkuser/:id", verifyUser, (req, res, next)=>{
    res.send("hello user, You are logged in and you can delete your account");
})

router.get("/checkadmin/:id", verifyAdmin, (req, res, next)=>{
    res.send("hello admin, You are logged in and you can delete all accounts");
})

*/



//UPDATE

router.put("/:id", verifyUser, updateUser);

//DELETE

router.delete("/:id", verifyUser, deleteUser);


//GET

router.get("/:id", verifyUser, getUser);

//GET ALL

router.get("/", verifyAdmin, getUsers);

export default router;