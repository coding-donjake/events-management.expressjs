import adminSelectConstant from "../admin/select";
import customerSelectConstant from "../customer/select";
import emailSelectConstant from "../email/select";
import logConstant from "../log/select";
import simcardSelectConstant from "../simcard/select";
import taskAssigneeSelectConstant from "../task-assignee/select";
import userInformationSelectConstant from "../user-information/select";

const userSelectConstant: object = {
  id: true,
  username: true,
  password: true,
  status: true,
  Admin: { select: adminSelectConstant },
  Customer: { select: customerSelectConstant },
  UserInformation: { select: userInformationSelectConstant },
  Email: { select: emailSelectConstant },
  Simcard: { select: simcardSelectConstant },
  TaskAssignee: { select: taskAssigneeSelectConstant },
  UserLog: logConstant,
};

export default userSelectConstant;
