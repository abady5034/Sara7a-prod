import Router from "express"
import { getAllMessage, sendMessage } from "./message.service.js";
import { upload } from "../../common/middlewares/multer.middleware.js";
import { auth, authorization } from "../../common/index.js";
const router = Router()

router.get("/Check-Health", (req, res) => {
    res.json("Done from message.controller.js");
});

router.get("/get-all-message", auth, (req, res) => {
    let data = await getAllMessage(req.user)
    res.json(data)
})

router.post("/send-message", upload().array("images"), async (req, res) => {
    let data = await sendMessage(req.body, req.files)
    res.json(data)
})
export default router



