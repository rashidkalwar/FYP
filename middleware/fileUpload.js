const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    const filePath = path.join(__dirname, '../public/assets');
    fs.mkdirSync(filePath, { recursive: true });
    callback(null, filePath);
  },
  filename: function (req, file, callback) {
    callback(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 20, // 20 MB file size limit
  },
  fileFilter: (req, file, callback) => {
    const ext = path.extname(file.originalname);
    if (ext !== '.json' && ext !== '.csv' && ext !== '.xlsx') {
      return callback(
        new Error('Only .json, .csv, and .xlsx files are allowed!')
      );
    }
    callback(null, true);
  },
});

const uploadSingleFile = upload.single('file');
module.exports = uploadSingleFile;
