import {app} from  './app'
import connectDb from './utils/db'
import {v2 as cloudinary} from 'cloudinary'

require('dotenv').config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET

})

const PORT = process.env.PORT

app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`);
    connectDb();
})