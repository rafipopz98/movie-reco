import { Schema, model } from "mongoose";
import { UserType } from "../../helpers/types";

const userSchema = new Schema<UserType>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
});

const User = model<UserType>("User", userSchema);

export default User;
