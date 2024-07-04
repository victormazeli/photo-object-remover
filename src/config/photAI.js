const dotenv = require('dotenv');

dotenv.config();


const photAI = {
    phot_ai_api_key: process.env.PHOTAI_API_KEY,
    phot_ai_api_url: process.env.PHOTAI_API_URL
}

module.exports = photAI