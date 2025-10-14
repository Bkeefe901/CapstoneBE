import User from '../models/userSchema.mjs';
import { Router } from "express";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { check, validationResult } from 'express-validator';

const router = Router();

router.route("/")
    .post([
        check("userName", "Please inclued a valid username").isLength({ min: 4}),
        check("password", "Password must be at least 6 characters long").isLength({ min: 6 }),
        check("email", "Please include a valid email").isEmail(),
    ], async (req, res)=>{
        try {
            const { userName, email, password } = req.body;

            let user = await User.findOne({ email });

            if(user) {
                return res.status(400).json({msg: "User Exists"});
            }

            user = new User({
                userName,
                email,
                password,
                isAdmin: false,
            });

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);

            await user.save();

            const payload = {
                user: {
                    id: user._id
                },
            };

            jwt.sign(
                payload,
                process.env.jwtSecret,
                { expiresIn: "8h" },
                (err, token) => {
                    if (err) throw err;

                    res.status(201).json({ token });
                }
            );
            
        } catch (err) {
            console.error(err.message);
            res.status(500).json({msg: err.message})
        }
    });



export default router;











