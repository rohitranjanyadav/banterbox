import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "../config/cloudinary.js";

const generateToken = (res, user) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "5y",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 5 * 365 * 24 * 60 * 60 * 1000,
  });
};

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    console.log("req.body :", req.body);

    if (!username) {
      return res.status(422).json({ message: "Username is required!!!" });
    }
    if (!email) {
      return res.status(422).json({ message: "Email is required!!!" });
    }
    if (!password) {
      return res.status(422).json({ message: "Password is required!!!" });
    }

    const existUser = await User.findOne({ email });

    if (existUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists!!!" });
    }

    const hashedPassword = bcrypt.hashSync(password, 8);

    const userData = new User({
      username,
      email,
      password: hashedPassword,
    });

    const user = await userData.save();

    generateToken(res, user);

    const { password: pass, ...rest } = user._doc;

    res.json({
      success: true,
      message: "User registered successfully!",
      user: rest,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Error while registering!!!",
      error,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(422).json({ message: "Email is required!!!" });
    }
    if (!password) {
      return res.status(422).json({ message: "Password is required!!!" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User doesn't exist!!!" });
    }

    const isMatchPassword = bcrypt.compareSync(password, user.password);

    if (!isMatchPassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    generateToken(res, user);

    const { password: pass, ...rest } = user._doc;

    res.json({
      success: true,
      message: "User login successful!",
      user: rest,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Error while login!!!",
      error,
    });
  }
};

export const logoutUser = async (req, res) => {
  res.clearCookie("token");

  res.json({ message: "Logged out successfully" });
};

export const profileUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found!",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong with get user profile",
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found!",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong with get user by id",
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user?._id;
    const { name, username, email, phone, bio } = req.body;

    const updateData = {};

    if (name) updateData.name = name;
    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (phone) updateData.phone = phone;
    if (bio) updateData.bio = bio;

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    }).select("-password");

    res.status(200).json({
      success: true,
      message: "User profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong with update profile",
    });
  }
};

export const updateProfileImage = async (req, res) => {
  try {
    const userId = req.user?._id;
    const profileImage = req.file?.path;
    const publicId = req.file?.filename || req.file?.public_id;
    console.log("req.file: ", req.file);

    if (!profileImage || !publicId) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded!",
      });
    }

    const user = await User.findById(userId).select("-password");

    // Delete old profile image if already exists
    if (user?.profileImagePublicId) {
      await cloudinary.uploader.destroy(user?.profileImagePublicId);
    }

    user.profileImage = profileImage;
    user.profileImagePublicId = publicId;

    await user.save();

    res.status(200).json({
      success: true,
      message: "User profile image updated successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong with update profile",
    });
  }
};
