const News  = require("../models/newsModel");
const ImageToBase64 = require("image-to-base64");

const addNews = async(req,res)=>{
    try {
        console.log(req.body);
        const{title,content,author,filter} = req.body;
        const base64Data = await ImageToBase64(req.files.newsImage.path)

        const news  = await News.create({
            author,content,filter,newsImage:`data: ${req.files.newsImage.type};base64,${base64Data}`,addedAt:Date.now()
        })

        if(news)
        {
            res.status(201).json({
                success:true,
                msg:"Successfully Added news",
                data:news
            })
        }
        else 
        {
            res.status(400).json({
                success:false,
                msg:"Invalid news Data"
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Internal Server Error",
            // data: new_filter
        });
    }
}

const getallNews = async(req,res,next)=>{
    try {
        const news = await News.find({});
        res.json({
            success:true,
            data:news
            })
    } catch (error) {
       res.status(500).json({
           success: false,
           msg: "Internal Server Error"
       })
    }
}
module.exports = {
    addNews,
    getallNews

}