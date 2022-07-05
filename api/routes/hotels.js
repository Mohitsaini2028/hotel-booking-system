import express from "express";
import { createHotel, updateHotel, deleteHotel, getHotel, getHotels, countByCity, countByType } from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";


const router = express.Router();

//CREATE

// "/:id?limit=5"
router.post("/", verifyAdmin,  createHotel);

//UPDATE

router.put("/:id", verifyAdmin, updateHotel);

//DELETE

router.delete("/:id", verifyAdmin, deleteHotel);


//GET

router.get("/find/:id", getHotel);

//GET ALL

router.get("/", getHotels);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);



// module.exports = router;

export default router;