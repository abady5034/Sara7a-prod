import { userModel } from "../../database/model/user.model.js";
import {
  NotFoundException,
  UnAuthorizedException,
} from "../exceptions/error.exceptions.js";

export const authorization = ({ roles }) => {
  return async (req, res, next) => {
    if (!roles.includes(req.user.role)) ForbiddenException("Not allowed")

    next()
  };
};
