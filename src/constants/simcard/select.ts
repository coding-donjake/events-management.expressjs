import customerSelectConstant from "../customer/select";
import logConstant from "../log/select";
import userSelectConstant from "../user/select";

const simcardSelectConstant: object = {
  id: true,
  content: true,
  idc: true,
  main: true,
  status: true,
  Customer: { select: customerSelectConstant },
  User: { select: userSelectConstant },
  SimcardLog: logConstant,
};

export default simcardSelectConstant;
