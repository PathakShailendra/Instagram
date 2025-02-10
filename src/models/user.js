import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/config.js";


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [ true, "Username is required" ],
        unique: [ true, "Username already exists" ],
        trim: true,
        lowercase: true,
        minLength: [ 3, "Username must be at least 3 characters" ],
        maxLength: [ 15, "Username must be at most 20 characters" ],
    },

    email: {
        type: String,
        required: [ true, "Email is required" ],
        unique: [ true, "Email already exists" ],
        trim: true,
        lowercase: true,
        minLength: [ 6, "Email must be at least 6 characters" ],
        maxLength: [ 40, "Email must be at most 50 characters" ],
    },

    profileImage: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWwfGUCDwrZZK12xVpCOqngxSpn0BDpq6ewQ&s",
    },

    password: {
        type: String,
        select: false,
    },
})


userSchema.statics.hashPassword = async function (password) {

    if (!password) {
        throw new Error("Password is required");
    }


    const salt = await bcrypt.genSalt(10);

    return bcrypt.hash(password, salt);
}

userSchema.methods.comparePassword = async function (password) {
    if (!password) {
        throw new Error("Password is required");
    }

    if (!this.password) {
        throw new Error("Password is required");
    }


    return bcrypt.compare(password, this.password);
}

userSchema.methods.generateToken = function () {
    const token = jwt.sign(
        {
            _id: this._id,
            username: this.username,
            email: this.email,
        },
        config.JWT_SECRET,
        {
            expiresIn: config.JWT_EXPIRES_IN,
        });

    return token;
}

userSchema.statics.verifyToken = function (token) {
    if (!token) {
        throw new Error("Token is required");
    }

    return jwt.verify(token, config.JWT_SECRET);
}


const userModel = mongoose.model("user", userSchema);


export default userModel;