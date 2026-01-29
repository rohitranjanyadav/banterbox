import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { text } = req.body;
    const userId = req.user?._id;
    const { receiverId } = req.params;

    let mediaUrl = null;
    let mediaUrlPublicId = null;
    let mediaType = null;

    if (req.file) {
      mediaUrl = req.file.filename;
      mediaUrlPublicId = req.file.filename;
      mediaType = req.file.mimetype.startsWith("video") ? "video" : "image";
    }

    const newMessage = new Message({
      senderId: userId,
      receiverId,
      text,
      mediaUrl,
      mediaUrlPublicId,
      mediaType,
    });

    await newMessage.save();

    // Socket

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: newMessage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error in send message : ${error}`,
    });
  }
};

export const getUsersForChatting = async (req, res) => {
  const loggedInUserId = req.user._id;
  try {
    const filterUsers = await User.find({ _id: { $ne: loggedInUserId } });

    if (!filterUsers) {
      return res.status(400).json({
        success: false,
        message: "Users not found!",
      });
    }

    res.status(200).json({
      success: true,
      users: filterUsers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error with getting all users " + error,
    });
  }
};

export const getMessages = async (req, res) => {
  const { id: receiverId } = req.params;
  const senderId = req.user?._id;
  try {
    const messages = await Message.find({
      $or: [
        { senderId: senderId, receiverId: receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error with getting user messages",
    });
  }
};
