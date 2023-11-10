import eventSelectConstant from "../event/select";
import logConstant from "../log/select";
import supplySelectConstant from "../supply/select";

const eventSupplySelectConstant: object = {
  id: true,
  quantity: true,
  status: true,
  Event: { select: eventSelectConstant },
  Supply: { select: supplySelectConstant },
  EventSupplyLog: logConstant,
};

export default eventSupplySelectConstant;
