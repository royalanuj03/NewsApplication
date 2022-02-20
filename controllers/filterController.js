const Filter = require("../models/FilterModel");
const mongoose = require("mongoose");
//  add filter
const addFilter = async (req, res, next) => {
    try {
        const {filter_name}  = req.body;
        const filter = await Filter.findOne({ filter_name: filter_name });

        if (filter) {
            return res.status(401).json({
                success: false,
                msg: "Filter already exists"
            })
        }

        const new_filter = await Filter.create({filter_name});
       
        res.status(201).json({
            success: true,
            msg: "Filter Created",
            data: new_filter
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            msg: "Internal Server Error",
        });
    }
}

//  get all filter by categories

const getAllFilter = async (req, res, next) => {
     try {
         const filters = await Filter.find({});
         res.json({
             success:true,
             data:filters
             })
     } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Internal Server Error"
        })
     }
}

const deletefilter = async(req,res)=>{
    try {
        const filter = await Filter.findByIdAndDelete(req.params.filId);
        res.status(201).json({
            success:true,
            msg:"Successfully Deleted",
            data:filter
        })

        if(!filter){
            return res.status(401).json({
                success: false,
                msg: "Filter not found"
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Internal Server Error"
        })
    }
}

const editfilter = async(req,res,next)=>{
   try {
    const filter = await Filter.findByIdAndUpdate(req.params.filId,req.body,{
        new:true,
        runValidators:true
    });
    res.status(201).json({
        success:true,
        msg:"Successfully Updated",
        data:filter
    })

    if(!filter){
        return res.status(401).json({
            success: false,
            msg: "Filter not found"
        })
    }
   } catch (error) {
    res.status(500).json({
        success: false,
        msg: "Internal Server Error",
        
    })
   }
}

module.exports = {
    addFilter,
    getAllFilter,
    deletefilter,
    editfilter
}