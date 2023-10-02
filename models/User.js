import { Schema, model } from "mongoose";
import { handleSaveError, runValidateAtUpdate } from "../models/hooks.js";
import Joi from "joi"; /* не забыть убрать все в user-joi*/
import { token } from "morgan";

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const subScroll = ["starter", "pro", "business"];

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        match: emailRegex,
        unique: true,
        required: [true, 'Email is required'],
    },
    password: {
        type: String,
        minlength: 7,
        required: [true, 'Set password for user'],
    },
    avatarUrl: {
      type: String,
        required: true,
    },
    
    subscription: {
    type: String,
    enum: subScroll,
    default: "starter",
  },
  token: { type: String, },
  verify: {
    type: Boolean,
    default: "false"
  },
  verificationToken: {
    type: String,
    required: [true, 'Verify token is required'],
  }
}, { versionKey: false, timestamps: true });

userSchema.post("save", handleSaveError);
userSchema.pre("findOneAndUpdate", runValidateAtUpdate);
userSchema.post("findOneAndUpdate", handleSaveError);

const User = model("user", userSchema);

export const userSingUpSchema = Joi.object ({
    username: Joi.string().required(),
    email: Joi.string().pattern(emailRegex).required(),
    password: Joi.string().min(7).required(),
    subscription: Joi.string().valid(...subScroll).required(),
})

export const userSingInSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(7).required(),
});
export const userEmailSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
});


export default User;