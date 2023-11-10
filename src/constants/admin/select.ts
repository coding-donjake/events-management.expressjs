import logConstant from "../log/select";
import userSelectConstant from "../user/select";

const adminSelectConstant: object = {
  id: true,
  username: true,
  password: true,
  role: true,
  status: true,
  User: { select: userSelectConstant },
  AdminLog: logConstant,
};

export default adminSelectConstant;
