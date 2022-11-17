import mongoose from "mongoose";

export const ROLES = ["user", "impresiones", "vendedor", "obrero", "gerente"];

const roleSchema = new mongoose.Schema(
  {
    name: String,
  },
  {
    versionKey: false,
  }
);

export default mongoose.model("Role", roleSchema);