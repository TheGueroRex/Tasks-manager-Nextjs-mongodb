import mongoose from 'mongoose';

const conn = {
    isConnected: false
}

export async function connectDB(){
    if(conn.isConnected) return;

    const db = await mongoose.connect("mongodb+srv://TheGueroDev:theguerodev123@cluster0.hap0n2c.mongodb.net/?retryWrites=true&w=majority");
    conn.isConnected = db.connections[0].readyState
}


mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected');
})

mongoose.connection.on('error', (err) => {
    console.log('Mongoose connection error', err);
})

// export default connectDB;