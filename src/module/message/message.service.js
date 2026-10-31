import { NotFoundException } from "../../common/index.js"
import { messageModel } from "../../database/model/message.model.js"
import { userModel } from "../../database/model/user.model.js"

export const sendMessage = async ({ url, content }, files = null) => {
    let reciver = await userModel.findOne({ url })
    if (!reciver) throw NotFoundException({ message: "User Not Found" })
    let data = await messageModel.create({
        content,
        reciverId: reciver._id,
        images: files.path
    })
}


export const getAllMessage = async (user) => {
    let data = await messageModel.find({ reciverId: user._id })
    if (data.length === 0) return { message: "There are not messages", data }
    return { message: "Message", data }
}