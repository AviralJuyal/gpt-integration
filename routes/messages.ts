import { twiml } from "twilio";
import { urlencoded, Router, Response } from "express";
import express from "express";
import { MessagingRequest } from "../types/request";
import { getReply } from "../src/gpt3";

// import '../public/assets/css/loader.css';

const { MessagingResponse } = twiml;
const router = Router();
router.use(urlencoded({ extended: false }));
router.use(express.json());
const questionModel = require('../models/questionModel')

router.post("/", async (req: MessagingRequest, res: Response<string>) => {
  const userMessage = req.body.Body;
  const response = new MessagingResponse();
  try {
    const reply = await getReply(userMessage, req.body.From);
    questionModel.create({question:userMessage})
    response.message(reply.text);
    res.json(reply.text);
  } catch (error) {
    response.message(`Failed to reply for ${userMessage}.`);
  }
});

export default router;
