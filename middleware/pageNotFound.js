const pageNotFound = (req, res) => {
	res.status(404).json({success: false, errorMessage: "Page Not Found"});
}

module.exports = pageNotFound;
