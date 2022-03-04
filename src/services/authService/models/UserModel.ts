import { ObjectId } from "mongodb";

export default interface User {
  _id: ObjectId;
  username: string;
  password: string;
  // email and permissions reserved for future use
  email?: string;
  permissions?: string[];
}
