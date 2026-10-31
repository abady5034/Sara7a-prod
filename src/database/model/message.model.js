import mongoose, { Types } from "mongoose";


const messageSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 5000,
    },
    reciverId: {
        type: Types.ObjectId(),
        required: true,
    },
    images: {
        type: [String]
    }
},
    {
        timestamps: true,
        strict: true,
    },)

export const messageModel = mongoose.model("message", messageSchema)