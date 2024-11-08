import { userModel } from "../Models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET_KEY, { expiresIn: "2d" });
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json("All fields are required");

    if (!validator.isEmail(email))
      return res.status(400).json("Not a valid email");

    if (!validator.isStrongPassword(password))
      return res.status(400).json("Please provide strong password");

    let user = await userModel.findOne({ email });
    if (user) return res.status(400).json("email already exists");

    user = new userModel({ name, email, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();
    return res
      .status(200)
      .json({ _id: user._id, name, email, token: createToken(user._id) });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password)
      return res.status(400).json("email and password required");

    let user = await userModel.findOne({ email });
    if (!user) return res.status(400).json("Email is not registered");

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return res.status(400).json("Invalid password");

    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email,
      token: createToken(user._id),
      message: "login successful",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const findUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await userModel.findById(userId);
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
