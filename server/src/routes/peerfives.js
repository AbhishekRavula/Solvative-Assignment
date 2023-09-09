import express from "express";
import UserModel from "../models/userModel.js";

const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findById(id);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).end();
  }
});

// creates transaction
router.post("/:id/create", async (req, res) => {
  try {
    const fromUserId = req.params.id;
    const toUserId = req.body.toUserId;
    const amount = req.body.amount;

    const fromUser = await UserModel.findById(fromUserId);
    const toUser = await UserModel.findById(toUserId);

    if (fromUser && toUser) {
      if (fromUser.peerFives.balance < amount) {
        return res.status(400).send({
          error: "not have sufficient balance",
        });
      }

      const timeStamp = new Date();
      fromUser.peerFives.balance = fromUser.peerFives.balance - amount;
      fromUser.peerFives.history = [
        ...fromUser.peerFives.history,
        {
          amount,
          userId: toUserId,
          timeStamp,
        },
      ];

      toUser.reward.balance = toUser.reward.balance + amount;
      toUser.reward.history = [
        ...toUser.reward.history,
        {
          amount,
          userId: fromUserId,
          timeStamp,
        },
      ];

      await UserModel.findByIdAndUpdate(fromUserId, fromUser);
      await UserModel.findByIdAndUpdate(toUserId, toUser);
    }
    return res.status(400).end();
  } catch (error) {
    return res.status(400).end();
  }
});

// reverts transaction
router.delete("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const peerFiveHistoryUserId = req.body.toUserId;

    const user = await UserModel.findById(userId);
    const peerFivesHistory = user.peerFives.history.find((item) => {
      return item.userId === peerFiveHistoryUserId;
    });

    user.peerFives.balance = user.peerFives.balance + peerFivesHistory.amount;
    user.peerFives.history = user.peerFives.history.filter((item) => {
      return item.userId !== peerFiveHistoryUserId;
    });

    const toUser = await UserModel.findById(peerFiveHistoryUserId);
    toUser.reward.balance = toUser.reward.balance - peerFivesHistory.amount;
    toUser.reward.history = toUser.reward.history.filter((item, index) => {
      return (
        item.timeStamp !== peerFivesHistory.timeStamp && item.userId !== userId
      );
    });

    await UserModel.findByIdAndUpdate(userId, user);
    await UserModel.findByIdAndUpdate(peerFiveHistoryUserId, toUser);

    return res.status(200).end();
  } catch (error) {
    return res.status(400).end();
  }
});

export default router;
