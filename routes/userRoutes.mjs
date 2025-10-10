import { Router } from "express";



const router = Router();

router.route("/")
    .post(async (req, res)=>{
        try {

            
        } catch (err) {
            console.error(err.message);
            res.status(500).json({msg: err.message})
        }
    })








// (async (req, res)=>{
//         try {
            
            
//         } catch (err) {
//             console.error(err.message);
//             res.status(500).json({msg: err.message})
//         }
//     })