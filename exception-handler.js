const handleErrors = (err, req, res, next) => {
    console.error(err.stack);
    if (res.headersSent) {
        return next(err)
    }

    if (err.status) {
        return res.status(err.status).json(err);
    }
    res.status(500).json(err);
}

module.exports = handleErrors