const express = require("express");
const multer = require("multer");
const Tesseract = require("tesseract.js");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());

const upload = multer({ dest: "uploads/" });

app.post("/ocr", upload.single("file"), async (req, res) => {
  try {
    const filePath = req.file.path;

    const result = await Tesseract.recognize(
      filePath,
      "eng"
    );

    fs.unlinkSync(filePath);

    res.json({
      success: true,
      text: result.data.text
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});