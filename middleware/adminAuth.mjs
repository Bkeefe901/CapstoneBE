import User from '../models/userSchema.mjs';

export default async function adminAuth(req, res, next){
    // Get user Id from req.user
    const id = req.body.id;

    try {
        // Get isAdmin prop from user object in DB
        const user = await User.findById(id).select("isAdmin");

        if(!user){
            return res.status(400).json({errors: [{ msg: "Invalid Credentials" }]});
        }

        if(user.isAdmin) {
            next();
        } else {
            throw new Error("❌ Area Prohibited ❌");
        }

        
    } catch (err) {
        console.error(err.message);
        res.status(403).json({errors: [{ msg: err.message }]});
    }
}