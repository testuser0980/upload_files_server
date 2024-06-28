const mongoose = require("mongoose");
const URI = "mongodb+srv://testuser0980:4CVBBtKZ5vgwzv7I@cluster0.w3nyd03.mongodb.net/upload_file?retryWrites=true&w=majority"

const ConnectToDB = async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
    });
    console.log(`MongoDB Connected Successfully`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = ConnectToDB;
