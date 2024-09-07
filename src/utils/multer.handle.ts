import multer from "multer";

/* const storage = multer.memoryStorage(); // store image in memory
const uploadMulter = multer({ storage: storage }); */

const uploadMulter = multer({
  storage: multer.diskStorage({}),
  limits: { fileSize: 20000000 },
});

/* const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/../my-files");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const uploadMulter = multer({ storage: storage }); */

export { uploadMulter };
