import { BadRequestException } from "../exceptions/error.exceptions.js";

export const validation = ({ schema, data }) => {
  return (req, res, next) => {
    let { success, error } = schema(
      req.headers["accept-language"],
    ).safeParse(req[data]);
    if (!success)
      throw BadRequestException({
        message: "Invalid Data",
        extra: error.issues,
      });
    req.validate = data
    next();
  };
};
