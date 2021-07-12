const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connection to the database successfull"))
  //   cathces the error related to establishing connection with the db
  .catch(() => console.log("Connection to the database failed"));

const client = mongoose.connection;

// catches the error after the connection was successful
client.on("error", (error) => console.log(error.message));

module.exports = client;
