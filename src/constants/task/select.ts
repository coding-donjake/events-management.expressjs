import eventSelectConstant from "../event/select";
import logConstant from "../log/select";
import taskAssigneeSelectConstant from "../task-assignee/select";

const taskSelectConstant: object = {
  id: true,
  datetimeDeadline: true,
  name: true,
  status: true,
  Event: { select: eventSelectConstant },
  TaskAssignee: { select: taskAssigneeSelectConstant },
  TaskLog: logConstant,
};

export default taskSelectConstant;
