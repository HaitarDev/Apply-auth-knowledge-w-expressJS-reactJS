import mongoose, { Schema } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  created_at?: Date;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
    // required: true,
  },
  password: {
    type: String,
    // minlength: [6, "asd"],
    // required: true,
    // minLength: [6, "Password should be higher that 6 characters"],
  },
  created_at: {
    type: Schema.Types.Date,
    default: Date.now(),
  },
});

export const User = mongoose.model<IUser>("User", userSchema);
