import mongoose from "mongoose";

const userPlantSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            validate: {
                validator: async function (userId) {
                    const user = await mongoose.model.User.findById({ _id: userId });
                    return !!user;
                },
                message: props => `User with ID: ${props.value} does not exist`, 
            },
        },
        plantId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Plant",
            validate: {
                validator: async function (plantId) {
                    const plant = await mongoose.model.Plant.findById({ _id: plantId });
                    return !!plant;
                },
                message: props => `Plant with ID: ${props.value} does not exist`, 
            },
        },
        season: {
            type: String,
            enum: ['winter', 'spring', 'summer', 'fall' ],
            required: true,
        },
        datePlanted: {
            type: Date,
            default: Date.now,
        },
        lastWatered: {
            type: Date,
        },
        lastFed: {
            type: Date,
        }
       
    }
);

export default mongoose.model("UserPlant", userPlantSchema);