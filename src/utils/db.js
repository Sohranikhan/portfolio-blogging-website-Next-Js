const mongoose = require("mongoose");
const connection = {}
const connect = async ()=>{
    try {
        if (connection.isConnected) {
            return;
        }
      const db = await mongoose.connect(process.env.DATABASE_URL)
      connection.isConnected = db.connections[0].readyState
    } catch (error) {
        console.log(error);
    }
}
export default connect;