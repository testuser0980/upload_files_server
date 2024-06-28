const express = require("express");
const File = require("../models/FileUploadSchema");
const router = express.Router();

router.post("/file/upload", async function (req, res) {
  try {
    const { file, fileType } = req.body;
    // Convert binary string to buffer
    const buffer = Buffer.from(file, "binary");
    const f = await File.create({
      file: buffer,
      fileType,
    });
    console.log(f);
    return res.status(201).send({
      success: true,
      f,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error,
    });
  }
});

module.exports = router;
