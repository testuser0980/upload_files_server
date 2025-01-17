const express = require("express");
import { put } from "@vercel/blob";
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");
const app = express();
app.use(cors());
const port = 5000;

// Ensure uploads directory exists
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Connect to MongoDB
mongoose.connect("mongodb+srv://testuser0980:4CVBBtKZ5vgwzv7I@cluster0.w3nyd03.mongodb.net/upload_file?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a schema for file uploads
const fileSchema = new mongoose.Schema({
  filename: String,
  data: Buffer,
  contentType: String,
});
const File = mongoose.model("File", fileSchema);

// Configure Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.originalname);
  },
});

// const storage = multer.memoryStorage()

const upload = multer({ storage: storage });

fs.readdirSync(uploadDir).map(fileName => {
  return path.join(uploadDir, fileName);
})

// Serve static files from the uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Endpoint to upload files
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const newFile = new File({
      filename: req.file.originalname,
      data: req.file.buffer,
      contentType: req.file.mimetype,
    });
    await newFile.save();
    res.send("File uploaded successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post('/upload/file', async (req, res) => {
  try {
    const { url } = await put('articles/blob.txt', 'Hello World!', { access: 'public' });
    return res.status(200).send({
      success: true,
      url,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error,
    })
  }
})

app.get("/");

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
