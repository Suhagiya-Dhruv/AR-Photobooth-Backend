const express = require('express');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

const selfieController = require('../controllers/selfieController');

const router = express.Router();

const uploadDir = './selfie';

if (fs.existsSync(uploadDir)) {
    fs.rmdirSync(uploadDir, { recursive: true });
}

fs.mkdirSync(uploadDir);

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },  
    filename: (req, file, cb) => {
        const uniqueId = uuidv4();
        const extension = path.extname(file.originalname);
        cb(null, `${uniqueId}${extension}`);
    },
});

const upload = multer({ storage: storage });

router.post('/selfie', upload.single('image'), selfieController.saveSelfie);
// router.get('/qrcode/:fileId', selfieController.generateQRCode);
router.get('/download/:fileId', selfieController.downloadImage);

module.exports = router;