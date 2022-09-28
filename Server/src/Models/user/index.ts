import { model, Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  email: string;
  password: string;
  roles: Schema.Types.ObjectId, ref:'Role';
  name: string;
  lastname: string;
  dni: Number;
  fechaNacimiento: Date;
  direccion: string;
  //sector: string;//roll
  comparePassword: (password: string) => Promise<Boolean>
};

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    request: true
  },
  lastname: {
    type: String,
    request: true
  },
  dni: {
    type: Number,
    request: true
  },
  fechaNacimiento: {
    type: Date,
    request: true
  },
  telefono: {
    type: Number,
    request: true
  },
  direccion: {
    type: String,
    request: true
  },
  roles: [
    {
      type: Schema.Types.ObjectId,
      ref: "Role",
    },
  ]

},
{
timestamps: true,
versionKey: false,
}
);

userSchema.pre<IUser>("save", async function(next) {
  const user = this;

  if (!user.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  //hash es nuestro dato cifrado
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;

  next();
});

userSchema.methods.comparePassword = async function(
  password: string
): Promise<Boolean> {
  return await bcrypt.compare(password, this.password);
};

export default model<IUser>("User", userSchema);