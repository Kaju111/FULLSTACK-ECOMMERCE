export const errorMiddleware = (err, req, res, next) => {
    err.message || (err.message = "Internal server error");
    return res.status(400).json({
        success: false,
        message: err.message
    });
};
