const express = require("express");
const multer = require("multer");
const imageController = require("../controllers/imageController");
const upload = require("../helper/multer")

const router = express.Router();

router.post("/remove-object", upload, imageController.removeObject
);

module.exports = router;
