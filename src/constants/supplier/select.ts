import logConstant from "../log/select";
import orderSelectConstant from "../order/select";

const supplierSelectConstant: object = {
  id: true,
  name: true,
  address: true,
  phone: true,
  email: true,
  status: true,
  Order: { select: orderSelectConstant },
  SupplierLog: logConstant,
};

export default supplierSelectConstant;
