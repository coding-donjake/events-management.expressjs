import eventSupplySelectConstant from "../event-supply/select";
import logConstant from "../log/select";
import orderSupplySelectConstant from "../order-supply/select";

const supplySelectConstant: object = {
  id: true,
  name: true,
  brand: true,
  type: true,
  stock: true,
  status: true,
  EventSupply: { select: eventSupplySelectConstant },
  OrderSupply: { select: orderSupplySelectConstant },
  SupplyLog: logConstant,
};

export default supplySelectConstant;
