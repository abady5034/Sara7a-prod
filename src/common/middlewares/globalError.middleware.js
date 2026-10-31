import { env } from "../../config/env.service.js";

export const globalHandlingError = (err, req, res, next) => {
    const mood = env.mood === "dev";
    const status = err.satus ? err.satus : err.cause ? err.cause.satus : 500;
    const defaultMessage = "Something Went Wrong";
    const displayErrorMessage = err.message || defaultMessage;
    res.status(status).json({
        stack: mood ? err.stack : null,
        message: mood ? displayErrorMessage : defaultMessage,
        extra: mood ? err.cause : null,
    });
};
