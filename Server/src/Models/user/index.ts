import mongoose from "mongoose";
const {Schema, model}=mongoose;

const UserSchema = new Schema({

    users:{
        type: 'string',
        required: true 
        
    }
})