import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number
}

const connection: ConnectionObject = {}

export default async function dbConnect() {
    if(connection.isConnected){
        console.log('Already connected to database');
        return 
    }

    try {
        const db = await mongoose.connect(process.env.MONGO_URI || "");
        connection.isConnected = db.connections[0].readyState

        console.log("MongoDB connected: ", db.connection.host);
    
    } catch (error) {
        console.log('Error while connecting to the database',error);
        process.exit(1)
    }
}