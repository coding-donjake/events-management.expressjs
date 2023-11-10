import eventSelectConstant from "../event/select";
import logConstant from "../log/select";

const paymentSelectConstant: object = {
  id: true,
  datetimePayment: true,
  amount: true,
  status: true,
  Event: { select: eventSelectConstant },
  PaymentLog: logConstant,
};

export default paymentSelectConstant;
