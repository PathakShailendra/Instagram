import userModel from "../models/user.js";

export const createUser = async ({ username, email, password }) => {
  if (!username || !email || !password) {
    throw new Error("All fields are required");
  }

  const isUserAlreadyExist = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlreadyExist) {
    throw new Error("User already exists");
  }

  const hashedPassword = await userModel.hashPassword(password);
  const user = await new userModel({
    username,
    email,
    password: hashedPassword,
  });
  await user.save();
  delete user._doc.password;
  return user;
};
