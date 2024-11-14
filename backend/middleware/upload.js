import multer from "multer";

// Configure storage
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "./uploads"); // Folder for storing uploads
	},
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}-${file.originalname}`);
	},
});

// File filter to allow only specific formats
const fileFilter = (req, file, cb) => {
	if (
		file.mimetype === "image/png" ||
		file.mimetype === "image/jpeg" ||
		file.mimetype === "application/pdf" ||
		file.mimetype === "image/gif"
	) {
		cb(null, true);
	} else {
		cb(
			new Error("Only .png, .jpg, .gif and .pdf formats are allowed!"),
			false
		);
	}
};

// Maximum file size: 10 MB
const upload = multer({
	storage,
	limits: { fileSize: 10 * 1024 * 1024 },
	fileFilter,
});

export default upload;
