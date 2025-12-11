import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(
      "mongodb+srv://Grupo-19:grupo19@cursadanodejs.ls9ii.mongodb.net/Node-js"
    );
    console.log("Conexion exitosa a MongoDB");
  } catch (error) {
    console.log("Error al conectar a mongoDB: ", error);
    process.exit(1);
  }
}
