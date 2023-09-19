import { Schema, model } from "mongoose";
import {handleSaveError,runValidateAtUpdate} from "../models/hooks.js"

const contactShema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,},
    favorite: {
        type: Boolean,
        default: false,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    }
}, { versionKey: false, timestamps: true });

contactShema.post("save", handleSaveError);
contactShema.pre("findOneAndUpdate", runValidateAtUpdate);
contactShema.post("findOneAndUpdate", handleSaveError);

const Contact = model("contact", contactShema);

export default Contact;