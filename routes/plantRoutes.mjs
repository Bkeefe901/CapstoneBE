import { Router } from "express";
import auth from '../middleware/basicAuth.mjs';
import adminAuth from '../middleware/adminAuth.mjs';
import Plant from '../models/plantSchema.mjs';

const router = Router();

router.route("/")
    // @route: POST api/plant
    // @desc: Create new plant
    // @access: Private
    .post(auth, adminAuth, async (req, res) => {
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
    })
    // @route: GET api/plant
    // @desc: Get all plants
    // @access: Public
    .get(async (req, res) => {
        try {
            const allPlants = await Plant.find({});
            res.json(allPlants);
        } catch (err) {
            console.error(err.message);
            res.status(500).json({msg: err.message});
        }
    });

router.route("/:id")
    // @route: GET api/plant/:id
    // @desc: Get plant by id
    // @access: Public
    .get(async (req, res) => {
        try {
            const id = req.params.id;
            const plant = await Plant.findById(id);
            res.json(plant); 
        } catch (err) {
            console.error(err.message);
            res.status(500).json({msg: err.message});
        }
    })
    // @route: PUT api/plant/:id
    // @desc: update plant by id
    // @access: Private
    .put(auth, adminAuth, async (req, res) => {
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
    })
    // @route: DELETE api/plant/:id
    // @desc: delete plant by id
    // @access: Private
    .delete(auth, adminAuth, async (req, res) => {
        try {
            const deletedPlant = await Plant.findByIdAndDelete(req.params.id);
            res.json({ msg: "Plant Deleted: ", deletedPlant})
        } catch (err) {
            console.error(err.message);
            res.status(500).json({msg: err.message});
        }
    })








export default router;




