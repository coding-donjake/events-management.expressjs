import emailSelectConstant from "../email/select";
import eventSelectConstant from "../event/select";
import logConstant from "../log/select";
import simcardSelectConstant from "../simcard/select";
import userSelectConstant from "../user/select";

const customerSelectConstant: object = {
  id: true,
  address: true,
  status: true,
  Email: { select: emailSelectConstant },
  Event: { select: eventSelectConstant },
  Simcard: { select: simcardSelectConstant },
  User: { select: userSelectConstant },
  CustomerLog: logConstant,
};

export default customerSelectConstant;
