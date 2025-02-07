import User from "../models/userModel.js";
import OTP from "../models/otpModel.js";
import sendMail from "../utils/mailer.js";
import logger from "../utils/logger.js";

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const newUser = new User({ email, password });
    await newUser.save();

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await new OTP({ email, otp, expiresAt }).save();
    await sendMail(email, "Your OTP Code", `Your OTP is ${otp}`);

    res.status(201).json({ message: "OTP sent to email" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const otpRecord = await OTP.findOne({ email, otp });
    if (!otpRecord) return res.status(400).json({ message: "Invalid OTP" });

    if (new Date() > otpRecord.expiresAt)
      return res.status(400).json({ message: "OTP expired" });

    await User.updateOne({ email }, { isVerified: true });
    await OTP.deleteOne({ email });

    res.json({ message: "OTP verified successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    if (!user.isVerified)
      return res
        .status(400)
        .json({ message: "Please verify your email first" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = user.generateAuthToken();

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const profile = async (req, res) => {
  try {
    const userDetails = await User.findOne({ _id: req.user.userId });
    return res.json({ user: userDetails });
  } catch (error) {
    logger.error(error, "profile");
  }
};
