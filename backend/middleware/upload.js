const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "campus-connect",
    resource_type: "auto",
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = ["image/", "video/", "application/pdf"];
  const isAllowed = allowed.some((type) => file.mimetype.startsWith(type));
  if (!isAllowed) {
    return cb(new Error("Unsupported file type"));
  }
  return cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 25 * 1024 * 1024 },
});

module.exports = upload;
