const path = require('path');
const fs = require('fs')

const uploadDir = './selfie';

const saveSelfie = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded.' });
    }

    const fileId = path.basename(req.file.filename, path.extname(req.file.filename));

    res.json({ fileId });
};

// const generateQRCode = async (req, res) => {
//     try {
//         res.status(200).json({ link: `http://localhost:8000${req.originalUrl}`.replace("qrcode","download") });
//     } catch (error) {
//         console.error('Error generating QR code:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

const downloadImage = async (req, res) => {
    const { fileId } = req.params;
    const imagePath = path.resolve(uploadDir, `${fileId}.png`);
  
    try {
      if (fs.existsSync(imagePath)) {
        res.download(imagePath, `${fileId}.png`);
      } else {
        res.status(404).json({ error: 'Image not found.' });
      }
    } catch (error) {
      console.error('Error sending image:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

module.exports = {
    saveSelfie,
    // generateQRCode,
    downloadImage
};
