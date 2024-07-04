const express = require("express");
const dotenv = require('dotenv');
const imageRoutes = require("./routes/imageRoutes");

dotenv.config();


const app = express();

// Middleware to handle JSON bodies
app.use(express.json());

// Routes
app.use("/api/images", imageRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({
		message:
			"An error occurred while processing your request.",
		error: err.message,
	});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

// module.exports = app;
