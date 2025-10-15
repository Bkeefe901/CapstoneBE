import mongoose from "mongoose";
import dotenv from 'dotenv';

//Collections/Models
import Plant from '../models/plantSchema.mjs';
import UserPlant from '../models/userPlantSchema.mjs';

//Data
import plants from './plantData.mjs';
import userPlants from './userPlantData.mjs';

dotenv.config();

const connectionStr = process.env.mongoURI || "";

async function seedDatabase() {
    console.log(`✅ Starting Seeding`);
    
    try {
        await mongoose.connect(connectionStr);
        console.log(`✅ Connected to DB...`);

        await Plant.deleteMany();
        console.log(`✅ Cleared DB of previous plants...`);

        await Plant.create(plants);
        console.log(`✅ Seeded DB with new plant data...`);

        let newPlants = await Plant.find({});
        console.log(`✅ Retrieved New Plant Id's from DB...`);

        for (let u of userPlants) {
            for (let p of newPlants){
                if(u.name == p.name){
                    u.plantId = p._id;
                    break;
                }
            }
        }

        console.log(`✅ Mapped new user plants with new plant id`);

        await UserPlant.deleteMany();
        console.log(`✅ Cleared DB of previous user plants...`);

        await UserPlant.create(userPlants);
        console.log(`✅ Seeded DB with user plants`);

        console.log(`🌱 Seeding complete, have a nice day!`);
        process.exit(1);

    } catch (err) {
        console.error(`❌ Error seeding DB... ${err.message}`);
        process.exit(1);
    }
};

seedDatabase();

