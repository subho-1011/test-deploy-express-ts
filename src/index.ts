import app from "./app.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

const dbConfig = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${process.env.MONGODB_DB_NAME}`,
    );

    console.log(`Database connected to ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

dotenv.config({ path: "./.env" });

(async () => {
  try {
    await dbConfig();
    if (process.env.NODE_ENV !== "production") {
      app.listen(process.env.PORT, () => {
        console.log(`Server started on port ${process.env.PORT}`);
      });

      app.on("error", (error) => {
        console.log("Error: ", error);
        throw error;
      });
    }
  } catch (error) {
    console.log("MongoDB connection error: ", error);
    process.exit(1);
  }
})();

export default app;
