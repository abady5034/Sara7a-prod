import { Router } from "express";
import { getAllData, getProfile } from "./user.service.js";
import { auth, authorization, validation } from "../../common/index.js";
import { authorizationSchema } from "./user.validation.js";

const router = Router();

router.get("/Check-Health", async (req, res) => {
  res.json("Done from user.controller.js");
});

router.get("/getProfile", validation(authorizationSchema, "headers"), auth, async (req, res) => {
  let data = await getProfile(req.user);
  res.json(data);
});



router.get('/get-all-data', validation(authorizationSchema, "headers"), auth, authorization(["admin"]), async (req, res) => {
  let data = await getAllData()
  res.json(data)
})
export default router;
