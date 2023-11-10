import logConstant from "../log/select";
import userSelectConstant from "../user/select";

const accountSelectConstant: object = {
  id: true,
  username: true,
  password: true,
  status: true,
  User: { select: userSelectConstant },
  AccountLog: logConstant,
};

export default accountSelectConstant;
