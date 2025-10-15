import Plant from '../models/plantSchema.mjs';


// Create a new plant ----------------------------------------
let createNewPlant = async (req, res) => {  
        try {
            const { name, feedingFrequency, sunlightReqs, daysToHarvest, description, imageURL } = req.body;

            if(!name || !sunlightReqs || !description){
                return res.status(400).json({msg: `The fields: name, sunlightReqs and description are required`});
            }

            const isPlant = await Plant.findOne({ name });

            if(isPlant){
                return res.status(400).json({msg: `A plant with that name already exists in the database`});
            }

            const plant = await Plant.create({
                name,
                feedingFrequency,
                sunlightReqs,
                daysToHarvest,
                description,
                imageURL
            });

            res.status(201).json(plant);
            
        } catch (err) {
            console.error(err.message);
            res.status(500).json({msg: err.message});
        }
    }


// Get all plant data --------------------------------------
const getAllPlants = async (req, res) => {
        try {
            const allPlants = await Plant.find({});
            res.json(allPlants);
        } catch (err) {
            console.error(err.message);
            res.status(500).json({msg: err.message});
        }
    }

// Get a plant by id --------------------------------------
const getPlantById = async (req, res) => {
        try {
            const id = req.params.id;
            const plant = await Plant.findById(id);
            res.json(plant); 
        } catch (err) {
            console.error(err.message);
            res.status(500).json({msg: err.message});
        }
    }


// Update plant by id -------------------------------------
const updatePlant = async (req, res) => {
        try {
            const updatedPlant = await Plant.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true,
                    runValidators: true,
                }
            );

            if (!updatedPlant) {
                return res.status(404).json({msg: "Plant not found"});
            }
            res.json(updatedPlant);
        } catch (err) {
            console.error(err.message);
            res.status(500).json({msg: err.message});
        }
    }

// Delete a plant by id ------------------------------------
const deletePlant = async (req, res) => {
        try {
            const deletedPlant = await Plant.findByIdAndDelete(req.params.id);
            res.json({ msg: "Plant Deleted: ", deletedPlant})
        } catch (err) {
            console.error(err.message);
            res.status(500).json({msg: err.message});
        }
    }



export default { createNewPlant, getAllPlants, getPlantById, updatePlant, deletePlant }