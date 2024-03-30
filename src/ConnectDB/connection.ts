import mongoose from "mongoose";

export const ConnectDB = (uri: string) => {
  let options = { dbName: "ecommerce" };
  let connection = mongoose.connection;
  mongoose
    .connect(uri, options)
    .then(() =>
      console.log(
        `Database Connected at ${connection.host}:${connection.port}/${connection.name}`
      )
    );
};
