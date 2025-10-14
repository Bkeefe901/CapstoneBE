import mongoose from "mongoose";

const plantSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        // wateringFrequency: {    // This probably will be covered in description, since times vary
        //     type: Number,
        // },
        feedingFrequency: {
            type: String,
            default: 'two weeks',
        },
        sunlightReqs: {
            type: String,
            enum: ['full', 'partial', 'shade'],
            required: true,
        },
        daysToHarvest: {
            type: Number
        },
        description: {
            type: String,
            maxlength: 150,
            required: true,
        },
        imageURL: {
            type: String
        }
    }
);

export default mongoose.model("Plant", plantSchema);