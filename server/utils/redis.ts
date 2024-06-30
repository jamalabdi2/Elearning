import {Redis} from 'ioredis'
require('dotenv').config()

const redisClient = () => {
    const REDIS_URL = process.env.REDIS_URL
    if(REDIS_URL){
        console.log('Redis connected')
        return REDIS_URL
    }
    throw new Error('Redis connection failed')
}

export const redis = new Redis(redisClient())