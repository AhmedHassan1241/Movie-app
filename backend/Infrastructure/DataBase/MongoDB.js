const mongoose = require("mongoose");

function connect() {
  mongoose
    .connect(
      "mongodb+srv://user:DLAoQVAraugvBtgq@cluster5.murj6.mongodb.net/MovieWebsite"
    )
    .then(() => {
      console.log("connected Successfully");
    })
    .catch((error) => {
      console.log(error);
    });
}

module.exports = {
  connect,
};
