import mongoose from "mongoose";

const MONGODB_URI = "mongodb+srv://aftabnaik1999:Aftab%40123@cluster0.kwkki.mongodb.net/?retryWrites=true&w=majority&tls=true&appName=Cluster0";

// const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    // console.log("✅ Using existing database connection");
    return cached.conn;
  }

  if (!cached.promise) {
    // console.log("🔄 Connecting to MongoDB...");
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        tlsAllowInvalidCertificates: true,  // 👈 Bypass TLS issue (if necessary)
      })
      .then((mongoose) => {
        console.log("🚀 MongoDB Connected Successfully!");
        return mongoose;
      })
      .catch((error) => {
        console.error("❌ MongoDB Connection Error:", error);
        throw error;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
