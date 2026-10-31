import jwt from "jsonwebtoken";
import { env } from "../../config/env.service.js";
import {
  BadRequestException,
  UnAuthorizedException,
} from "../exceptions/error.exceptions.js";

export const auth = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) throw UnAuthorizedException({ message: "Auth Users Only" })
  let decoded = jwt.decode(token);
  let signature;
  switch (decoded.aud) {
    case "admin":
      signature = env.adminAccess;
      break;
    case "user":
      signature = env.userAccess;
      break;
  }
  try {
    let decodedData = jwt.verify(token, signature);
    req.user = decodedData;
    next();
  } catch (err) {
    UnAuthorizedException({ message: "Invalid Token" });
  }
};
