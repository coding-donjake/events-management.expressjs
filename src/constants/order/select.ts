import logConstant from "../log/select";
import orderSupplySelectConstant from "../order-supply/select";
import supplierSelectConstant from "../supplier/select";

const orderSelectConstant: object = {
  id: true,
  datetimeOrdered: true,
  datetimeExpected: true,
  datetimeArrived: true,
  status: true,
  OrderSupply: { select: orderSupplySelectConstant },
  Supplier: { select: supplierSelectConstant },
  OrderLog: logConstant,
};

export default orderSelectConstant;
