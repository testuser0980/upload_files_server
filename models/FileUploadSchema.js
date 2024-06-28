const mongoose = require("mongoose");
const { Schema } = mongoose;

const fileSchema = new Schema(
  {
    file: {
      type: Buffer,
      required: true,
    },
    fileType: {
      type: "string",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("file", fileSchema);
