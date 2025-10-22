import UserPlant from '../models/userPlantSchema.mjs';
import User from '../models/userSchema.mjs';

// Create a new userPlant --------------------------------
const createUserPlant = async (req, res) => {
        try {
            const { user, name, plantId, season, datePlanted, lastWatered, lastFed, feedingFrequency } = req.body;

            if(!user || !season || !name ){
                return res.status(400).json({ msg: `The fields: user (userId), season and name are required`});
            }

            

            const existingUser = await User.findOne({ _id: user });

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
                lastFed,
                feedingFrequency
            });

            console.log("testing...");

            res.json({ msg: "New User Plant Created: ", newUserPlant});
        } catch (err) {
            console.error(err.message);
            res.status(500).json({msg: err.message});
        }
    }

// Get all user plants by user id ---------------------------
const getAllUsersPlants = async (req, res) => {
        try {
            const user = req.params.id;

            const userPlants = await UserPlant.find({ user: user });  // try .populate('plantId')

            if(!userPlants){
                res.status(404).json({ msg: `User with ID: ${user} either does not have plants or does not exist`});
            }

            res.json(userPlants);
            
        } catch (err) {
            console.error(err.message);
            res.status(500).json({msg: err.message});
        }
    }

// Update a userPlant by id --------------------------------------
const updateUserPlant = async (req, res) => {
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
    }

// Delete userPlant by id ---------------------------------------------
const deleteUserPlant = async (req, res) => {
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
    }



export default { createUserPlant, getAllUsersPlants, updateUserPlant, deleteUserPlant }