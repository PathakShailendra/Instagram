import { Server } from "socket.io";
import userModel from "../models/user.js";
import mongoose from "mongoose";
import messageModel from "../models/message.model.js";

function initSocket(server) {
  console.log("socket io initialized");
  const io = new Server(server);

  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.headers.token;
      if (!token) {
        return next(new Error("token is required"));
      }

      const decodedToken = userModel.verifyToken(token);
      const user = await userModel.findById(decodedToken._id);
      if (!user) {
        return next(new Error("user not found"));
      }
      socket.user = user;
      next();
    } catch (e) {
      next(e);
    }
  });

  io.on("connection", (socket) => {
    socket.join(socket.user._id.toString());

    socket.on("chat-message", async (data) => {
      try {
        const { receiver, text } = data;
        if (!text || !receiver || !text.trim() || !receiver.trim()) {
          return;
        }
        const sender = socket.user;
        const isValidReciever = mongoose.Types.ObjectId.isValid(receiver);
        if (!isValidReciever) {
          return;
        }
        const counterPart = await userModel.findById(receiver);
        if (!counterPart) {
          return;
        }

        await messageModel.create({
          sender: sender._id,
          receiver: counterPart._id,
          text,
        });

        io.to(receiver).emit("chat-message", {
          sender,
          receiver: counterPart,
          text,
        });
      } catch (e) {
        console.log(e);
      }
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
      socket.leave(socket.user._id.toString());
    });
    console.log("New client connected");
  });
}

export default initSocket;
