import Room from '../Schema/roomSchema.js';
import Hotel from '../Schema/hotelSchema.js';
 
export const createRoom=async(req,res,next)=>{
    const hotelId=req.params.hotelid;
    const newRoom=new Room(req.body);
    try {
        const savedRoom=await newRoom.save();
        try {
            await Hotel.findByIdAndUpdate(hotelId,{
                $push:{rooms:savedRoom._id}
            });
        } catch (error) {
            next(error)
        }
        res.status(200).json(savedRoom)
    } catch (error) {
        next(error);
    }
}


export const updateRoom=async(req,res,next)=>{
    try {
        const udpatedRoom=await Room.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
        res.status(200).json(udpatedRoom);
    } catch (error) {
        next(error);
    }
}
export const deleteRoom=async(req,res,next)=>{
    try {
        const hotelId=req.params.hotelid;
        await Room.findByIdAndDelete(req.params.id);
        try {
            await Hotel.findByIdAndUpdate(hotelId,{
                $pull:{rooms:req.params.id}
            });
        } catch (error) {
            next(error)
        }
        res.status(200).json('Room Has Been Deleted');

    } catch (error) {
       next(error);
    }
}
export const getRoomById=async(req,res,next)=>{
    try {
       const room= await Room.findById(req.params.id);
       res.status(200).json(requireoom);
    } catch (error) {
        next(error);       
    }
}
export const getAllRooms=async(req,res,next)=>{
    try {
        const rooms=await Room.find();
        res.status(200).json(rooms);
    } catch (error) {
       next(error);
    }
}