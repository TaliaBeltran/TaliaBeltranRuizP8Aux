import { Schema, Document, model } from "mongoose";
import post, {IPost} from "./post";

export interface IUser extends Document {
  fullname: string;
  username: string;
  email: string;
  password: string;
  deteReg: Date;
  post: Array<IPost>;
}

const userSchema = new Schema<IUser>({
  fullname: {
  type: String,
  required: true,
  },
username: {
  type: String,
  required: true,
},
email: {
  type: String,
  required: true,
},
password: {
  type: String,
  required: true,
},
dateReg: {
  type: Date,
  default: Date.now(),
},
post: {
  type: [post.schema]
},
});

export default model<IUser>("user", userSchema);