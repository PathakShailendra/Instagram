import dotEnv from "dotenv";
dotEnv.config();

const _config = {
    PORT : process.env.PORT || 3000,
    MONGO_URI : process.env.MONGO_URI
}

const config = Object.freeze(_config);

export default config;