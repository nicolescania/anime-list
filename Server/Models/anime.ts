// Step 1 - import mongoose - database adapter
import mongoose from 'mongoose';
const Schema = mongoose.Schema; // alias for mongoose.Schema

// Step 2 - Create a Schema that matches the data in the collection
const animechema = new Schema
    ({

        id: {
            type: Number,

        },

        name: {
            type: String,
            require: true
        },

        sipnosis: {
            type: String,
            require: true
        },


        year : {
            type: String,
            require: true
        }
        ,

        episodes: {
            type: Number,
            require: true
        },

        category: {
            type: String,
            require: true
        }


    })


const Model = mongoose.model("Animes", animechema);

// Step 4 - Export the Model -> converts this file into a module
export default Model;


