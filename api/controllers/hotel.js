import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import { createError } from "../utils/error.js";

export const createHotel = async (req, res, next)=>{
    
    const newHotel = new Hotel(req.body);  //enter by user 
    
    try{
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
    }catch(error){
        // res.status(500).json(error);
        next(error);
    }
}

export const updateHotel = async (req, res, next)=>{

    try{
        const updateHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, {new: true})
        res.status(200).json(updateHotel);
    }catch(error){
        next(error);
    }
}

export const deleteHotel = async (req, res, next)=>{

    try{
        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel has been Deleted");
    }catch(error){
        next(error);
    }
}

export const getHotel = async (req, res, next)=>{

    try{
        const hotel = await Hotel.findById(req.params.id)
        res.status(200).json(hotel);
    }catch(error){
        next(error);
    }
}

export const getHotels = async (req, res, next)=>{
    const {min, max, ...others} = req.query; 
    console.log("hotel route")
    try{
        const hotels = await Hotel.find({...others, cheapestPrice: {$gte: min || 1 , $lte: max || 1000000 },}).limit(req.query.limit);
                                                                    // if no minimum then 1 value 
        res.status(200).json(hotels);
    }catch(error){
        next(error);
    }
}


export const countByCity = async (req, res, next)=>{
    const cities = req.query.cities.split(",")              //split is use to tranform data into array on the basis of ','
    try{
        const list = await Promise.all(cities.map(city=>{  //Promise is used because we have to get data of more than 1 cities
            // return Hotel.find({city:city}).length    // comparatively more expensive operation - fetch all data and thier properties after that count 
            return Hotel.countDocuments({city:city})   // mongodbDocument only does the count operation without fetchings 
        }))
        res.status(200).json(list);
    }catch(error){
        next(error);
    }
}


export const countByType = async (req, res, next)=>{
    
    try{
        const hotelCount = await Hotel.countDocuments({type:"hotel"});             
        const AppartmentCount = await Hotel.countDocuments({type:"appartment"});             
        const resortCount = await Hotel.countDocuments({type:"resort"});             
        const villaCount = await Hotel.countDocuments({type:"villa"});             
        const cabinCount = await Hotel.countDocuments({type:"cabin"});

        res.status(200).json([
            {type:"hotel",count:hotelCount},
            {type:"appartment",count:AppartmentCount},
            {type:"resort",count:resortCount},
            {type:"villa",count:villaCount},
            {type:"cabin",count:cabinCount},
        ]);
    }catch(error){
        next(error);
    }
}

// export const getHotelRooms = async (req, res, next) => {
//     try{
//         const hotel = await Hotel.findById(req.params.id);
//         const list = await Promise.all(hotel.rooms.map((room)=>{
//             return Room.findById(room);                    // mapping the room inside Hotel model to Room model and returning it.
//         })
//         );
//         console.log(list)
//         res.status(200).json(list);
//     }catch(err){
//         next(err);
//     }
// }


export const getHotelRooms = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        const list = await Promise.all(
            hotel.rooms.map((room) => {
                return Room.findById(room);
            })
            );
      console.log(list)
      res.status(200).json(list)
    } catch (err) {
      next(err);
    }
  };
  