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
  Customer: {
    select: {
      id: true,
      address: true,
      status: true,
      Email: {
        select: {
          id: true,
          content: true,
          domain: true,
          main: true,
          status: true,
        },
      },
      Simcard: {
        select: {
          id: true,
          content: true,
          idc: true,
          main: true,
          status: true,
          Customer: { select: customerSelectConstant },
          SimcardLog: logConstant,
        },
      },
      User: {
        select: {
          id: true,
          lastName: true,
          firstName: true,
          middleName: true,
          suffix: true,
          gender: true,
          birthDate: true,
        },
      },
      CustomerLog: logConstant,
    },
  },
  EventSupply: { select: eventSupplySelectConstant },
  Payment: { select: paymentSelectConstant },
  Task: { select: taskSelectConstant },
  EventLog: logConstant,
};

export default eventSelectConstant;
