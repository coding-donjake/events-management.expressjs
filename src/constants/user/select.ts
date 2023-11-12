import accountSelectConstant from "../account/select";
import adminSelectConstant from "../admin/select";
import customerSelectConstant from "../customer/select";
import emailSelectConstant from "../email/select";
import logConstant from "../log/select";
import simcardSelectConstant from "../simcard/select";
import taskAssigneeSelectConstant from "../task-assignee/select";

const userSelectConstant: object = {
  id: true,
  lastName: true,
  firstName: true,
  middleName: true,
  suffix: true,
  gender: true,
  birthDate: true,
  Account: { select: accountSelectConstant },
  Admin: { select: adminSelectConstant },
  Customer: { select: customerSelectConstant },
  Email: { select: emailSelectConstant },
  Simcard: { select: simcardSelectConstant },
  TaskAssignee: { select: taskAssigneeSelectConstant },
  UserLog: logConstant,
};

export default userSelectConstant;
