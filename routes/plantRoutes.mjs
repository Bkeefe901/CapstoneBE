import { Router } from "express";
import auth from '../middleware/basicAuth.mjs';
import adminAuth from '../middleware/adminAuth.mjs';
import plantCTRL from '../controllers/plantController.mjs';

const router = Router();

router.route("/")
    // @route: POST api/plant
    // @desc: Create new plant
    // @access: Private
    .post(auth, adminAuth, plantCTRL.createNewPlant)


    // @route: GET api/plant
    // @desc: Get all plants
    // @access: Public
    .get(plantCTRL.getAllPlants);

router.route("/:id")
    // @route: GET api/plant/:id
    // @desc: Get plant by id
    // @access: Public
    .get(plantCTRL.getPlantById)


    // @route: PUT api/plant/:id
    // @desc: update plant by id
    // @access: Private
    .put(auth, adminAuth, plantCTRL.updatePlant)


    // @route: DELETE api/plant/:id
    // @desc: delete plant by id
    // @access: Private
    .delete(auth, adminAuth, plantCTRL.deletePlant);








export default router;




