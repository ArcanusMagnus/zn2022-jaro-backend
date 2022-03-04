import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "./models/UserModel";
import { getDb } from "../dbConnect";

export default class AuthService {
  async createUser(user: User): Promise<void> {
    try {
      const hashedPassword = await bcrypt.hash(user.password, 12);
      const result = await getDb().collection("users").insertOne({
        username: user.username,
        password: hashedPassword,
      });
      if (!result.acknowledged) {
        throw new Error("Creating new user failed.");
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  async login(userInput: User): Promise<string> {
    try {
      const user = await getDb()
        .collection("users")
        .findOne({ username: userInput.username });
      if (!user) {
        throw new Error("Username not found");
      }
      const passwordOk = await bcrypt.compare(
        userInput.password,
        user.password
      );
      if (!passwordOk) {
        throw new Error("Wrong password");
      }
      const token = jwt.sign(
        {
          username: user.username,
          userId: user._id.toString(),
        },
        process.env.JWT_SECRET ?? "",
        { expiresIn: "1h" }
      );
      return token;
    } catch (err) {
      throw new Error(err);
    }
  }
}
