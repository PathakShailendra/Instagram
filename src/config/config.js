import dotEnv from "dotenv";
dotEnv.config();

const _config = {
    PORT : process.env.PORT || 3000,
    MONGO_URI : process.env.MONGO_URI,
    JWT_SECRET : process.env.JWT_SECRET,
    JWT_EXPIRES_IN : process.env.JWT_EXPIRES_IN,
}

const config = Object.freeze(_config);

export default config;