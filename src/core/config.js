import 'dotenv/config';

export default {
    port: process.env.PORT || 3000,
    secretKey: process.env.SECRET_KEY,
};
