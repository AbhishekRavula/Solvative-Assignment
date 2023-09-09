import express from "express";
import UserModel from "../models/userModel.js";

const router = express.Router();

// gets all users
router.get("/", async (req, res) => {
  try {
    const users = await UserModel.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(400).end();
  }
});

// gets specific user
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findById(id);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).end();
  }
});

// creates new user
router.post("/create", async (req, res) => {
  try {
    const userName = req.body.userName;
    const newUser = {
      name: userName,
      peerFives: {
        balance: 100,
        history: [],
      },
      reward: {
        balance: 0,
        history: [],
      },
    };
    const user = await UserModel.create(newUser);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).end();
  }
});

// updates user
router.post("/:id/update", async (req, res) => {
  try {
    const id = req.params.id;
    const userName = req.body.userName;

    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      {
        name: userName,
      },
      {
        returnDocument: "after",
      }
    );
    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(400).end();
  }
});

export default router;
