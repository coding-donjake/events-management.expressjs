import logConstant from "../log/select";
import orderSelectConstant from "../order/select";
import supplySelectConstant from "../supply/select";

const orderSupplySelectConstant: object = {
  id: true,
  quantity: true,
  status: true,
  Order: { select: orderSelectConstant },
  Supply: { select: supplySelectConstant },
  OrderSupplyLog: logConstant,
};

export default orderSupplySelectConstant;
