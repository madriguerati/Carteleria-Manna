
import User from "../../../Models/user";
import Role from "../../../Models/roles";


export const isGerente = async (req:any, res:any, next:any) => {
    try {
      const user:any = await User.findById(req.userId);
      const roles = await Role.find({ _id: { $in: user.roles } });
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "gerente") {
          next();
          return;
        }
      }
      return res.status(403).json({ message: "Require gerente Role!" });
    } catch (error) {
      return res.status(500).send({ message: error });
    }
  };