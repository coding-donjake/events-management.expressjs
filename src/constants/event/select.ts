import customerSelectConstant from "../customer/select";
import eventSupplySelectConstant from "../event-supply/select";
import logConstant from "../log/select";
import paymentSelectConstant from "../payment/select";
import taskSelectConstant from "../task/select";

const eventSelectConstant: object = {
  id: true,
  datetimeStarted: true,
  datetimeEnded: true,
  type: true,
  name: true,
  address: true,
  price: true,
  balance: true,
  status: true,
  Customer: { select: customerSelectConstant },
  EventSupply: { select: eventSupplySelectConstant },
  Payment: { select: paymentSelectConstant },
  Task: { select: taskSelectConstant },
  EventLog: logConstant,
};

export default eventSelectConstant;
