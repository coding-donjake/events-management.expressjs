import customerSelectConstant from "../customer/select";
import logConstant from "../log/select";
import userSelectConstant from "../user/select";

const emailSelectConstant: object = {
  id: true,
  content: true,
  domain: true,
  main: true,
  status: true,
  Customer: { select: customerSelectConstant },
  User: { select: userSelectConstant },
  EmailLog: logConstant,
};

export default emailSelectConstant;
