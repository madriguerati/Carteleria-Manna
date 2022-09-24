import mongoose, { model, Document, Schema } from "mongoose";

export interface IUser extends mongoose.Document {
  name: string;
  somethingElse?: number;
}

export const UserSchema = new mongoose.Schema({
  
  fecha: {
    type: Date,
    required: true
  },
  cliente: {
    type: Schema.Types.ObjectId,
    ref: "carteles",
    required: true,
  },
  contacto: //nombre de contacto
  {
    type: String,
    required: true
  },
  operacion:
  {
    type: String,
    required: true
  },
  lugardecolocacion:
  {
      type:String,
      required:true
  },
  lugartraslado:
  {
      type: String,
      required:true
  },
  formadepago:
  {
      type:[String],
      required: true
  },
  fechavalida:
  {
      type:Date,
      required:true
  },
  montoTotal:
  {
    type: Number,
    required: true
  },
  observaciones:
  {
    type: String,
    required: true
  }
});

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
