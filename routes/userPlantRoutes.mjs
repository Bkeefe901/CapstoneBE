import { Router } from "express";
import auth from '../middleware/basicAuth.mjs';
import UserPlant from '../models/userPlantSchema.mjs';
import User from '../models/userSchema.mjs';


const router = Router();

router.route("/")
    // @route: POST api/userplant
    // @desc: create a new userPlant
    // @access: Private 
    .post(auth, async (req, res) => {
        try {
            const { user, name, plantId, season, datePlanted, lastWatered, lastFed } = req.body;

            if(!user || !season || !name ){
                return res.status(400).json({ msg: `The fields: user (userId), season and name are required`});
            }

            const existingUser = await User.findById(user);

            if(!existingUser){
                return res.status(400).json({ msg: `No user exists with the ID: ${user}`});
            }

            let newUserPlant = await UserPlant.create({
                user,
                name,
                plantId,
                season,
                datePlanted,
                lastWatered,
                lastFed
            });

            res.json({ msg: "New User Plant Created: ", newUserPlant});
        } catch (err) {
            console.error(err.message);
            res.status(500).json({msg: err.message});
        }
    })

router.route("/user/:id")
    // @route: GET api/userplant/user/:id
    // @desc: get all userPlants for a specific userId
    // @access: Private
    .get(auth, async (req, res) => {
        try {
            const user = req.params.id;

            const userPlants = await UserPlant.find({ user: user });

            if(!userPlants){
                res.status(404).json({ msg: `User with ID: ${user} either does not have plants or does not exist`});
            }

            res.json(userPlants);
            
        } catch (err) {
            console.error(err.message);
            res.status(500).json({msg: err.message});
        }
    })
    
router.route("/:id")
    // @route: PUT api/userplant/:id
    // @desc: Update userPlant by id
    // @access: Private
    .put(auth, async (req, res) => {
        try {
            const updatedUserPlant = await UserPlant.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true,
                    runValidators: true,
                }
            );

            if(!updatedUserPlant){
                res.status(404).json({ msg: `The userPlant with id: ${req.params.id}, does not exist`});
            }
            res.json({ msg: `UserPlant was updated: `, updatedUserPlant});
        } catch (err) {
            console.error(err.message);
            res.status(500).json({msg: err.message});
        }
    })
    // @route: DELETE api/userplant/:id
    // @desc: delete userPlant by id
    // @access: Private
    .delete(auth, async (req, res) => {
        try {
            const deletedUserPlant = await UserPlant.findByIdAndDelete(req.params.id);

            if(!deletedUserPlant){
                res.status(404).json({ msg: `The userPlant with id: ${req.params.id}, does not exist`});
            }
            res.json({ msg: `The UserPlant was succesfully deleted`, deletedUserPlant});
        } catch (err) {
            console.error(err.message);
            res.status(500).json({msg: err.message});
        }
    })


















    // async (req, res) => {
    //     try {
            
    //     } catch (err) {
    //         console.error(err.message);
    //         res.status(500).json({msg: err.message});
    //     }
    // }