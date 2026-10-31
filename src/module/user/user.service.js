import { BadRequestException, NotFoundException, UnAuthorizedException } from "../../common/index.js";
import { userModel } from "../../database/model/user.model.js";

export const getAllData = async () => {
  let data = await userModel.find().select("-passwordc -__v")
  if (data) return { message: "Done", data };
  else return NotFoundException();
};

export const getProfile = async (user) => {
  if (!user) return UnAuthorizedException({ message: "UnAuthorized" })
  let id = user.id;
  let data = await userModel.findById(id).select("-password -_id -provider -__v");
  if (data) return { message: "Done", data };
  else return NotFoundException({ message: "User Not Found" });
};
