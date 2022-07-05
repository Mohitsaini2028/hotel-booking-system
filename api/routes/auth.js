// const express = require("express");

import express from "express";
import { login, register } from "../controllers/auth.js";


const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// module.exports = router;
export default router;