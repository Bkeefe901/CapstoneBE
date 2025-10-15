import { Router } from "express";
import auth from '../middleware/basicAuth.mjs';
import userPlantCTRL from '../controllers/userPlantController.mjs';

const router = Router();

router.route("/")
    // @route: POST api/userplant
    // @desc: create a new userPlant
    // @access: Private 
    .post(auth, userPlantCTRL.createUserPlant);

router.route("/user/:id")
    // @route: GET api/userplant/user/:id
    // @desc: get all userPlants for a specific userId
    // @access: Private
    .get(auth, userPlantCTRL.getAllUsersPlants);
    
router.route("/:id")
    // @route: PUT api/userplant/:id
    // @desc: Update userPlant by id
    // @access: Private
    .put(auth, userPlantCTRL.updateUserPlant)


    // @route: DELETE api/userplant/:id
    // @desc: delete userPlant by id
    // @access: Private
    .delete(auth, userPlantCTRL.deleteUserPlant);


export default router;