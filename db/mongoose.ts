import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI

declare global {
  var mongooseCache: {
    connection: typeof mongoose | null
    promise: Promise<typeof mongoose> | null
  }
}

let cache = global.mongooseCache

if (!cache) {
  cache = global.mongooseCache = { connection: null, promise: null }
}

export async function connectToDatabase() {
  if (!MONGODB_URI) throw new Error('MONGODB_URI Not found!')

  if (cache.connection) return cache.connection

  if (!cache.promise) {
    cache.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false })
  }

  try {
    cache.connection = await cache.promise
  } catch (err) {
    cache.promise = null
    throw err
  }

  console.log(`MongoDB Connected : ${process.env.NODE_ENV}`)

  return cache.connection
}
