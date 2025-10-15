import { Router } from "express";
import { check, validationResult } from "express-validator";
import dotenv from 'dotenv';
import auth from '../middleware/basicAuth.mjs';
import User from '../models/userSchema.mjs';
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';


dotenv.config();
const router = Router();

router.route("/")
    // @route: GET api/auth
    // @desc: find user by id
    // @access: Private 
    .get(auth, async (req, res)=>{
        try {
            const user = await User.findById(req.body.id).select("-password");
            
            res.json(user);
        } catch (err) {
            console.error(err.message);
            res.status(500).json({msg: err.message})
        }
    })
    // @route: POST api/auth
    // @desc: Login and authenticate user
    // @access: Public
    .post(
        [
        check("password", "Please Include a password").not().isEmpty(),
        check("email", "Please include an email").not().isEmpty(),
        ],
        async (req, res)=>{
            const errors = validationResult(req);

            if(!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            try {
                const { email, password } = req.body;

                let user = await User.findOne({ email });

                if(!user){
                    return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
                }

                const isMatch = await bcrypt.compare(password, user.password);

                if (!isMatch){
                    return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
                }

                const payload = {
                    user: {
                        id: user._id,
                    },
                };

                jwt.sign(
                    payload,
                    process.env.jwtSecret,
                    { expiresIn: "1h" },
                    (err, token) => {
                        if (err) throw err;

                        res.status(201).json({ token });
                    }
                )


                
                
            } catch (err) {
                console.error(err.message);
                res.status(500).json({msg: err.message})
            }
    });

export default router;



    




    // (async (req, res)=>{
    //     try {
            
            
    //     } catch (err) {
    //         console.error(err.message);
    //         res.status(500).json({msg: err.message})
    //     }
    // })