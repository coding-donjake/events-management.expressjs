import logConstant from "../log/select";
import taskSelectConstant from "../task/select";
import userSelectConstant from "../user/select";

const taskAssigneeSelectConstant: object = {
  id: true,
  status: true,
  Task: { select: taskSelectConstant },
  User: { select: userSelectConstant },
  TaskAssigneeLog: logConstant,
};

export default taskAssigneeSelectConstant;
