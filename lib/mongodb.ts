import mongoose from 'mongoose';

// Define the type for our cached connection
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Extend the global namespace to include our mongoose cache

// Get the MongoDB URI from environment variables
const MONGODB_URI = process.env.MONGODB_URI;

// Validate that the MongoDB URI is defined
if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

// Initialize the cached connection object
// Use a globalThis-based cache to preserve the connection across hot reloads in development
const globalAny = globalThis as any;
let cached: MongooseCache = globalAny.__mongooseCache || { conn: null, promise: null };
if (!globalAny.__mongooseCache) {
  globalAny.__mongooseCache = cached;
}

/**
 * Establishes a connection to MongoDB using Mongoose
 * Returns a cached connection if one exists to prevent multiple connections
 * @returns Promise<typeof mongoose> - The Mongoose instance
 */
async function connectDB(): Promise<typeof mongoose> {
  // Return the cached connection if it exists
  if (cached.conn) {
    return cached.conn;
  }

  // If there's no promise in progress, create a new connection
  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Disable command buffering for better error handling
    };

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    // Wait for the connection promise to resolve
    cached.conn = await cached.promise;
  } catch (e) {
    // If connection fails, clear the promise so we can retry
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
