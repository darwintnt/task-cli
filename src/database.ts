import mongoose from "mongoose";
import { loadConfig } from "./config.ts";

export const db = async () => {
  try {
    console.log("conectando a la BD...");
    const config = loadConfig();

    if (!config.MONGODB_URL) {
      console.error(
        'Error: ⚠️  No hay configuración guardada ejecuta primero "cli-tasks config"'
      );
      process.exit(1);
    }
    await mongoose.connect(`${config.MONGODB_URL}`);
  } catch (error) {
    console.error("MongoDB Error.", error);
  }
};

mongoose.connection.on("error", (err) => console.log(err));

export const cnx = mongoose.connection;
